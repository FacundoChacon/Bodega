package com.bodega.ecomerce.enums;

public enum CampoOrdenamientoProducto {
    NOMBRE("nombre"),
    PRECIO("precio"),
    ANIO_COSECHA("anioCosecha"),
    BODEGA("bodega");

    private final String campoEntidad;

    CampoOrdenamientoProducto(String campoEntidad) {
        this.campoEntidad = campoEntidad;
    }

    public String getCampoEntidad() {
        return this.campoEntidad;
    }
}