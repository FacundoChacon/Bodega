package com.bodega.ecomerce.specificaciones;

import com.bodega.ecomerce.entities.Vino;
import org.springframework.data.jpa.domain.Specification;
import java.math.BigDecimal;

public class VinoSpecification {

    // FILTRO POR BODEGA (no case sensitive)
    public static Specification<Vino> porBodega(String bodega) {
        return (root, query, criteriaBuilder) -> {
            if (bodega == null || bodega.trim().isEmpty()) return null;
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("bodega")),
                    "%" + bodega.toLowerCase() + "%"
            );
        };
    }

    // PRECIO MINIMO
    public static Specification<Vino> precioMayorOIgualA(BigDecimal precioMin) {
        return (root, query, criteriaBuilder) -> {
            if (precioMin == null) return null;
            return criteriaBuilder.greaterThanOrEqualTo(root.get("precio"), precioMin);
        };
    }

    // PRECIO MAXIMO
    public static Specification<Vino> precioMenorOIgualA(BigDecimal precioMax) {
        return (root, query, criteriaBuilder) -> {
            if (precioMax == null) return null;
            return criteriaBuilder.lessThanOrEqualTo(root.get("precio"), precioMax);
        };
    }

    // CATEGORIA POR ID
    public static Specification<Vino> porCategoria(Integer categoriaId) {
        return (root, query, criteriaBuilder) -> {
            if (categoriaId == null) return null;
            return criteriaBuilder.equal(root.get("categoria").get("id"), categoriaId);
        };
    }
}