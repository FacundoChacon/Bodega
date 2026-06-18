package com.bodega.ecomerce.services;

import com.bodega.ecomerce.entities.Categoria;
import com.bodega.ecomerce.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // LISTA TODAS LAS CATEGORIAS
    public List<Categoria> obtenerTodas() {
        return categoriaRepository.findAll();
    }

    // GUARDA LA CATEGORIA CREADA
    public Categoria guardar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
}