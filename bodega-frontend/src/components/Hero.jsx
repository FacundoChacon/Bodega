import React from 'react';

const Hero = () => {
    return (
        <header style={styles.hero}>
            <div style={styles.overlay}>
                <h1 style={styles.titulo}>El Legado de la Tierra</h1>
                <p style={styles.subtitulo}>Vinos de precisión nacidos al pie de los Andes mendocinos.</p>
                <a href="#cava" style={styles.boton}>EXPLORAR CAVA</a>
            </div>
        </header>
    );
};

const styles = {
    hero: {
        height: '60vh',
        backgroundColor: '#1e1415',
        // Si más adelante querés usar una foto de fondo, descomentás la línea de abajo:
        // backgroundImage: 'url("/src/assets/hero.png")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Playfair Display", serif'
    },
    overlay: {
        textAlign: 'center',
        color: '#ffffff',
        padding: '20px'
    },
    titulo: {
        fontSize: '48px',
        fontWeight: '300',
        letterSpacing: '2px',
        marginBottom: '15px',
        color: '#fcfaf7'
    },
    subtitulo: {
        fontFamily: '"Inter", sans-serif',
        fontSize: '16px',
        color: '#d4c3b3',
        letterSpacing: '1px',
        marginBottom: '30px'
    },
    boton: {
        fontFamily: '"Inter", sans-serif',
        fontSize: '13px',
        letterSpacing: '2px',
        color: '#ffffff',
        textDecoration: 'none',
        border: '1px solid #ffffff',
        padding: '12px 28px',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    }
};

export default Hero;