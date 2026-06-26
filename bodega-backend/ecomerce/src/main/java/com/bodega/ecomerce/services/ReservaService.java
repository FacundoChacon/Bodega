package com.bodega.ecomerce.services;

import com.bodega.ecomerce.entities.Mesa;
import com.bodega.ecomerce.entities.Reserva;
import com.bodega.ecomerce.exceptions.RecursoNoEncontradoException;
import com.bodega.ecomerce.repositories.MesaRepository;
import com.bodega.ecomerce.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private MesaRepository mesaRepository;

    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    public Reserva guardarReserva(Reserva reserva) {
        // BUSCA LAS MESAS CON LA CAPACIDAD REQUERIDA
        List<Mesa> mesasAdecuadas = mesaRepository.findByCapacidadGreaterThanEqualAndDisponibleTrue(reserva.getCantidadPersonas());

        // FILTRA LAS MESAS QUE ESTAN TOMADADAS ESAS FECHAS
        List<Integer> idsMesasOcupadas = reservaRepository.findByFecha(reserva.getFecha())
                .stream()
                .map(r -> r.getMesa().getId())
                .collect(Collectors.toList());

        // MUESTRA LA PRIMERA MESA DISPONIBLE
        Mesa mesaLibre = mesasAdecuadas.stream()
                .filter(m -> !idsMesasOcupadas.contains(m.getId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No hay mesas disponibles para " + reserva.getCantidadPersonas() + " personas en la fecha seleccionada."));

        // ASIGNA LA MESA Y PERSISTE
        reserva.setMesa(mesaLibre);
        return reservaRepository.save(reserva);
    }

    public void eliminar(Integer id) {
        reservaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("La reserva con ID: " + id + " no existe."));
        reservaRepository.deleteById(id);
    }
}