import React, { useState, useEffect } from 'react';
import Filtros from './Filtros';
import TarjetaVino from './TarjetaVino';
import { obtenerVinosConFiltrosYPaginas } from '../services/VinoService';

const CavaSeccion = ({ cavaRef, carrito, agregarAlCarrito, paginaActual, setPaginaActual }) => {
    const [vinos, setVinos] = useState([]);
    const [cargando, setCargando] = useState(true);
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

    // UNIFICADO: Solo una petición al backend para filtros y paginación
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
    }, [cargando, vinos, paginaActual, totalPaginas, setPaginaActual]);

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

    const manejarCambioFiltro = (nombreFiltro, valor) => {
        setFiltros(prev => ({ ...prev, [nombreFiltro]: valor }));
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

    return (
        <main ref={cavaRef} id="cava" style={styles.mainContenedor}>
            <h2 style={styles.tituloSecundario}>Nuestra Cava Seleccionada</h2>
            <p style={styles.subtitulo}>Cada botella representa la máxima expresión de nuestro terruño.</p>
            
            <Filtros 
                filtros={filtros}
                alCambiarFiltro={manejarCambioFiltro}
                alLimpiarFiltros={manejarLimpiarFiltros}
            />

            <div style={styles.carruselFila}>
                <button 
                    disabled={paginaActual === 0 || cargando}
                    onClick={() => manejarCambioPagina(paginaActual - 1, 'izq')} 
                    style={{
                        ...styles.btnFlecha,
                        left: '-25px',
                        backgroundColor: paginaActual === 0 ? '#e0e0e0' : '#722f37',
                        cursor: paginaActual === 0 ? 'not-allowed' : 'pointer',
                    }}
                >
                    &#10094;
                </button>

                <div style={styles.ventanaCarrusel}>
                    <div style={{
                        ...styles.rielCarrusel,
                        transition: conTransicion ? 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out' : 'none',
                        opacity: opacidad, 
                        transform: `translateX(${desplazamiento})` 
                    }}>
                        {vinos.length === 0 && !cargando ? (
                            <p style={{ fontFamily: '"Inter", sans-serif', color: '#777' }}>No hay vinos disponibles.</p>
                        ) : (
                            vinos.map((vino) => {
                                const itemEnCarrito = carrito.find(item => item.id === vino.id);
                                const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
                            
                                return (
                                    <div key={vino.id} style={styles.tarjetaWrapper}>
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
                        ...styles.btnFlecha,
                        right: '-25px',
                        backgroundColor: paginaActual >= totalPaginas - 1 ? '#e0e0e0' : '#722f37',
                        cursor: paginaActual >= totalPaginas - 1 ? 'not-allowed' : 'pointer',
                    }}
                >
                    &#10095;
                </button>
            </div>
            
            <p style={styles.paginacionTexto}>
                Cava {paginaActual + 1} de {totalPaginas}
            </p>
        </main>
    );
};

const styles = {
    mainContenedor: { padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', scrollMarginTop: '90px', minHeight: '500px' },
    tituloSecundario: { fontFamily: '"Playfair Display", serif', fontSize: '32px', textAlign: 'center', color: '#1a1a1a', fontWeight: '400' },
    subtitulo: { fontFamily: '"Inter", sans-serif', textAlign: 'center', color: '#666', marginBottom: '40px' },
    carruselFila: { display: 'flex', alignItems: 'center', position: 'relative', width: '100%', gap: '10px' },
    ventanaCarrusel: { width: '100%', overflow: 'hidden', padding: '10px 5px' },
    rielCarrusel: { display: 'flex', gap: '30px', flexWrap: 'nowrap', justifyContent: 'center' },
    tarjetaWrapper: { minWidth: '300px', maxWidth: '340px', flex: '0 0 auto' },
    paginacionTexto: { textAlign: 'center', marginTop: '25px', fontFamily: '"Inter", sans-serif', color: '#888', fontSize: '14px' },
    btnFlecha: { position: 'absolute', zIndex: 10, width: '45px', height: '45px', borderRadius: '50%', color: '#fff', border: 'none', fontSize: '20px', boxShadow: '0px 4px 10px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default CavaSeccion;