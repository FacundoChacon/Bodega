import React from 'react';
import './HistoriaSeccion.css';

const HistoriaSeccion = ({ historiaRef }) => {
    return (
        <section ref={historiaRef} className="historia-seccion">
            <div className="contenedor historia-grid">
                <div className="historia-texto">
                    <span className="eyebrow">Nuestras raíces</span>
                    <h2 className="titulo-seccion historia-titulo">
                        Una historia forjada entre viñedos y cordillera
                    </h2>
                    <p className="historia-parrafo">
                        Fundada en 1924 por Don Amadeo Maipú, un inmigrante apasionado que vio en las tierras
                        altas de Mendoza el escenario perfecto para su sueño, nuestra bodega comenzó con
                        apenas tres hectáreas de suelo pedregoso y una promesa: respetar el ritmo de la naturaleza.
                    </p>
                    <p className="historia-parrafo">
                        A lo largo de cuatro generaciones, combinamos los secretos ancestrales de la crianza
                        en roble con la precisión de la enología moderna. Hoy, cada botella que sale de
                        nuestra cava es un homenaje al sol mendocino, al agua pura de deshielo y al esfuerzo
                        inquebrantable de nuestra gente.
                    </p>

                    <div className="historia-dato">
                        <span className="historia-dato-numero">1924</span>
                        <span className="historia-dato-texto">Mendoza, Argentina</span>
                    </div>
                </div>

                <div className="historia-galeria">
                    <div className="historia-panel historia-panel-grande" role="img" aria-label="Ilustración de viñedos al atardecer con la cordillera de fondo">
                        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                            <defs>
                                <linearGradient id="cieloGrande" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#9c3b2e" stopOpacity="0.55" />
                                    <stop offset="55%" stopColor="#3a1c1a" stopOpacity="0.9" />
                                    <stop offset="100%" stopColor="#0f0a0c" />
                                </linearGradient>
                            </defs>
                            <rect width="400" height="500" fill="url(#cieloGrande)" />
                            <circle cx="200" cy="170" r="58" fill="#d4af6a" opacity="0.55" />
                            <path d="M0,260 L60,230 L120,250 L190,210 L260,245 L330,215 L400,240 L400,500 L0,500 Z" fill="#1a1012" opacity="0.85" />
                            {[60, 110, 160, 210, 260, 310].map((x) => (
                                <path key={x} d={`M${x},500 L${x + 30},260`} stroke="#d4af6a" strokeOpacity="0.18" strokeWidth="2" />
                            ))}
                        </svg>
                    </div>
                    <div className="historia-panel historia-panel-chica" role="img" aria-label="Ilustración de barriles de roble en la cava">
                        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                            <rect width="200" height="200" fill="#241512" />
                            <circle cx="100" cy="100" r="62" fill="none" stroke="#d4af6a" strokeOpacity="0.5" strokeWidth="6" />
                            <circle cx="100" cy="100" r="44" fill="none" stroke="#d4af6a" strokeOpacity="0.35" strokeWidth="3" />
                            <circle cx="100" cy="100" r="6" fill="#9c3b2e" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HistoriaSeccion;
