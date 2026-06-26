package com.bodega.ecomerce.controllers;

import com.bodega.ecomerce.entities.Reserva;
import com.bodega.ecomerce.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservas() {
        return ResponseEntity.ok(reservaService.obtenerTodas());
    }

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody Reserva reserva) {
        try {
            Reserva nuevaReserva = reservaService.guardarReserva(reserva);
            return ResponseEntity.ok(nuevaReserva);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReserva(@PathVariable Integer id) {
        reservaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}