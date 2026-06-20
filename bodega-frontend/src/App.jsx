import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TarjetaVino from './components/TarjetaVino';
import CarritoModal from './components/CarritoModal';

const App = () => {
    const [vinos, setVinos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [carrito, setCarrito] = useState([]);
    const [verCarrito, setVerCarrito] = useState(false);

    useEffect(() => {
        const traerVinosDesdeBackend = async () => {
            try {
                const respuesta = await fetch('http://localhost:8080/api/vinos');
                const datos = await respuesta.json();
                setVinos(datos);
                setCargando(false);
            } catch (error) {
                console.error("Error conectando a la API de la bodega:", error);
                setCargando(false);
            }
        };
        traerVinosDesdeBackend();
    }, []);

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
                
                // Retornamos un nuevo array clonado con la cantidad actualizada
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
                
                const resVinos = await fetch('http://localhost:8080/api/vinos');
                const nuevosVinos = await resVinos.json();
                setVinos(nuevosVinos);
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