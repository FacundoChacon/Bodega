import React, { useState, useEffect } from 'react';

const Navbar = ({ cantidadCarrito, alAbrirCarrito, alClickCava }) => {
    const [enHover, setEnHover] = useState(false);
    const [animarClick, setAnimarClick] = useState(false);

    const colorVinoBase = '#722f37'; 
    const colorBlanco = '#ffffff';

    useEffect(() => {
        const escucharAdicion = () => {
            setAnimarClick(true);
            setTimeout(() => setAnimarClick(false), 400);
        };

        window.addEventListener('vinoAnadido', escucharAdicion);
        return () => window.removeEventListener('vinoAnadido', escucharAdicion);
    }, []);

    const aplicarInversion = enHover || animarClick;

    return (
        <nav style={styles.nav}>
            <div style={styles.contenedor}>
                <div style={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    BODEGA MAIPÚ
                </div>

                <div style={styles.menuDerecho}>
                    <button onClick={alClickCava} style={styles.enlaceBtn}>
                        NUESTRA CAVA
                    </button>

                    <button 
                        onClick={alAbrirCarrito}
                        onMouseEnter={() => setEnHover(true)}
                        onMouseLeave={() => setEnHover(false)}
                        style={{
                            ...styles.botonCarrito,
                            // Aplicamos la inversión exacta cuando corresponda
                            backgroundColor: aplicarInversion ? colorVinoBase : 'transparent',
                            color: aplicarInversion ? colorBlanco : colorVinoBase,
                            borderColor: aplicarInversion ? colorBlanco : colorVinoBase,
                        }}
                    >
                        CARRITO ({cantidadCarrito})
                    </button>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: { position: 'fixed', top: 0, left: 0, right: 0, height: '70px', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)', zIndex: 1000, display: 'flex', SystemItems: 'center', alignItems: 'center', fontFamily: '"Inter", sans-serif' },
    contenedor: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logo: { fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: '600', letterSpacing: '2px', color: '#1a1a1a', cursor: 'pointer' },
    menuDerecho: { display: 'flex', alignItems: 'center', gap: '30px' },
    enlaceBtn: { background: 'none', border: 'none', fontSize: '13px', fontWeight: '500', letterSpacing: '1px', color: '#555', cursor: 'pointer' },
    botonCarrito: {
        borderWidth: '1px',
        borderStyle: 'solid',
        padding: '10px 20px',
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '1.5px',
        borderRadius: '3px',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease'
    }
};

export default Navbar;