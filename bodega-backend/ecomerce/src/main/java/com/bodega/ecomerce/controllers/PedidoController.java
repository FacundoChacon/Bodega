package com.bodega.ecomerce.controllers;

import com.bodega.ecomerce.dto.CarritoDTO;
import com.bodega.ecomerce.entities.Pedido;
import com.bodega.ecomerce.services.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<?> crearPedido(@Valid @RequestBody CarritoDTO carritoDTO) {
        try {
            Pedido pedidoProcesado = pedidoService.procesarCompra(carritoDTO);

            return ResponseEntity.ok()
                    .body("¡Compra confirmada! Pedido N° " + pedidoProcesado.getId() + " registrado con éxito. 🍷");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}