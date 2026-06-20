package com.bodega.ecomerce.services;

import com.bodega.ecomerce.dto.CarritoDTO;
import com.bodega.ecomerce.entities.DetallePedido;
import com.bodega.ecomerce.entities.Pedido;
import com.bodega.ecomerce.entities.Usuario;
import com.bodega.ecomerce.entities.Vino;
import com.bodega.ecomerce.repositories.DetallePedidoRepository;
import com.bodega.ecomerce.repositories.PedidoRepository;
import com.bodega.ecomerce.repositories.VinoRepository;
import com.bodega.ecomerce.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private VinoRepository vinoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Pedido procesarCompra(CarritoDTO carrito) {
        // VALIDACION DE USUARIO
        Usuario usuario = usuarioRepository.findById(carrito.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // CREAR PEDIDO
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDateTime.now());
        pedido.setTotal(BigDecimal.ZERO);

        // GUARDAR PEDIDO PARA GENERAR ID
        pedido = pedidoRepository.save(pedido);

        BigDecimal totalPedido = BigDecimal.ZERO;

        // VALIDANDO EXISTENCIA DE VINO
        for (CarritoDTO.ItemCarrito item : carrito.getItems()) {
            Vino vino = vinoRepository.findById(item.getVinoId())
                    .orElseThrow(() -> new RuntimeException("Vino no encontrado con ID: " + item.getVinoId()));

            // CONTROL DE STOCK con analisis
            if (vino.getStock() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para el vino: " + vino.getNombre());
            }

            // DESCONTAR STOCK
            vino.setStock(vino.getStock() - item.getCantidad());
            vinoRepository.save(vino);

            // CALCULA SUBTOTALES
            BigDecimal subtotalItem = vino.getPrecio().multiply(new BigDecimal(item.getCantidad()));
            totalPedido = totalPedido.add(subtotalItem);

            // GUARDAR EL PRECIO
            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setVino(vino);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(vino.getPrecio());
            detallePedidoRepository.save(detalle);
        }

        // ACTUALIZA EL TOTAL
        pedido.setTotal(totalPedido);
        return pedidoRepository.save(pedido);
    }
}