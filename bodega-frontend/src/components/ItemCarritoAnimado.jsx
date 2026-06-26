import React, { useState, useEffect } from 'react';
import './ItemCarritoAnimado.css';

const ItemCarritoAnimado = ({ item, alSumarCantidad, alRestarCantidad, alEliminarItem }) => {
    const [animar, setAnimar] = useState(false);

    useEffect(() => {
        setAnimar(true);
        const timer = setTimeout(() => setAnimar(false), 300);
        return () => clearTimeout(timer);
    }, [item.cantidad]);

    return (
        <div className={`item-carrito ${animar ? 'item-carrito-destello' : ''}`}>
            <div className="item-carrito-info">
                <h4 className="item-carrito-nombre">{item.nombre}</h4>
                <p className="item-carrito-detalle">
                    {item.cantidad} x ${item.precio?.toLocaleString('es-AR')}
                </p>
                <div className="item-carrito-controles">
                    <button onClick={() => alRestarCantidad(item.id)} className="item-carrito-boton-control">
                        −
                    </button>
                    <button onClick={() => alSumarCantidad(item)} className="item-carrito-boton-control">
                        +
                    </button>
                    <button onClick={() => alEliminarItem(item.id)} className="item-carrito-boton-eliminar">
                        Quitar
                    </button>
                </div>
            </div>
            <span className={`item-carrito-subtotal ${animar ? 'item-carrito-subtotal-activo' : ''}`}>
                ${(item.precio * item.cantidad).toLocaleString('es-AR')}
            </span>
        </div>
    );
};

export default ItemCarritoAnimado;
