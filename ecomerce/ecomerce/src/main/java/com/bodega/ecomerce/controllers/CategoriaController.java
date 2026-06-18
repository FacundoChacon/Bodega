package com.bodega.ecomerce.controllers;

import com.bodega.ecomerce.entities.Categoria;
import com.bodega.ecomerce.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*") // Clave para que React no nos rebote por CORS en el futuro
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    // GET: http://localhost:8080/api/categorias
    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {
        return ResponseEntity.ok(categoriaService.obtenerTodas());
    }

    // POST: http://localhost:8080/api/categorias
    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        Categoria nuevaCategoria = categoriaService.guardar(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }
}