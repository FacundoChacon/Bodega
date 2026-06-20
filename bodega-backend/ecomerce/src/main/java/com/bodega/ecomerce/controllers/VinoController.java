package com.bodega.ecomerce.controllers;

import com.bodega.ecomerce.entities.Vino;
import com.bodega.ecomerce.exceptions.RecursoNoEncontradoException;
import com.bodega.ecomerce.services.VinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vinos")
@CrossOrigin(origins = "*")
public class VinoController {

    @Autowired
    private VinoService vinoService;

    @GetMapping
    public ResponseEntity<List<Vino>> listarVinos(
            @RequestParam(required = false) String bodega,
            @RequestParam(required = false) BigDecimal precioMin,
            @RequestParam(required = false) BigDecimal precioMax,
            @RequestParam(required = false) Integer categoriaId) {

        List<Vino> vinosFiltrados = vinoService.obtenerVinosConFiltros(bodega, precioMin, precioMax, categoriaId);
        return ResponseEntity.ok(vinosFiltrados);
    }

    @PostMapping
    public ResponseEntity<Vino> crearVino(@RequestBody Vino vino) {
        Vino nuevoVino = vinoService.guardar(vino);
        return ResponseEntity.ok(nuevoVino);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vino> actualizarVino(@PathVariable Integer id, @RequestBody Vino vinoDetalles) {
        Vino vino = vinoService.obtenerPorId(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No se puede actualizar. El vino con ID: " + id + " no existe en la cava."));

        vino.setNombre(vinoDetalles.getNombre());
        vino.setBodega(vinoDetalles.getBodega());
        vino.setAnioCosecha(vinoDetalles.getAnioCosecha());
        vino.setPrecio(vinoDetalles.getPrecio());
        vino.setStock(vinoDetalles.getStock());
        vino.setDescripcion(vinoDetalles.getDescripcion());
        vino.setCategoria(vinoDetalles.getCategoria());

        Vino vinoActualizado = vinoService.guardar(vino);
        return ResponseEntity.ok(vinoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVino(@PathVariable Integer id) {
        vinoService.obtenerPorId(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("No se puede eliminar. El vino con ID: " + id + " no existe."));

        vinoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}