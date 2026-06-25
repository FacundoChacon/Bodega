import React, { useState, useEffect } from 'react';
import ItemCarritoAnimado from './ItemCarritoAnimado';

const CarritoModal = ({ mostrar, alCerrar, items, alConfirmarCompra, alSumarCantidad, alRestarCantidad, alEliminarItem }) => {
    const [hacerDestello, setHacerDestello] = useState(false);
    
    // METODO DE PAGO SELECCIONADO (VISA, MASTERCARD, etc.)
    const [metodoPago, setMetodoPago] = useState('VISA_CREDITO');

    const precioTotal = items.reduce((acum, item) => acum + (item.precio * item.cantidad), 0);
    const totalBotellas = items.reduce((acum, item) => acum + item.cantidad, 0);

    useEffect(() => {
        if (totalBotellas > 0 && mostrar) {
            setHacerDestello(true);
            const timer = setTimeout(() => setHacerDestello(false), 450);
            return () => clearTimeout(timer);
        }
    }, [totalBotellas, mostrar]);

    const colorVino = '#722f37';
    const colorBlanco = '#ffffff';

    // DRIVER function para manejar la confirmación de compra
    const manejarConfirmacion = () => {
        // RECIBE EL METODO DE PAGO SELECCIONADO Y LO ENVIA AL BACKEND
        alConfirmarCompra(metodoPago);
    };

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
                    backgroundColor:'rgba(255, 255, 255, 0.95)',
                    color:'#1a1a1a',
                }}
            >
                <div style={{...styles.header, borderColor: hacerDestello ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)'}}>
                    <h2 style={{ ...styles.titulo, color:'#1a1a1a' }}>
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
                            />
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div style={{...styles.footer, borderTopColor: hacerDestello ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)'}}>
                        
                        {/* 💳 SECTOR DE SELECCIÓN DE TARJETAS */}
                        <div style={styles.seccionPago}>
                            <label style={{...styles.labelPago, color:'#555'}}>
                                MÉTODO DE PAGO:
                            </label>
                            <select 
                                value={metodoPago} 
                                onChange={(e) => setMetodoPago(e.target.value)}
                                style={styles.selectPago}
                            >
                                <option value="VISA_CREDITO">💳 VISA Crédito</option>
                                <option value="VISA_DEBITO">💳 VISA Débito</option>
                                <option value="MASTERCARD_CREDITO">💳 MasterCard Crédito</option>
                                <option value="MASTERCARD_DEBITO">💳 MasterCard Débito</option>
                            </select>
                        </div>

                        <div style={{...styles.totalContenedor, color: hacerDestello ? '#df4f5b' : '#1a1a1a'}}>
                            <span>TOTAL:</span>
                            <span style={{...styles.totalPrecio, color: hacerDestello ? '#df4f5b' : '#722f37'}}>
                                ${precioTotal.toLocaleString('es-AR')}
                            </span>
                        </div>
                        
                        <button 
                            onClick={manejarConfirmacion} 
                            style={{
                                ...styles.botonConfirmar,
                                backgroundColor: hacerDestello ? '#df4f5b' : colorVino,
                                color: hacerDestello ? '#1a1a1a' : colorBlanco,
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
    footer: { borderTop: '1px solid', paddingTop: '15px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'transparent', paddingBottom: '10px', transition: 'border-color 0.25s ease' },
    seccionPago: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '5px' },
    labelPago: { fontSize: '11px', fontWeight: '600', letterSpacing: '1px', transition: 'color 0.25s ease' },
    selectPago: { padding: '10px', fontFamily: '"Inter", sans-serif', fontSize: '13px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '4px', backgroundColor: '#fff', color: '#333', outline: 'none' },
    totalContenedor: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px', transition: 'color 0.25s ease' },
    totalPrecio: { fontSize: '18px', transition: 'color 0.25s ease' },
    botonConfirmar: { border: 'none', padding: '16px', fontWeight: '600', letterSpacing: '2px', cursor: 'pointer', fontSize: '13px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.25s ease, color 0.25s ease' }
};

export default CarritoModal;