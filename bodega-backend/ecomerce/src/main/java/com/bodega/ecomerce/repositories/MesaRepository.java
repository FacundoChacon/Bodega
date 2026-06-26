package com.bodega.ecomerce.repositories;

import com.bodega.ecomerce.entities.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Integer> {
    List<Mesa> findByCapacidadGreaterThanEqualAndDisponibleTrue(Integer capacidad);
}