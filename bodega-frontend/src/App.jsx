import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CavaSeccion from './components/CavaSeccion';
import CarritoModal from './components/CarritoModal';
import { useCarrito } from './hooks/useCarrito';
import PagoExitoso from "./components/PagoExitoso"; // 👈 Tu componente de stock

const App = () => {
    const [verCarrito, setVerCarrito] = useState(false);
    const [paginaActual, setPaginaActual] = useState(0);
    const cavaRef = useRef(null);

    const {
        carrito,
        totalBotellas,
        agregarAlCarrito,
        restarDelCarrito,
        eliminarDelCarrito,
        iniciarPagoReal
    } = useCarrito(setVerCarrito, setPaginaActual);

    const scrollSuaveACava = () => {
        if (cavaRef.current) {
            const posicionDestino = cavaRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: posicionDestino - 90,
                behavior: 'smooth'
            });
        }
    };

    // SI LA URL ES /pago-exitoso, MOSTRAMOS EL COMPONENTE DE STOCK
    if (window.location.pathname === "/pago-exitoso") {
        return <PagoExitoso />;
    }

    // Si no está en esa URL, la aplicación sigue mostrando el catálogo normal:
    return (
        <div style={{ backgroundColor: '#fdfdfb', minHeight: '100vh' }}>
            <Navbar 
                cantidadCarrito={totalBotellas} 
                alAbrirCarrito={() => setVerCarrito(true)} 
                alClickCava={scrollSuaveACava} 
            />
            
            <Hero alClickExplorar={scrollSuaveACava} />
            
            <CavaSeccion 
                cavaRef={cavaRef}
                carrito={carrito}
                agregarAlCarrito={agregarAlCarrito}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
            />

            <footer style={styles.footer}>
                <p>© 2026 Bodega Maipú - Mendoza, Argentina</p>
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

const styles = {
    footer: { height: '70vh', backgroundColor: '#1e1415', marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }
};

export default App;