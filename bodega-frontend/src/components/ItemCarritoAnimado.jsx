import React, { useState, useEffect } from 'react';

const ItemCarritoAnimado = ({ item, alSumarCantidad, alRestarCantidad, alEliminarItem }) => {
    const [animar, setAnimar] = useState(false);

    useEffect(() => {
        setAnimar(true);
        const timer = setTimeout(() => setAnimar(false), 300);
        return () => clearTimeout(timer);
    }, [item.cantidad]);

    return (
        <div style={{
            ...styles.itemCard,
            transform: animar ? 'scale(1.02)' : 'scale(1)',
            backgroundColor: animar ? 'rgba(114, 47, 55, 0.05)' : 'transparent',
        }}>
            <div style={styles.itemInfo}>
                <h4 style={styles.itemNombre}>{item.nombre}</h4>
                <p style={styles.itemDetalle}>
                    {item.cantidad} x ${item.precio?.toLocaleString('es-AR')}
                </p>
                <div style={styles.controlesContenedor}>
                    <button 
                        onClick={() => alRestarCantidad(item.id)} 
                        style={styles.botonControl}
                    >
                        -
                    </button>
                    
                    <button 
                        onClick={() => alSumarCantidad(item)}
                        style={styles.botonControl}
                    >
                        +
                    </button>
                    
                    <button 
                        onClick={() => alEliminarItem(item.id)} 
                        style={styles.botonEliminar}
                    >
                        🗑️ Quitar
                    </button>
                </div>
            </div>
            <span style={{
                ...styles.itemSubtotal,
                color: animar ? '#e63946' : '#722f37'
            }}>
                ${(item.precio * item.cantidad).toLocaleString('es-AR')}
            </span>
        </div>
    );
};

const styles = {
    itemCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '6px',
        borderBottom: '1px solid rgba(0,0,0,0.03)',
        transition: 'transform 0.25s ease, background-color 0.25s ease', // 👈 Fluidez para la animación
        boxSizing: 'border-box'
    },
    itemInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
    itemNombre: { margin: 0, fontSize: '15px', fontWeight: '500', color: '#1a1a1a' },
    itemDetalle: { margin: 0, fontSize: '13px', color: '#666' },
    controlesContenedor: { display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' },
    botonControl: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.05)',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        borderRadius: '2px'
    },
    botonEliminar: { background: 'none', border: 'none', color: '#c62828', fontSize: '12px', cursor: 'pointer', padding: 0, fontFamily: '"Inter", sans-serif' },
    itemSubtotal: { fontWeight: '600', fontSize: '15px', transition: 'color 0.25s ease' }
};

export default ItemCarritoAnimado;