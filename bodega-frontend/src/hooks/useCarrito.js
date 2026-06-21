import { useState } from 'react';

export const useCarrito = (setVerCarrito, setPaginaActual) => {
    const [carrito, setCarrito] = useState([]);
    // 👇 Nuevo estado para avisarle a la Navbar que tire el destello
    const [animarBoton, setAnimarBoton] = useState(false);

    const agregarAlCarrito = (vino) => {
        const stockReal = vino.stock; 
        
        // Disparamos la animación visual en la Navbar 🚀
        setAnimarBoton(true);
        setTimeout(() => setAnimarBoton(false), 400);

        setCarrito((carritoActual) => {
            const existe = carritoActual.find(item => item.id === vino.id);
            if (existe) {
                if (existe.cantidad >= stockReal) {
                    alert(`Lo sentimos, no hay más stock disponible de ${vino.nombre}.`);
                    return carritoActual;
                }
                return carritoActual.map(item => 
                    item.id === vino.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                if (stockReal > 0) {
                    return [...carritoActual, { ...vino, cantidad: 1 }];
                }
                return carritoActual;
            }
        });
    };

    const restarDelCarrito = (vinoId) => {
        setCarrito((carritoActual) => {
            const itemExistente = carritoActual.find(item => item.id === vinoId);
            if (itemExistente.cantidad === 1) {
                return carritoActual.filter(item => item.id !== vinoId);
            } else {
                return carritoActual.map(item =>
                    item.id === vinoId ? { ...item, cantidad: item.cantidad - 1 } : item
                );
            }
        });
    };

    const eliminarDelCarrito = (vinoId) => {
        setCarrito((carritoActual) => carritoActual.filter(item => item.id !== vinoId));
    };

    const enviarPedidoAlBackend = async () => {
        const pedidoDTO = {
            usuarioId: 1,
            items: carrito.map(item => ({ vinoId: item.id, cantidad: item.cantidad }))
        };
        try {
            const respuesta = await fetch('http://localhost:8080/api/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedidoDTO)
            });
            if (respuesta.ok) {
                alert("¡Compra confirmada! 🍷");
                setCarrito([]);
                setVerCarrito(false);
                setPaginaActual(0);
            } else {
                const mensajeError = await respuesta.text();
                alert(`Error al procesar la compra: ${mensajeError}`);
            }
        } catch (error) {
            console.error("Error al enviar el pedido:", error);
            alert("Hubo un problema de conexión con el servidor.");
        }
    };

    const totalBotellas = carrito.reduce((acum, item) => acum + item.cantidad, 0);

    return {
        carrito,
        totalBotellas,
        animarBoton, // 👈 Lo exportamos para pasárselo a la Navbar
        agregarAlCarrito,
        restarDelCarrito,
        eliminarDelCarrito,
        enviarPedidoAlBackend
    };
};