package com.bodega.ecomerce.services;

import com.bodega.ecomerce.entities.Vino;
import com.bodega.ecomerce.repositories.VinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VinoService {

    @Autowired
    private VinoRepository vinoRepository;

    //  LISTA TODOS
    public List<Vino> obtenerTodos() {
        return vinoRepository.findAll();
    }

    //  OBTIENE EL VINO POR ID
    public Optional<Vino> obtenerPorId(Integer id) {
        return vinoRepository.findById(id);
    }

    //  LISTA POR CATEGORIA
    public List<Vino> obtenerPorCategoria(Integer categoriaId) {
        return vinoRepository.findByCategoriaId(categoriaId);
    }

    //  GUARDA EL VINO
    public Vino guardar(Vino vino) {
        return vinoRepository.save(vino);
    }

    //  ELIMINA POR ID
    public void eliminar(Integer id) {
        vinoRepository.deleteById(id);
    }
}