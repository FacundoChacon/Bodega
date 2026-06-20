import React from 'react';

const CarritoModal = ({ mostrar, alCerrar, items, alConfirmarCompra }) => {
    if (!mostrar) return null;

    const precioTotal = items.reduce((acum, item) => acum + (item.precio * item.cantidad), 0);

    return (
        <div style={styles.overlay}>
            <div style={styles.sidebar}>
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
                                <div>
                                    <h4 style={styles.itemNombre}>{item.nombre}</h4>
                                    <p style={styles.itemDetalle}>
                                        {item.cantidad} x ${item.precio?.toLocaleString('es-AR')}
                                    </p>
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    sidebar: {
        width: '400px',
        backgroundColor: '#ffffff',
        height: '100%',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Inter", sans-serif',
        padding: '30px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '15px'
    },
    titulo: {
        fontFamily: '"Playfair Display", serif',
        fontSize: '22px',
        margin: 0,
        letterSpacing: '1px'
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
        gap: '15px'
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
        borderBottom: '1px solid #f9f9f9'
    },
    itemNombre: {
        margin: 0,
        fontSize: '15px',
        fontWeight: '500',
        color: '#1a1a1a'
    },
    itemDetalle: {
        margin: '4px 0 0 0',
        fontSize: '13px',
        color: '#777'
    },
    itemSubtotal: {
        fontWeight: '600',
        color: '#722f37',
        fontSize: '15px'
    },
    footer: {
        borderTop: '1px solid #f0f0f0',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    totalContenedor: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: '16px',
        letterSpacing: '1px'
    },
    totalPrecio: {
        color: '#722f37',
        fontSize: '18px'
    },
    botonConfirmar: {
        backgroundColor: '#722f37',
        color: '#ffffff',
        border: 'none',
        padding: '14px',
        fontWeight: '600',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        fontSize: '13px'
    }
};

export default CarritoModal;