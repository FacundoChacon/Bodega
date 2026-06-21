import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TarjetaVino from './components/TarjetaVino';
import CarritoModal from './components/CarritoModal';
import { obtenerVinosConFiltrosYPaginas } from './services/VinoService';
import Filtros from './components/Filtros';

const App = () => {
    const [vinos, setVinos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [carrito, setCarrito] = useState([]);
    const [verCarrito, setVerCarrito] = useState(false);
    const [paginaActual, setPaginaActual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [desplazamiento, setDesplazamiento] = useState('0px');
    const [opacidad, setOpacidad] = useState(1);
    const [conTransicion, setConTransicion] = useState(true);
    const [filtros, setFiltros] = useState({
        bodega: '',
        precioMin: '',
        precioMax: '',
        categoriaId: '',
        ordenarPor: 'NOMBRE',
        ordenDireccion: 'ASC'
    });

    const cavaRef = useRef(null);

    useEffect(() => {
        const traerVinosDesdeBackend = async () => {
            try {
                setCargando(true);

                const datosPaginados = await obtenerVinosConFiltrosYPaginas({ 
                    page: paginaActual, 
                    size: 3,
                    bodega: filtros.bodega,
                    precioMin: filtros.precioMin || null,
                    precioMax: filtros.precioMax || null,
                    categoriaId: filtros.categoriaId || null,
                    ordenarPor: filtros.ordenarPor,
                    ordenDirection: filtros.ordenDireccion
                });
                
                setVinos(datosPaginados.content); 
                setTotalPaginas(datosPaginados.totalPages);
                setCargando(false);
            } catch (error) {
                console.error("Error conectando a la API de la bodega:", error);
                setCargando(false);
            }
        };
        traerVinosDesdeBackend();
    }, [paginaActual, filtros, carrito.length]);

    // ANIMACION DE TRANSICION ENTRE PAGINAS
    useEffect(() => {
        if (!cargando && vinos.length > 0) {
            const timer = setTimeout(() => {
                setConTransicion(true);
                setDesplazamiento('0px'); 
                setOpacidad(1); 
                
                if (paginaActual >= totalPaginas && totalPaginas > 0) {
                    setPaginaActual(totalPaginas - 1);
                }
            }, 50); 
            return () => clearTimeout(timer);
        }
    }, [cargando, vinos, paginaActual, totalPaginas]);

    const manejarCambioPagina = (nuevaPagina, direccion) => {
        setConTransicion(true);
        setDesplazamiento(direccion === 'der' ? '-100px' : '100px');
        setOpacidad(0);

        setTimeout(() => {
            setConTransicion(false);
            setDesplazamiento(direccion === 'der' ? '100px' : '-100px');
            setPaginaActual(nuevaPagina);
        }, 350);
    };

    const agregarAlCarrito = (vino) => {
        const stockReal = vino.stock; 
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

    //  FILTROS DINAMICOS
    useEffect(() => {
        const traerVinosDesdeBackend = async () => {
            try {
                setCargando(true);

                const datosPaginados = await obtenerVinosConFiltrosYPaginas({ 
                    page: paginaActual, 
                    size: 3,
                    bodega: filtros.bodega,
                    precioMin: filtros.precioMin || null,
                    precioMax: filtros.precioMax || null,
                    categoriaId: filtros.categoriaId || null,
                    ordenarPor: filtros.ordenarPor,
                    ordenDirection: filtros.ordenDireccion
                });
                
                setVinos(datosPaginados.content); 
                setTotalPaginas(datosPaginados.totalPages);
                setCargando(false);
            } catch (error) {
                console.error("Error conectando a la API de la bodega:", error);
                setCargando(false);
            }
        };
        traerVinosDesdeBackend();
    }, [paginaActual, filtros]);

    const manejarCambioFiltro = (nombreFiltro, valor) => {
        setFiltros(prev => ({
            ...prev,
            [nombreFiltro]: valor
        }));
        setPaginaActual(0);
    };

    const manejarLimpiarFiltros = () => {
        setFiltros({
            bodega: '',
            precioMin: '',
            precioMax: '',
            categoriaId: '',
            ordenarPor: 'NOMBRE',
            ordenDireccion: 'ASC'
        });
        setPaginaActual(0);
    };

    const totalBotellas = carrito.reduce((acum, item) => acum + item.cantidad, 0);

    const scrollSuaveACava = () => {
        if (cavaRef.current) {
            const posicionDestino = cavaRef.current.getBoundingClientRect().top + window.scrollY;
            const posicionFinal = posicionDestino - 90;

            window.scrollTo({
                top: posicionFinal,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div style={{ backgroundColor: '#fdfdfb', minHeight: '100vh' }}>
            <Navbar cantidadCarrito={totalBotellas} alAbrirCarrito={() => setVerCarrito(true)} alClickCava={scrollSuaveACava} />
            <Hero alClickExplorar={scrollSuaveACava} />
            <main 
                ref={cavaRef} 
                id="cava" 
                style={{ 
                    padding: '60px 20px', 
                    maxWidth: '1200px', 
                    margin: '0 auto', 
                    position: 'relative',
                    scrollMarginTop: '90px',
                    minHeight: '500px'
                }}
            >
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', textAlign: 'center', color: '#1a1a1a', fontWeight: '400' }}>
                    Nuestra Cava Seleccionada
                </h2>
                <p style={{ fontFamily: '"Inter", sans-serif', textAlign: 'center', color: '#666', marginBottom: '40px' }}>
                    Cada botella representa la máxima expresión de nuestro terruño.
                </p>
                <Filtros 
                    filtros={filtros}
                    alCambiarFiltro={manejarCambioFiltro}
                    alLimpiarFiltros={manejarLimpiarFiltros}
                />

                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', gap: '10px' }}>
                    <button 
                        disabled={paginaActual === 0 || cargando}
                        onClick={() => manejarCambioPagina(paginaActual - 1, 'izq')} 
                        style={{
                            position: 'absolute', left: '-25px', zIndex: 10, width: '45px', height: '45px', borderRadius: '50%',
                            backgroundColor: paginaActual === 0 ? '#e0e0e0' : '#722f37', color: '#fff', border: 'none', fontSize: '20px',
                            cursor: paginaActual === 0 ? 'not-allowed' : 'pointer', boxShadow: '0px 4px 10px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        &#10094;
                    </button>

                    <div style={{ width: '100%', overflow: 'hidden', padding: '10px 5px' }}>
                        <div style={{
                            display: 'flex', gap: '30px', flexWrap: 'nowrap', justifyContent: 'center',
                            transition: conTransicion ? 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out' : 'none',
                            opacity: opacidad, transform: `translateX(${desplazamiento})` 
                        }}>
                            {vinos.length === 0 && !cargando ? (
                                <p style={{ fontFamily: '"Inter", sans-serif', color: '#777' }}>No hay vinos disponibles.</p>
                            ) : (
                                vinos.map((vino) => {
                                    const itemEnCarrito = carrito.find(item => item.id === vino.id);
                                    const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
                                
                                    return (
                                        <div key={vino.id} style={{ minWidth: '300px', maxWidth: '340px', flex: '0 0 auto' }}>
                                            <TarjetaVino 
                                                vino={vino}
                                                alAgregarAlCarrito={agregarAlCarrito} 
                                                cantidadEnCarrito={cantidadEnCarrito}
                                            />
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <button 
                        disabled={paginaActual >= totalPaginas - 1 || cargando}
                        onClick={() => manejarCambioPagina(paginaActual + 1, 'der')} 
                        style={{
                            position: 'absolute', right: '-25px', zIndex: 10, width: '45px', height: '45px', borderRadius: '50%',
                            backgroundColor: paginaActual >= totalPaginas - 1 ? '#e0e0e0' : '#722f37', color: '#fff', border: 'none', fontSize: '20px',
                            cursor: paginaActual >= totalPaginas - 1 ? 'not-allowed' : 'pointer', boxShadow: '0px 4px 10px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        &#10095;
                    </button>
                </div>
                
                <p style={{ textAlign: 'center', marginTop: '25px', fontFamily: '"Inter", sans-serif', color: '#888', fontSize: '14px' }}>
                    Cava {paginaActual + 1} de {totalPaginas}
                </p>
            </main>

            <footer style={{ height: '70vh', backgroundColor: '#1e1415', marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <p>© 2026 Bodega Maipú - Mendoza, Argentina</p>
            </footer>

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