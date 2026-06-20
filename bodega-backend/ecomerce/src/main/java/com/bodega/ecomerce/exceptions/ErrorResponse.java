package com.bodega.ecomerce.exceptions;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ErrorResponse {
    private int estado;
    private String mensaje;
    private LocalDateTime fecha;

    public ErrorResponse(int estado, String mensaje) {
        this.estado = estado;
        this.mensaje = mensaje;
        this.fecha = LocalDateTime.now();
    }
}