package com.bodega.ecomerce.dto;

import com.bodega.ecomerce.enums.MetodoPago;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class CarritoDTO {

    @NotNull(message = "El ID del usuario es obligatorio para procesar la compra.")
    private Integer usuarioId;

    private MetodoPago metodoPago;

    @NotEmpty(message = "El carrito de compras no puede estar vacío.")
    @Valid
    private List<ItemCarrito> items;

    @Data
    public static class ItemCarrito {
        @NotNull(message = "El ID del vino no puede ser nulo.")
        private Integer vinoId;

        @NotNull(message = "La cantidad del producto es obligatoria.")
        @Min(value = 1, message = "Debe añadir al menos 1 botella al carrito.")
        private Integer cantidad;
    }
}