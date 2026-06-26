import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CavaSeccion from './components/CavaSeccion';
import CarritoModal from './components/CarritoModal';
import { useCarrito } from './hooks/useCarrito';
import PagoExitoso from './components/PagoExitoso';
import HistoriaSeccion from './components/HistoriaSeccion';
import ReservaSeccion from './components/ReservaSeccion';
import GateEdad from './components/GateEdad';
import './App.css';

const App = () => {
    const [verCarrito, setVerCarrito] = useState(false);
    const [paginaActual, setPaginaActual] = useState(0);
    const [mostrarGate, setMostrarGate] = useState(false);
    const cavaRef = useRef(null);
    const historiaRef = useRef(null);
    const restoRef = useRef(null);

    const {
        carrito,
        totalBotellas,
        agregarAlCarrito,
        restarDelCarrito,
        eliminarDelCarrito,
        iniciarPagoReal
    } = useCarrito(setVerCarrito, setPaginaActual);

    // VERIFICA SI YA SE CONFIRMÓ LA MAYORÍA DE EDAD EN ESTA SESIÓN
    useEffect(() => {
        const yaConfirmado = sessionStorage.getItem('mayorDeEdadConfirmado');
        if (!yaConfirmado) {
            setMostrarGate(true);
        }
    }, []);

    const scrollSuaveACava = () => {
        if (cavaRef.current) {
            const posicionDestino = cavaRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: posicionDestino - 90, behavior: 'smooth' });
        }
    };

    const scrollSuaveAHistoria = () => {
        if (historiaRef.current) {
            const posicionDestino = historiaRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: posicionDestino - 90, behavior: 'smooth' });
        }
    };

    const scrollSuaveAResto = () => {
        if (restoRef.current) {
            const posicionDestino = restoRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: posicionDestino - 90, behavior: 'smooth' });
        }
    };

    // SI LA URL ES /pago-exitoso, MOSTRAMOS EL COMPONENTE DE STOCK
    if (window.location.pathname === "/pago-exitoso") {
        return <PagoExitoso />;
    }

    // Si no está en esa URL, la aplicación sigue mostrando el catálogo normal:
    return (
        <div className="app-fondo">
            {mostrarGate && <GateEdad alConfirmar={() => setMostrarGate(false)} />}

            <Navbar
                cantidadCarrito={totalBotellas}
                alAbrirCarrito={() => setVerCarrito(true)}
                alClickCava={scrollSuaveACava}
                alClickHistoria={scrollSuaveAHistoria}
                alClickResto={scrollSuaveAResto}
            />

            <Hero alClickExplorar={scrollSuaveACava} />

            <HistoriaSeccion historiaRef={historiaRef} />

            <ReservaSeccion reservaRef={restoRef} />

            <CavaSeccion
                cavaRef={cavaRef}
                carrito={carrito}
                agregarAlCarrito={agregarAlCarrito}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
            />

            <footer className="footer">
                <div className="contenedor footer-contenido">
                    <span className="footer-marca">BODEGA MAIPÚ</span>
                    <p className="footer-texto">Mendoza, Argentina · Ruta Provincial 33, km 7,5</p>
                    <p className="footer-legal">Beber con moderación. Prohibida su venta a menores de 18 años.</p>
                    <p className="footer-copy">© 2026 Bodega Maipú</p>
                </div>
            </footer>

            <CarritoModal
                mostrar={verCarrito}
                alCerrar={() => setVerCarrito(false)}
                items={carrito}
                alConfirmarCompra={iniciarPagoReal}
                alRestarCantidad={restarDelCarrito}
                alEliminarItem={eliminarDelCarrito}
                alSumarCantidad={agregarAlCarrito}
            />
        </div>
    );
};

export default App;
