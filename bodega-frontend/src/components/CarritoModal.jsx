import React, { useState, useEffect } from 'react';
import ItemCarritoAnimado from './ItemCarritoAnimado';

const CarritoModal = ({ mostrar, alCerrar, items, alConfirmarCompra, alSumarCantidad, alRestarCantidad, alEliminarItem }) => {
    // 1. Estado local para controlar el destello de inversión de color en todo el módulo
    const [hacerDestello, setHacerDestello] = useState(false);

    const precioTotal = items.reduce((acum, item) => acum + (item.precio * item.cantidad), 0);
    const totalBotellas = items.reduce((acum, item) => acum + item.cantidad, 0);

    // 2. EFECTO CLAVE: Cada vez que el número total de botellas aumente, se dispara la inversión de color
    useEffect(() => {
        if (totalBotellas > 0 && mostrar) {
            setHacerDestello(true);
            const timer = setTimeout(() => setHacerDestello(false), 450); // Duración del destello
            return () => clearTimeout(timer);
        }
    }, [totalBotellas, mostrar]);

    // 3. Paleta de colores para la inversión
    const colorVino = '#722f37';
    const colorBlanco = '#ffffff';

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
                    // 👇 AQUÍ SE APLICA LA INVERSIÓN TOTAL DE COLORES EN LA CAJA DEL MÓDULO
                    backgroundColor: hacerDestello ? colorVino : 'rgba(255, 255, 255, 0.85)',
                    color: hacerDestello ? colorBlanco : '#1a1a1a',
                }}
            >
                {/* Modificamos los textos internos para que hereden el color blanco durante el destello */}
                <div style={{...styles.header, borderColor: hacerDestello ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)'}}>
                    <h2 style={{ ...styles.titulo, color: hacerDestello ? colorBlanco : '#1a1a1a' }}>
                        TU COLECCIÓN
                    </h2>
                    <button 
                        onClick={alCerrar} 
                        style={{ ...styles.botonCerrar, color: hacerDestello ? colorBlanco : '#888' }}
                    >
                        ✕
                    </button>
                </div>

                <div style={styles.listaContenedor}>
                    {items.length === 0 ? (
                        <p style={{ ...styles.vacio, color: hacerDestello ? colorBlanco : '#777' }}>
                            Tu carrito está vacío.
                        </p>
                    ) : (
                        items.map((item) => (
                            <ItemCarritoAnimado 
                                key={item.id}
                                item={item}
                                alSumarCantidad={alSumarCantidad}
                                alRestarCantidad={alRestarCantidad}
                                alEliminarItem={alEliminarItem}
                                // Pasamos el estado por si las letras de los ítems necesitan cambiar a blanco
                                modoInvertido={hacerDestello} 
                            />
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div style={{...styles.footer, borderTopColor: hacerDestello ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)'}}>
                        <div style={{...styles.totalContenedor, color: hacerDestello ? colorBlanco : '#1a1a1a'}}>
                            <span>TOTAL:</span>
                            <span style={{...styles.totalPrecio, color: hacerDestello ? colorBlanco : '#722f37'}}>
                                ${precioTotal.toLocaleString('es-AR')}
                            </span>
                        </div>
                        <button 
                            onClick={alConfirmarCompra} 
                            style={{
                                ...styles.botonConfirmar,
                                // Inversión en el botón de confirmación para que no se pierda de vista
                                backgroundColor: hacerDestello ? colorBlanco : colorVino,
                                color: hacerDestello ? colorVino : colorBlanco,
                            }}
                        >
                            CONFIRMAR COMPRA 🍷
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.15)', zIndex: 2000, display: 'flex', justifyContent: 'flex-end', transition: 'opacity 0.4s ease, visibility 0.4s ease', cursor: 'pointer' },
    sidebar: { width: '400px', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', height: '100%', boxShadow: '-8px 0 30px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', fontFamily: '"Inter", sans-serif', padding: '30px', boxSizing: 'border-box', cursor: 'default', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, color 0.25s ease' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', paddingBottom: '15px', transition: 'border-color 0.25s ease' },
    titulo: { fontFamily: '"Playfair Display", serif', fontSize: '22px', margin: 0, letterSpacing: '1px', transition: 'color 0.25s ease' },
    botonCerrar: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', transition: 'color 0.25s ease' },
    listaContenedor: { flex: 1, overflowY: 'auto', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '5px' },
    vacio: { textAlign: 'center', marginTop: '40px', transition: 'color 0.25s ease' },
    footer: { borderTop: '1px solid', paddingTop: '20px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: 'transparent', paddingBottom: '10px', transition: 'border-color 0.25s ease' },
    totalContenedor: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px', transition: 'color 0.25s ease' },
    totalPrecio: { fontSize: '18px', transition: 'color 0.25s ease' },
    botonConfirmar: { border: 'none', padding: '16px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer', fontSize: '13px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.25s ease, color 0.25s ease' }
};

export default CarritoModal;