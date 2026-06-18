package com.bodega.ecomerce.controllers;

import com.bodega.ecomerce.dto.CarritoDTO;
import com.bodega.ecomerce.entities.Pedido;
import com.bodega.ecomerce.services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    // POST: http://localhost:8080/api/pedidos
    @PostMapping
    public ResponseEntity<?> registrarPedido(@RequestBody CarritoDTO carrito) {
        try {
            Pedido nuevoPedido = pedidoService.procesarCompra(carrito);
            return ResponseEntity.ok(nuevoPedido);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}