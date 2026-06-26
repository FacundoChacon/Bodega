import React, { useState, useEffect } from 'react';
import ItemCarritoAnimado from './ItemCarritoAnimado';
import './CarritoModal.css';

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

    // DRIVER function para manejar la confirmación de compra
    const manejarConfirmacion = () => {
        // RECIBE EL METODO DE PAGO SELECCIONADO Y LO ENVIA AL BACKEND
        alConfirmarCompra(metodoPago);
    };

    return (
        <div
            onClick={alCerrar}
            className={`carrito-overlay ${mostrar ? 'carrito-overlay-visible' : ''}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`carrito-sidebar ${mostrar ? 'carrito-sidebar-abierto' : ''}`}
            >
                <div className={`carrito-header ${hacerDestello ? 'carrito-header-destello' : ''}`}>
                    <h2 className="carrito-titulo">Tu colección</h2>
                    <button onClick={alCerrar} className="carrito-boton-cerrar" aria-label="Cerrar carrito">
                        ✕
                    </button>
                </div>

                <div className="carrito-lista">
                    {items.length === 0 ? (
                        <p className="carrito-vacio">Tu carrito está vacío.</p>
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
                    <div className={`carrito-footer ${hacerDestello ? 'carrito-footer-destello' : ''}`}>
                        <div className="carrito-seccion-pago">
                            <label className="carrito-label-pago">Método de pago</label>
                            <select
                                value={metodoPago}
                                onChange={(e) => setMetodoPago(e.target.value)}
                                className="carrito-select-pago"
                            >
                                <option value="VISA_CREDITO">VISA Crédito</option>
                                <option value="VISA_DEBITO">VISA Débito</option>
                                <option value="MASTERCARD_CREDITO">MasterCard Crédito</option>
                                <option value="MASTERCARD_DEBITO">MasterCard Débito</option>
                            </select>
                        </div>

                        <div className="carrito-total-contenedor">
                            <span>Total</span>
                            <span className="carrito-total-precio">
                                ${precioTotal.toLocaleString('es-AR')}
                            </span>
                        </div>

                        <button onClick={manejarConfirmacion} className="carrito-boton-confirmar">
                            Confirmar compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarritoModal;
