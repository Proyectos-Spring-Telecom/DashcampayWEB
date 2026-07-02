export class User {
    id?: string | number;
    token?: string;
    refreshToken?: string;
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    nombreCompleto?: string;
    permisos?: any;
    email?:string;
    idCliente?:any;
    imagenPerfil?: string;
    fotoPerfil?:any;
    logotipo?: string;
    rol: any;
    fechaCreacion: any;
    ultimoLogin: any;
    telefono: any;
    userName: any;
    nombreCliente: any;
    apellidoPaternoCliente: any;
    apellidoMaternoCliente: any;
}