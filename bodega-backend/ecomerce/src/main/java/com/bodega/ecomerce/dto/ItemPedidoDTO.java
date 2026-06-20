package com.bodega.ecomerce.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPedidoDTO {

    @NotNull(message = "El ID del vino no puede ser nulo")
    private Long vinoId;

    @NotNull(message = "La cantidad no puede ser nula")
    @Min(value = 1, message = "Debe añadir al menos 1 botella de este vino")
    private Integer cantidad;
}