package com.bodega.ecomerce.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 40)
    private String nombre;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(name = "contraseña", nullable = false, length = 30)
    private String contrasenia;

    @Column(nullable = false, length = 10)
    private String rol;
}