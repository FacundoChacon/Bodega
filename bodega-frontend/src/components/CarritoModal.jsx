import React from 'react';

const CarritoModal = ({ mostrar, alCerrar, items, alConfirmarCompra, alSumarCantidad, alRestarCantidad, alEliminarItem }) => {
    
    const precioTotal = items.reduce((acum, item) => acum + (item.precio * item.cantidad), 0);

    return (
        <div 
            onClick={alCerrar} 
            style={{
                ...styles.overlay,
                opacity: mostrar ? 1 : 0,
                visibility: mostrar ? 'visible' : 'hidden',
            }}
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                style={{
                    ...styles.sidebar,
                    transform: mostrar ? 'translateX(0)' : 'translateX(100%)', 
                }}
            >
                <div style={styles.header}>
                    <h2 style={styles.titulo}>TU COLECCIÓN</h2>
                    <button onClick={alCerrar} style={styles.botonCerrar}>✕</button>
                </div>

                <div style={styles.listaContenedor}>
                    {items.length === 0 ? (
                        <p style={styles.vacio}>Tu carrito está vacío.</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} style={styles.itemCard}>
                                <div style={styles.itemInfo}>
                                    <h4 style={styles.itemNombre}>{item.nombre}</h4>
                                    <p style={styles.itemDetalle}>
                                        {item.cantidad} x ${item.precio?.toLocaleString('es-AR')}
                                    </p>
                                    <div style={styles.controlesContenedor}>
                                        <button 
                                            onClick={() => alRestarCantidad(item.id)} 
                                            style={styles.botonControl}
                                            title="Restar una unidad"
                                        >
                                            -
                                        </button>
                                        
                                        <button 
                                            onClick={() => alSumarCantidad(item)}
                                            style={styles.botonControl}
                                            title="Sumar una unidad"
                                        >
                                            +
                                        </button>
                                        
                                        <button 
                                            onClick={() => alEliminarItem(item.id)} 
                                            style={styles.botonEliminar}
                                            title="Quitar de la colección"
                                        >
                                            🗑️ Quitar
                                        </button>
                                    </div>
                                </div>
                                <span style={styles.itemSubtotal}>
                                    ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div style={styles.footer}>
                        <div style={styles.totalContenedor}>
                            <span>TOTAL:</span>
                            <span style={styles.totalPrecio}>${precioTotal.toLocaleString('es-AR')}</span>
                        </div>
                        <button onClick={alConfirmarCompra} style={styles.botonConfirmar}>
                            CONFIRMAR COMPRA 🍷
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.15)', 
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
        cursor: 'pointer'
    },
    sidebar: {
        width: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', 
        backdropFilter: 'blur(15px)', 
        WebkitBackdropFilter: 'blur(15px)',
        height: '100%',
        boxShadow: '-8px 0 30px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Inter", sans-serif',
        padding: '30px',
        boxSizing: 'border-box',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        paddingBottom: '15px'
    },
    titulo: {
        fontFamily: '"Playfair Display", serif',
        fontSize: '22px',
        margin: 0,
        letterSpacing: '1px',
        color: '#1a1a1a'
    },
    botonCerrar: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#888'
    },
    listaContenedor: {
        flex: 1,
        overflowY: 'auto',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        paddingRight: '5px'
    },
    vacio: {
        color: '#777',
        textAlign: 'center',
        marginTop: '40px'
    },
    itemCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '15px',
        borderBottom: '1px solid rgba(0,0,0,0.03)'
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    itemNombre: {
        margin: 0,
        fontSize: '15px',
        fontWeight: '500',
        color: '#1a1a1a'
    },
    itemDetalle: {
        margin: 0,
        fontSize: '13px',
        color: '#666'
    },
    controlesContenedor: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginTop: '6px'
    },
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
    botonEliminar: {
        background: 'none',
        border: 'none',
        color: '#c62828',
        fontSize: '12px',
        cursor: 'pointer',
        padding: 0,
        fontFamily: '"Inter", sans-serif'
    },
    itemSubtotal: {
        fontWeight: '600',
        color: '#722f37',
        fontSize: '15px'
    },
    footer: {
        borderTop: '1px solid rgba(0,0,0,0.08)',
        paddingTop: '20px',
        marginTop: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        backgroundColor: 'transparent',
        paddingBottom: '10px' 
    },
    totalContenedor: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: '16px',
        letterSpacing: '1px',
        color: '#1a1a1a'
    },
    totalPrecio: {
        color: '#722f37',
        fontSize: '18px'
    },
    botonConfirmar: {
        backgroundColor: '#722f37',
        color: '#ffffff',
        border: 'none',
        padding: '16px', 
        fontWeight: '600',
        letterSpacing: '2px',
        cursor: 'pointer',
        transition: 'background-color 0.2s, transform 0.1s',
        fontSize: '13px',
        boxShadow: '0 4px 12px rgba(114, 47, 55, 0.2)', 
    }
};

export default CarritoModal;