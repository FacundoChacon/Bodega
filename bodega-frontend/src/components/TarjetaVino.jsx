import React, { useState } from 'react';

const TarjetaVino = ({ vino, alAgregarAlCarrito, cantidadEnCarrito }) => {
    const [añadidoRecientemente, setAñadidoRecientemente] = useState(false);

    const limiteAlcanzado = cantidadEnCarrito >= vino.stock;
    const stockVisualRestante = vino.stock - cantidadEnCarrito;
    const manejarClickAgregar = () => {
        if (!limiteAlcanzado && vino.stock > 0) {
            alAgregarAlCarrito(vino);
            const evento = new CustomEvent('vinoAnadido');
            window.dispatchEvent(evento);
        }
    };

    return (
        <div style={styles.card}>
            {añadidoRecientemente && (
                <div style={styles.añadidoOverlay}>
                    <div style={styles.añadidoContenido}>
                        <span style={styles.checkIcon}>✓</span>
                        <p style={styles.añadidoTexto}>Vino Añadido</p>
                    </div>
                </div>
            )}

            <div style={styles.infoContenedor}>
                <span style={styles.bodega}>{vino.bodega?.toUpperCase()}</span>
                <h3 style={styles.nombre}>{vino.nombre}</h3>
                <p style={styles.detalle}>Año {vino.anioCosecha} · Edición Limitada</p>
                
                <div style={styles.footerCard}>
                    <span style={styles.precio}>${vino.precio?.toLocaleString('es-AR')}</span>
                    
                    <span style={{ 
                        fontSize: '12px', 
                        fontWeight: 'bold',
                        color: stockVisualRestante > 0 ? '#2e7d32' : '#c62828' 
                    }}>
                        {stockVisualRestante > 0 ? `${stockVisualRestante} DISP.` : 'SIN STOCK'}
                    </span>
                </div>
                
                <button 
                    style={{
                        ...styles.botonAgregar,
                        backgroundColor: limiteAlcanzado ? '#888888' : '#1a1a1a',
                        cursor: limiteAlcanzado ? 'not-allowed' : 'pointer'
                    }} 
                    disabled={vino.stock === 0 || limiteAlcanzado}
                    onClick={manejarClickAgregar}
                >
                    {vino.stock === 0 
                        ? 'AGOTADO' 
                        : limiteAlcanzado 
                            ? 'LÍMITE ALCANZADO 🛑' 
                            : 'AÑADIR A LA COLECCIÓN'
                    }
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#ffffff',
        border: '1px solid #f0f0f0',
        borderRadius: '0px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        fontFamily: '"Inter", sans-serif',
        position: 'relative',
        overflow: 'hidden'
    },
    // ANIMACION
    imagenContenedor: {
        backgroundColor: '#fbfaf8',
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px'
    },
    infoContenedor: {
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    bodega: {
        fontSize: '11px',
        letterSpacing: '2px',
        color: '#8e8e8e',
        fontWeight: '600'
    },
    nombre: {
        fontFamily: '"Playfair Display", serif',
        fontSize: '20px',
        margin: 0,
        color: '#1a1a1a',
        fontWeight: '400'
    },
    detalle: {
        fontSize: '13px',
        color: '#777777',
        margin: '0 0 10px 0'
    },
    footerCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #f5f5f5',
        paddingTop: '12px'
    },
    precio: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#722f37'
    },
    botonAgregar: {
        marginTop: '15px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        border: 'none',
        padding: '12px',
        letterSpacing: '1px',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    }
};

export default TarjetaVino;