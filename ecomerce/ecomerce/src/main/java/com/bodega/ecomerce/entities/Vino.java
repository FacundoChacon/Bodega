package com.bodega.ecomerce.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "vino")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 30)
    private String nombre;

    @Column(nullable = false, length = 40)
    private String bodega;

    @Column(name = "año_cosecha", nullable = false)
    private Integer anioCosecha;

    @Column(precision = 10, scale = 2) // Indico los parametros del decimal
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    // MUCHOS VINOS PUEDEN TENER UNA CATEGORIA
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
}