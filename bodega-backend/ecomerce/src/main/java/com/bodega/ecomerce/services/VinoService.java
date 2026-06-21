package com.bodega.ecomerce.services;

import com.bodega.ecomerce.entities.Vino;
import com.bodega.ecomerce.enums.CampoOrdenamientoProducto;
import com.bodega.ecomerce.repositories.VinoRepository;
import com.bodega.ecomerce.specificaciones.VinoSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class VinoService {

    @Autowired
    private VinoRepository vinoRepository;

    // FILTROS Y ORDENAMIENTOS
    public Page<Vino> obtenerVinosConFiltros(
            String bodega,
            BigDecimal precioMin,
            BigDecimal precioMax,
            Integer categoriaId,
            CampoOrdenamientoProducto criterioOrden,
            String direccionOrden,
            int numeroPagina,
            int tamanioPagina
    ) {
        Specification<Vino> spec = Specification.where((root, query, criteriaBuilder) -> criteriaBuilder.conjunction());

        if (bodega != null) spec = spec.and(VinoSpecification.porBodega(bodega));
        if (precioMin != null) spec = spec.and(VinoSpecification.precioMayorOIgualA(precioMin));
        if (precioMax != null) spec = spec.and(VinoSpecification.precioMenorOIgualA(precioMax));
        if (categoriaId != null) spec = spec.and(VinoSpecification.porCategoria(categoriaId));

        Sort sort = Sort.unsorted();
        if (criterioOrden != null) {
            String campoReal = criterioOrden.getCampoEntidad();
            sort = "DESC".equalsIgnoreCase(direccionOrden) ? Sort.by(campoReal).descending() : Sort.by(campoReal).ascending();
        }

        Pageable pageable = PageRequest.of(numeroPagina, tamanioPagina, sort);

        return vinoRepository.findAll(spec, pageable);
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