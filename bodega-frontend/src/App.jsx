import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CavaSeccion from './components/CavaSeccion';
import CarritoModal from './components/CarritoModal';
import { useCarrito } from './hooks/useCarrito';

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
        enviarPedidoAlBackend
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
                alConfirmarCompra={enviarPedidoAlBackend}
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