package com.bodega.ecomerce.repositories;

import com.bodega.ecomerce.entities.Vino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VinoRepository extends JpaRepository<Vino, Integer>, JpaSpecificationExecutor<Vino> {
    List<Vino> findByCategoriaId(Integer categoriaId);
}
