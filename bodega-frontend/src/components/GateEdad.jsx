import React, { useState } from 'react';
import './GateEdad.css';

const GateEdad = ({ alConfirmar }) => {
    const [saliendo, setSaliendo] = useState(false);
    const [rechazado, setRechazado] = useState(false);

    const confirmarMayoria = () => {
        setSaliendo(true);
        sessionStorage.setItem('mayorDeEdadConfirmado', 'true');
        setTimeout(() => alConfirmar(), 600);
    };

    const negarMayoria = () => {
        setRechazado(true);
    };

    if (rechazado) {
        return (
            <div className="gate-overlay">
                <div className="gate-rechazo">
                    <span className="gate-rechazo-icono">🍇</span>
                    <h2>Este sitio es solo para mayores de 18 años</h2>
                    <p>Volvé cuando tengas la edad legal para consumir alcohol en tu país.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`gate-overlay ${saliendo ? 'gate-saliendo' : ''}`}>
            <div className="gate-horizonte" aria-hidden="true">
                <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
                    <path d="M0,200 L0,140 L80,90 L160,130 L250,40 L340,110 L420,70 L520,120 L610,30 L700,100 L800,60 L900,115 L1000,55 L1100,105 L1200,80 L1200,200 Z" />
                </svg>
            </div>

            <div className="gate-contenido">
                <span className="gate-marca">BODEGA MAIPÚ</span>
                <h1 className="gate-titulo">¿Sos mayor de edad?</h1>
                <p className="gate-texto">
                    Para ingresar a nuestro sitio necesitamos confirmar que tenés 18 años o más.
                    Beber con moderación.
                </p>

                <div className="gate-botones">
                    <button className="gate-boton gate-boton-si" onClick={confirmarMayoria}>
                        Sí, soy mayor
                    </button>
                    <button className="gate-boton gate-boton-no" onClick={negarMayoria}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GateEdad;
