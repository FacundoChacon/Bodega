import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TarjetaVino from './components/TarjetaVino';
import CarritoModal from './components/CarritoModal';
import { obtenerVinosConFiltrosYPaginas } from './services/VinoService';

const App = () => {
    const [vinos, setVinos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [carrito, setCarrito] = useState([]);
    const [verCarrito, setVerCarrito] = useState(false);
    const [paginaActual, setPaginaActual] = useState(0);

    useEffect(() => {
        const traerVinosDesdeBackend = async () => {
            try {
                setCargando(true);
                const datosPaginados = await obtenerVinosConFiltrosYPaginas({ page: paginaActual, size: 2 });
                setVinos(datosPaginados.content);
                setTotalPaginas(datosPaginados.totalPages);
                setCargando(false);
            } catch (error) {
                console.error("Error conectando a la API de la bodega:", error);
                setCargando(false);
            }
        };
        traerVinosDesdeBackend();
    }, [paginaActual]);

    const agregarAlCarrito = (vino) => {
        const vinoReal = vinos.find(v => v.id === vino.id);
        const stockReal = vinoReal ? vinoReal.stock : 0;

        setCarrito((carritoActual) => {
            const existe = carritoActual.find(item => item.id === vino.id);

            if (existe) {
                if (existe.cantidad >= stockReal) {
                    alert(`Lo sentimos, no hay más stock disponible de ${vino.nombre} (Máximo: ${stockReal} unidades).`);
                    return carritoActual;
                }
                
                return carritoActual.map(item => 
                    item.id === vino.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                if (stockReal > 0) {
                    return [...carritoActual, { ...vino, stock: stockReal, cantidad: 1 }];
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
        setCarrito((carritoActual) => 
            carritoActual.filter(item => item.id !== vinoId)
        );
    };

    const enviarPedidoAlBackend = async () => {
        const pedidoDTO = {
            usuarioId: 1,
            items: carrito.map(item => ({
                vinoId: item.id,
                cantidad: item.cantidad
            }))
        };

        try {
            const respuesta = await fetch('http://localhost:8080/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoDTO)
            });

            if (respuesta.ok) {
                alert("¡Compra confirmada! Tu pedido ha sido registrado en la base de datos de la bodega. 🍷");
                setCarrito([]);
                setVerCarrito(false);
                setPaginaActual(0);
                setCargando(true);
                const datosPaginados = await obtenerVinosConFiltrosYPaginas({ 
                    page: 0,
                    size: 2  // NUMERO DE OBJETOS QUE SE VA A MOSTREAR (si se desea otro numero se debe modificar en el backend tambien)
                });
                setVinos(datosPaginados.content);
                setTotalPaginas(datosPaginados.totalPages);
                setCargando(false);

            } else {
                const mensajeError = await respuesta.text();
                alert(`Error al procesar la compra: ${mensajeError}`);
            }
        } catch (error) {
            console.error("Error al enviar el pedido:", error);
            alert("Hubo un problema de conexión con el servidor.");
            setCargando(false);
        }
    };

    const totalBotellas = carrito.reduce((acum, item) => acum + item.cantidad, 0);

    return (
        <div style={{ backgroundColor: '#fdfdfb', minHeight: '100vh' }}>
            <Navbar cantidadCarrito={totalBotellas} alAbrirCarrito={() => setVerCarrito(true)} />

            <Hero />

            <main id="cava" style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', textAlign: 'center', color: '#1a1a1a', fontWeight: '400' }}>
                    Nuestra Cava Seleccionada
                </h2>
                <p style={{ fontFamily: '"Inter", sans-serif', textAlign: 'center', color: '#666', marginBottom: '40px' }}>
                    Cada botella representa la máxima expresión de nuestro terruño.
                </p>

                {cargando ? (
                    <h3 style={{ textAlign: 'center', fontFamily: '"Playfair Display", serif', color: '#722f37' }}>
                        Cargando la cava... 🍷
                    </h3>
                ) : (
                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {vinos.length === 0 ? (
                            <p style={{ fontFamily: '"Inter", sans-serif', color: '#777' }}>No hay vinos disponibles.</p>
                        ) : (
                            vinos.map((vino) => {
                                const itemEnCarrito = carrito.find(item => item.id === vino.id);
                                const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;
                            
                                return (
                                    <TarjetaVino 
                                        key={vino.id} 
                                        vino={vino} 
                                        alAgregarAlCarrito={agregarAlCarrito} 
                                        cantidadEnCarrito={cantidadActual} // <-- Pasamos la cantidad actual como prop
                                    />
                                );
                            })
                        )}
                    </div>
                )}
            </main>

            <CarritoModal 
                mostrar={verCarrito} 
                alCerrar={() => setVerCarrito(false)} 
                items={carrito} 
                alConfirmarCompra={enviarPedidoAlBackend}
                alRestarCantidad={restarDelCarrito}
                alEliminarItem={eliminarDelCarrito}
                alSumarCantidad={agregarAlCarrito}
            />
        </div>
    );
};

export default App;