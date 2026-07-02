import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';
let MonitoreoWebSocketService = class MonitoreoWebSocketService {
    constructor(authService) {
        this.authService = authService;
        this.socket = null;
        this.isConnectedSubject = new BehaviorSubject(false);
        this.positionUpdateSubject = new Subject();
        this.unidadUpdateSubject = new Subject();
        this.connectedSubject = new Subject();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 3000; // 3 segundos
        this.reconnectTimer = null;
        this.isManualDisconnect = false;
        // Observables públicos
        this.isConnected$ = this.isConnectedSubject.asObservable();
        this.positionUpdate$ = this.positionUpdateSubject.asObservable();
        this.unidadUpdate$ = this.unidadUpdateSubject.asObservable();
        this.connected$ = this.connectedSubject.asObservable();
    }
    /**
     * Conecta al servidor WebSocket con autenticación JWT
     */
    connect() {
        if (this.socket?.connected) {
            console.log('[WebSocket] Ya está conectado');
            return;
        }
        const token = this.authService.getToken();
        if (!token) {
            console.error('[WebSocket] No hay token disponible. No se puede conectar.');
            return;
        }
        this.isManualDisconnect = false;
        // Socket.IO maneja automáticamente la conversión de HTTP(S) a WS(S).
        // IMPORTANTE: si el API está publicado bajo un prefijo (ej. /apidev),
        // el host/origen y el "path" de Socket.IO deben separarse:
        // - origin: https://dashcampay.com
        // - path:   /apidev/socket.io
        // - namespace: /monitoreo
        const namespace = '/monitoreo';
        const apiBase = environment.API_SECURITY;
        if (!apiBase) {
            console.error('[WebSocket] environment.API_SECURITY no está configurado. No se puede conectar.');
            return;
        }
        const u = new URL(apiBase, window.location.origin);
        const origin = u.origin; // https://dashcampay.com (o http://localhost:3000)
        const basePath = (u.pathname || '/').replace(/\/+$/, ''); // '' | '/apidev'
        const socketPath = `${basePath || ''}/socket.io`; // '/socket.io' | '/apidev/socket.io'
        const wsUrl = `${origin}${namespace}`;
        console.log('[WebSocket] Conectando a:', wsUrl);
        // Crear conexión Socket.IO con autenticación
        this.socket = io(wsUrl, {
            path: socketPath,
            auth: {
                token: token
            },
            query: {
                token: token
            },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: this.maxReconnectAttempts,
            reconnectionDelay: this.reconnectDelay,
            reconnectionDelayMax: 10000,
            timeout: 20000
        });
        this.setupEventHandlers();
    }
    /**
     * Configura los manejadores de eventos del socket
     */
    setupEventHandlers() {
        if (!this.socket)
            return;
        // Evento de conexión exitosa
        this.socket.on('connect', () => {
            console.log('[WebSocket] Conectado exitosamente. Socket ID:', this.socket?.id);
            this.isConnectedSubject.next(true);
            this.reconnectAttempts = 0;
            // Suscribirse automáticamente a unidades
            this.subscribeToUnidades();
        });
        // Evento de confirmación de conexión con datos de sesión
        this.socket.on('connected', (data) => {
            console.log('[WebSocket] Confirmación de conexión:', data);
            this.connectedSubject.next(data);
        });
        // Evento de actualización de posición
        this.socket.on('position:update', (data) => {
            console.log('[WebSocket] Actualización de posición recibida:', data);
            this.positionUpdateSubject.next(data);
        });
        // Evento de actualización de unidad completa
        this.socket.on('unidad:update', (data) => {
            console.log('[WebSocket] Actualización de unidad recibida:', data);
            this.unidadUpdateSubject.next(data);
        });
        // Evento de desconexión
        this.socket.on('disconnect', (reason) => {
            console.log('[WebSocket] Desconectado. Razón:', reason);
            this.isConnectedSubject.next(false);
            // Intentar reconectar solo si no fue una desconexión manual
            if (!this.isManualDisconnect && reason !== 'io client disconnect') {
                this.scheduleReconnect();
            }
        });
        // Evento de error de conexión
        this.socket.on('connect_error', (error) => {
            console.error('[WebSocket] Error de conexión:', error);
            this.isConnectedSubject.next(false);
            // Si el error es de autenticación, no intentar reconectar
            if (error.message.includes('auth') || error.message.includes('token') || error.message.includes('401')) {
                console.error('[WebSocket] Error de autenticación. No se intentará reconectar.');
                this.isManualDisconnect = true;
                return;
            }
            if (!this.isManualDisconnect) {
                this.scheduleReconnect();
            }
        });
        // Evento de reconexión
        this.socket.on('reconnect', (attemptNumber) => {
            console.log('[WebSocket] Reconectado después de', attemptNumber, 'intentos');
            this.reconnectAttempts = 0;
        });
        // Evento de error de reconexión
        this.socket.on('reconnect_error', (error) => {
            console.error('[WebSocket] Error al reconectar:', error);
            this.reconnectAttempts++;
        });
        // Evento de intento de reconexión
        this.socket.on('reconnect_attempt', (attemptNumber) => {
            console.log('[WebSocket] Intento de reconexión #', attemptNumber);
        });
    }
    /**
     * Programa una reconexión después de un delay
     */
    scheduleReconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('[WebSocket] Máximo de intentos de reconexión alcanzado');
            return;
        }
        this.reconnectAttempts++;
        const delay = this.reconnectDelay * this.reconnectAttempts;
        console.log(`[WebSocket] Intentando reconectar en ${delay}ms (intento ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.reconnectTimer = setTimeout(() => {
            if (!this.isManualDisconnect && !this.socket?.connected) {
                this.connect();
            }
        }, delay);
    }
    /**
     * Suscribe a actualizaciones de unidades
     */
    subscribeToUnidades() {
        if (!this.socket?.connected) {
            console.warn('[WebSocket] No está conectado. No se puede suscribir a unidades.');
            return;
        }
        console.log('[WebSocket] Suscribiéndose a actualizaciones de unidades');
        this.socket.emit('subscribe:unidades');
    }
    /**
     * Desconecta del servidor WebSocket
     */
    disconnect() {
        this.isManualDisconnect = true;
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        if (this.socket) {
            console.log('[WebSocket] Desconectando...');
            this.socket.disconnect();
            this.socket = null;
        }
        this.isConnectedSubject.next(false);
        this.reconnectAttempts = 0;
    }
    /**
     * Verifica si está conectado
     */
    getIsConnected() {
        return this.socket?.connected ?? false;
    }
    /**
     * Obtiene el ID del socket actual
     */
    getSocketId() {
        return this.socket?.id;
    }
    /**
     * Limpia recursos al destruir el servicio
     */
    ngOnDestroy() {
        this.disconnect();
        this.positionUpdateSubject.complete();
        this.unidadUpdateSubject.complete();
        this.connectedSubject.complete();
        this.isConnectedSubject.complete();
    }
};
MonitoreoWebSocketService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MonitoreoWebSocketService);
export { MonitoreoWebSocketService };
//# sourceMappingURL=monitoreo-websocket.service.js.map