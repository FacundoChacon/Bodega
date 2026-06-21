import React from 'react';

const Navbar = ({ cantidadCarrito, alAbrirCarrito, alClickCava }) => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>BODEGA MAIPÚ</div>
            <div style={styles.menu}>
                <a onClick={alClickCava} style={styles.link}>
                    NUESTRA CAVA
                </a>
                <a href="#historia" style={styles.link}>HISTORIA</a>
                
                <button onClick={alAbrirCarrito} style={styles.cartBoton}>
                    CARRITO ({cantidadCarrito})
                </button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px',
        backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea', fontFamily: '"Playfair Display", Georgia, serif',
        position: 'sticky', top: 0, zIndex: 1000
    },
    logo: { fontSize: '22px', fontWeight: 'bold', letterSpacing: '3px', color: '#1a1a1a' },
    menu: { display: 'flex', gap: '30px', alignItems: 'center', fontFamily: '"Inter", sans-serif', fontSize: '14px', letterSpacing: '1px' },
    link: { textDecoration: 'none', color: '#555555', transition: 'color 0.3s', cursor: 'pointer' },
    cartBoton: { background: 'none', fontFamily: '"Inter", sans-serif', fontSize: '14px', letterSpacing: '1px', color: '#722f37', fontWeight: 'bold', border: '1px solid #722f37', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }
};

export default Navbar;