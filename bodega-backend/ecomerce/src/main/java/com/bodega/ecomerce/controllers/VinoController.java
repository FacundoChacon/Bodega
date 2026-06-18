package com.bodega.ecomerce.controllers;

import com.bodega.ecomerce.entities.Vino;
import com.bodega.ecomerce.services.VinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vinos")
@CrossOrigin(origins = "*")
public class VinoController {

    @Autowired
    private VinoService vinoService;

    @GetMapping
    public ResponseEntity<List<Vino>> listarVinos(@RequestParam(required = false) Integer categoriaId) {
        if (categoriaId != null) {
            return ResponseEntity.ok(vinoService.obtenerPorCategoria(categoriaId));
        }
        return ResponseEntity.ok(vinoService.obtenerTodos());   //200
    }

    @PostMapping
    public ResponseEntity<Vino> crearVino(@RequestBody Vino vino) {
        Vino nuevoVino = vinoService.guardar(vino);
        return ResponseEntity.ok(nuevoVino);    //200
    }

    // PUT: http://localhost:8080/api/vinos/1
    @PutMapping("/{id}")
    public ResponseEntity<Vino> actualizarVino(@PathVariable Integer id, @RequestBody Vino vinoDetalles) {
        Optional<Vino> vinoExistente = vinoService.obtenerPorId(id);

        if (vinoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();   //404
        }

        Vino vino = vinoExistente.get();
        // SETS
        vino.setNombre(vinoDetalles.getNombre());
        vino.setBodega(vinoDetalles.getBodega());
        vino.setAnioCosecha(vinoDetalles.getAnioCosecha());
        vino.setPrecio(vinoDetalles.getPrecio());
        vino.setStock(vinoDetalles.getStock());
        vino.setDescripcion(vinoDetalles.getDescripcion());
        vino.setCategoria(vinoDetalles.getCategoria());

        Vino vinoActualizado = vinoService.guardar(vino);
        return ResponseEntity.ok(vinoActualizado);  //200
    }

    // DELETE: http://localhost:8080/api/vinos/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVino(@PathVariable Integer id) {
        Optional<Vino> vinoExistente = vinoService.obtenerPorId(id);

        if (vinoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();   //404
        }

        vinoService.eliminar(id);
        return ResponseEntity.noContent().build();  //204
    }
}