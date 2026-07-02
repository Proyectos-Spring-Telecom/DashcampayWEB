export var Permiso;
(function (Permiso) {
    /* #region Clientes */
    Permiso["Listado_Cliente"] = "1";
    Permiso["Crear_Clientes"] = "2";
    Permiso["Actualizar_Clientes"] = "3";
    Permiso["CambiarEstatus_Cliente"] = "4";
    /* #endregion */
    /* #region Usuarios */
    Permiso["Listado_Usuarios"] = "5";
    Permiso["Crear_Usuarios"] = "6";
    Permiso["Actualizar_Usuarios"] = "7";
    Permiso["CambiarEstatus_Usuarios"] = "8";
    /* #endregion */
    /* #region Roles */
    Permiso["Listado_Roles"] = "9";
    Permiso["Crear_Roles"] = "10";
    Permiso["Actualizar_Roles"] = "11";
    Permiso["CambiarEstatus_Roles"] = "12";
    /* #endregion */
    /* #region Permisos */
    Permiso["Listado_Permisos"] = "13";
    Permiso["Crear_Permisos"] = "14";
    Permiso["Actualizar_Permisos"] = "15";
    Permiso["CambiarEstatus_Permisos"] = "16";
    /* #endregion */
    /* #region Módulos */
    Permiso["Listado_Modulos"] = "17";
    Permiso["Crear_Modulos"] = "18";
    Permiso["Actualizar_Modulos"] = "19";
    Permiso["CambiarEstatus_Modulos"] = "20";
    /* #endregion */
    /* #region UsuariosPermisos */
    Permiso["Listado_UsuariosPermisos"] = "21";
    Permiso["Crear_UsuariosPermisos"] = "22";
    Permiso["Actualizar_UsuariosPermisos"] = "23";
    Permiso["CambiarEstatus_UsuariosPermisos"] = "24";
    /* #endregion */
    /* #region UsuariosRegiones */
    Permiso["Listado_UsuariosRegiones"] = "25";
    Permiso["Crear_UsuariosRegiones"] = "26";
    Permiso["Actualizar_UsuariosRegiones"] = "27";
    Permiso["CambiarEstatus_UsuariosRegiones"] = "28";
    /* #endregion */
    /* #region UsuariosInstalaciones */
    Permiso["Listado_UsuariosInstalaciones"] = "29";
    Permiso["Crear_UsuariosInstalaciones"] = "30";
    Permiso["Actualizar_UsuariosInstalaciones"] = "31";
    Permiso["CambiarEstatus_UsuariosInstalaciones"] = "32";
    /* #endregion */
    /* #region Operadores */
    Permiso["Listado_Operadores"] = "33";
    Permiso["Crear_Operadores"] = "34";
    Permiso["Actualizar_Operadores"] = "35";
    Permiso["CambiarEstatus_Operadores"] = "36";
    /* #endregion */
    /* #region Vehículos */
    Permiso["Listado_Vehiculos"] = "37";
    Permiso["Crear_Vehiculos"] = "38";
    Permiso["Actualizar_Vehiculos"] = "39";
    Permiso["CambiarEstatus_Vehiculos"] = "40";
    /* #endregion */
    /* #region Validador */
    Permiso["Listado_Validador"] = "41";
    Permiso["Crear_Validador"] = "42";
    Permiso["Actualizar_Validador"] = "43";
    Permiso["CambiarEstatus_Validador"] = "44";
    /* #endregion */
    /* #region Contadora */
    Permiso["Listado_Contadora"] = "45";
    Permiso["Crear_Contadora"] = "46";
    Permiso["Actualizar_Contadora"] = "47";
    Permiso["CambiarEstatus_Contadora"] = "48";
    /* #endregion */
    /* #region Instalaciones (Vehículos en módulo 13) */
    Permiso["Listado_Instalaciones"] = "49";
    Permiso["Crear_Instalaciones"] = "50";
    Permiso["Actualizar_Instalaciones"] = "51";
    Permiso["CambiarEstatus_Instalaciones"] = "52";
    /* #endregion */
    /* #region Turnos */
    Permiso["Listado_Turnos"] = "53";
    Permiso["Crear_Turnos"] = "54";
    Permiso["Actualizar_Turnos"] = "55";
    Permiso["CambiarEstatus_Turnos"] = "56";
    /* #endregion */
    /* #region Viajes */
    Permiso["Listado_Viajes"] = "57";
    Permiso["Crear_Viajes"] = "58";
    Permiso["Actualizar_Viajes"] = "59";
    Permiso["CambiarEstatus_Viajes"] = "60";
    /* #endregion */
    /* #region Zonas */
    Permiso["Listado_Zonas"] = "61";
    Permiso["Crear_Zonas"] = "62";
    Permiso["Actualizar_Zonas"] = "63";
    Permiso["CambiarEstatus_Zonas"] = "64";
    /* #endregion */
    /* #region Rutas */
    Permiso["Listado_Rutas"] = "65";
    Permiso["Crear_Rutas"] = "66";
    Permiso["Actualizar_Rutas"] = "67";
    Permiso["CambiarEstatus_Rutas"] = "68";
    /* #endregion */
    /* #region Variantes */
    Permiso["Listado_Variantes"] = "69";
    Permiso["Crear_Variantes"] = "70";
    Permiso["Actualizar_Variantes"] = "71";
    Permiso["CambiarEstatus_Variantes"] = "72";
    /* #endregion */
    /* #region Tarifas */
    Permiso["Listado_Tarifas"] = "73";
    Permiso["Crear_Tarifas"] = "74";
    Permiso["Actualizar_Tarifas"] = "75";
    Permiso["CambiarEstatus_Tarifas"] = "76";
    /* #endregion */
    /* #region Monederos */
    Permiso["Listado_Monederos"] = "77";
    Permiso["Crear_Monederos"] = "78";
    Permiso["Actualizar_Monederos"] = "79";
    Permiso["CambiarEstatus_Monederos"] = "80";
    /* #endregion */
    /* #region Pasajeros */
    Permiso["Listado_Pasajeros"] = "81";
    Permiso["Crear_Pasajeros"] = "82";
    Permiso["Actualizar_Pasajeros"] = "83";
    Permiso["CambiarEstatus_Pasajeros"] = "84";
    /* #endregion */
    /* #region Bitácora */
    Permiso["Listado_Bitacora"] = "85";
    /* #endregion */
    /* #region ConteoPasajeros */
    Permiso["Listado_ConteoPasajeros"] = "86";
    Permiso["Crear_ConteoPasajeros"] = "87";
    /* #endregion */
    /* #region Posiciones */
    Permiso["Crear_Posiciones"] = "89";
    /* #endregion */
    /* #region Transacciones */
    Permiso["Listado_Transacciones"] = "90";
    Permiso["Crear_Transacciones"] = "91";
    Permiso["Punto_Venta"] = "99";
    /* #endregion */
    /* #region Extras / Pruebas */
    Permiso["Consultar_Dashboard"] = "100";
    /* #endregion */
    /* #region Extras / Pruebas */
    Permiso["Consultar_Monitoreo"] = "101";
    Permiso["Prueba_Modulos"] = "101";
    /* #endregion */
    /* #region Transbordos */
    Permiso["Listado_Transbordos"] = "127";
    Permiso["Crear_Transbordos"] = "128";
    Permiso["Actualizar_Transbordos"] = "129";
    Permiso["CambiarEstatus_Transbordos"] = "130";
    /* #endregion */
})(Permiso || (Permiso = {}));
//# sourceMappingURL=permiso.enum.js.map