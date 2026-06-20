package com.bodega.ecomerce.services;

import com.bodega.ecomerce.entities.Vino;
import com.bodega.ecomerce.repositories.VinoRepository;
import com.bodega.ecomerce.specificaciones.VinoSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class VinoService {

    @Autowired
    private VinoRepository vinoRepository;

    public List<Vino> obtenerVinosConFiltros(String bodega, BigDecimal precioMin, BigDecimal precioMax, Integer categoriaId) {
        Specification<Vino> spec = Specification.where((Specification<Vino>) null);

        // Vamos encadenando dinámicamente los filtros SÓLO si el usuario los completó en el frontend
        if (bodega != null) {
            spec = spec.and(VinoSpecification.porBodega(bodega));
        }
        if (precioMin != null) {
            spec = spec.and(VinoSpecification.precioMayorOIgualA(precioMin));
        }
        if (precioMax != null) {
            spec = spec.and(VinoSpecification.precioMenorOIgualA(precioMax));
        }
        if (categoriaId != null) {
            spec = spec.and(VinoSpecification.porCategoria(categoriaId));
        }

        // Ejecuta la query final armada a medida
        return vinoRepository.findAll(spec);
    }

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