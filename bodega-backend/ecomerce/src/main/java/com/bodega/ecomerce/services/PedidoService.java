package com.bodega.ecomerce.services;

import com.bodega.ecomerce.dto.CarritoDTO;
import com.bodega.ecomerce.entities.DetallePedido;
import com.bodega.ecomerce.entities.Pedido;
import com.bodega.ecomerce.entities.Usuario;
import com.bodega.ecomerce.entities.Vino;
import com.bodega.ecomerce.exceptions.RecursoNoEncontradoException;
import com.bodega.ecomerce.exceptions.StockInsuficienteException;
import com.bodega.ecomerce.repositories.DetallePedidoRepository;
import com.bodega.ecomerce.repositories.PedidoRepository;
import com.bodega.ecomerce.repositories.UsuarioRepository;
import com.bodega.ecomerce.repositories.VinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

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

        // VALIDACIÓN DE USUARIO
        Usuario usuario = usuarioRepository.findById(carrito.getUsuarioId())
                .orElseThrow(() -> new RecursoNoEncontradoException("No se pudo procesar la compra. El usuario con ID " + carrito.getUsuarioId() + " no existe."));

        // CREACIÓN INICIAL DEL PEDIDO
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDateTime.now());
        pedido.setMetodoPago(carrito.getMetodoPago());
        pedido.setTotal(BigDecimal.ZERO);
        pedido.setDetalles(new ArrayList<>());

        pedido = pedidoRepository.save(pedido);

        BigDecimal totalPedido = BigDecimal.ZERO;

        // PROCESAMIENTO DE LOS ÍTEMS DEL CARRITO
        for (CarritoDTO.ItemCarrito item : carrito.getItems()) {

            Vino vino = vinoRepository.findById(item.getVinoId())
                    .orElseThrow(() -> new RecursoNoEncontradoException("El producto con ID " + item.getVinoId() + " ya no se encuentra disponible en nuestro catálogo."));

            if (vino.getStock() < item.getCantidad()) {
                throw new StockInsuficienteException("Stock insuficiente para el vino: " + vino.getNombre() +
                        " (Disponibles: " + vino.getStock() + ", Solicitados: " + item.getCantidad() + ").");
            }

            vino.setStock(vino.getStock() - item.getCantidad());
            vinoRepository.save(vino);

            BigDecimal subtotalItem = vino.getPrecio().multiply(new BigDecimal(item.getCantidad()));
            totalPedido = totalPedido.add(subtotalItem);

            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setVino(vino);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(vino.getPrecio());

            detallePedidoRepository.save(detalle);
        }

        // ACTUALIZACIÓN DEL TOTAL
        pedido.setTotal(totalPedido);
        return pedidoRepository.save(pedido);
    }
}