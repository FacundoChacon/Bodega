import React, { useState, useEffect } from 'react';
import Filtros from './Filtros';
import TarjetaVino from './TarjetaVino';
import { obtenerVinosConFiltrosYPaginas } from '../services/VinoService';
import './CavaSeccion.css';

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
        <main ref={cavaRef} id="cava" className="cava-seccion">
            <div className="contenedor">
                <span className="eyebrow cava-eyebrow">Catálogo</span>
                <h2 className="titulo-seccion cava-titulo">Nuestra cava seleccionada</h2>
                <p className="cava-subtitulo">
                    Cada botella representa la máxima expresión de nuestro terruño.
                </p>

                <Filtros
                    filtros={filtros}
                    alCambiarFiltro={manejarCambioFiltro}
                    alLimpiarFiltros={manejarLimpiarFiltros}
                />

                <div className="cava-carrusel-fila">
                    <button
                        disabled={paginaActual === 0 || cargando}
                        onClick={() => manejarCambioPagina(paginaActual - 1, 'izq')}
                        className="cava-flecha cava-flecha-izq"
                        aria-label="Página anterior"
                    >
                        &#10094;
                    </button>

                    <div className="cava-ventana">
                        <div
                            className="cava-riel"
                            style={{
                                transition: conTransicion ? 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out' : 'none',
                                opacity: opacidad,
                                transform: `translateX(${desplazamiento})`
                            }}
                        >
                            {vinos.length === 0 && !cargando ? (
                                <p className="cava-sin-resultados">No hay vinos disponibles.</p>
                            ) : (
                                vinos.map((vino) => {
                                    const itemEnCarrito = carrito.find(item => item.id === vino.id);
                                    const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

                                    return (
                                        <div key={vino.id} className="cava-tarjeta-wrapper">
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
                        className="cava-flecha cava-flecha-der"
                        aria-label="Página siguiente"
                    >
                        &#10095;
                    </button>
                </div>

                <p className="cava-paginacion-texto">
                    Cava {paginaActual + 1} de {totalPaginas}
                </p>
            </div>
        </main>
    );
};

export default CavaSeccion;
