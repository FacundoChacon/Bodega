import React from 'react';

const Hero = ({ alClickExplorar }) => {
    return (
        <header style={styles.hero}>
            <div style={styles.overlay}>
                <h1 style={styles.titulo}>El Legado de la Tierra</h1>
                <p style={styles.subtitulo}>Vinos de precisión nacidos al pie de los Andes mendocinos.</p>
                {/* Enlace puramente HTML nativo */}
                <a 
                    onClick={alClickExplorar} 
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#1e1415',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        border: '1px solid #fff',
                        display: 'inline-block',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '13px',
                        letterSpacing: '2px',
                        cursor: 'pointer'
                    }}
                >
                    Explorar Cava
                </a>
            </div>
        </header>
    );
};

const styles = {
    hero: {
        height: '60vh', backgroundColor: '#1e1415', backgroundSize: 'cover', backgroundPosition: 'center',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Playfair Display", serif'
    },
    overlay: { textAlign: 'center', color: '#ffffff', padding: '20px' },
    titulo: { fontSize: '48px', fontWeight: '300', letterSpacing: '2px', marginBottom: '15px', color: '#fcfaf7' },
    subtitulo: { fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#d4c3b3', letterSpacing: '1px', marginBottom: '30px' }
};

export default Hero;