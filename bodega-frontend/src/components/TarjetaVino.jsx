import React from 'react';
import './TarjetaVino.css';

const TarjetaVino = ({ vino, alAgregarAlCarrito, cantidadEnCarrito }) => {
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
        <div className="tarjeta-vino">
            <div className="tarjeta-vino-imagen" role="img" aria-label={`Botella de ${vino.nombre}`}>
                <svg viewBox="0 0 120 220" className="tarjeta-vino-svg" aria-hidden="true">
                    <path
                        d="M52,8 H68 V34 C68,40 76,44 76,58 V196 C76,206 70,212 60,212 C50,212 44,206 44,196 V58 C44,44 52,40 52,34 Z"
                        fill="#3a1c1a"
                    />
                    <rect x="52" y="2" width="16" height="10" rx="2" fill="#241512" />
                    <rect x="44" y="80" width="32" height="58" fill="#9c3b2e" opacity="0.55" />
                    <rect x="44" y="84" width="32" height="14" fill="#f4ede2" opacity="0.9" />
                </svg>
            </div>

            <div className="tarjeta-vino-info">
                <span className="tarjeta-vino-bodega">{vino.bodega?.toUpperCase()}</span>
                <h3 className="tarjeta-vino-nombre">{vino.nombre}</h3>
                <p className="tarjeta-vino-detalle">Año {vino.anioCosecha} · Edición limitada</p>

                <div className="tarjeta-vino-footer">
                    <span className="tarjeta-vino-precio">${vino.precio?.toLocaleString('es-AR')}</span>
                    <span
                        className={`tarjeta-vino-stock ${stockVisualRestante > 0 ? 'tarjeta-vino-stock-ok' : 'tarjeta-vino-stock-agotado'}`}
                    >
                        {stockVisualRestante > 0 ? `${stockVisualRestante} disp.` : 'Sin stock'}
                    </span>
                </div>

                <button
                    className={`tarjeta-vino-boton ${limiteAlcanzado ? 'tarjeta-vino-boton-limite' : ''}`}
                    disabled={vino.stock === 0 || limiteAlcanzado}
                    onClick={manejarClickAgregar}
                >
                    {vino.stock === 0
                        ? 'Agotado'
                        : limiteAlcanzado
                            ? 'Límite alcanzado'
                            : 'Añadir a la colección'
                    }
                </button>
            </div>
        </div>
    );
};

export default TarjetaVino;
