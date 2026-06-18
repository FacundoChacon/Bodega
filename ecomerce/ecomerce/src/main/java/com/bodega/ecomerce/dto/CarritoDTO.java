package com.bodega.ecomerce.dto;

import lombok.Data;
import java.util.List;

@Data
public class CarritoDTO {
    private Integer usuarioId;
    private List<ItemCarrito> items;

    @Data
    public static class ItemCarrito {
        private Integer vinoId;
        private Integer cantidad;
    }
}