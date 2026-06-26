import React from 'react';
import './Hero.css';

const Hero = ({ alClickExplorar }) => {
    return (
        <header className="hero">
            <div className="hero-fondo" aria-hidden="true">
                <div className="hero-fondo-textura" />
                <div className="hero-degradado" />
            </div>

            <div className="hero-horizonte" aria-hidden="true">
                <svg viewBox="0 0 1200 160" preserveAspectRatio="none">
                    <path d="M0,160 L0,100 L90,55 L180,95 L280,20 L370,80 L460,45 L560,90 L660,15 L760,75 L860,40 L960,85 L1060,30 L1160,70 L1200,55 L1200,160 Z" />
                </svg>
            </div>

            <div className="hero-contenido">
                <span className="hero-marca">BODEGA MAIPÚ · MENDOZA</span>
                <h1 className="hero-titulo">El legado de la tierra</h1>
                <p className="hero-subtitulo">
                    Vinos de precisión nacidos al pie de los Andes mendocinos, donde el sol y la altura
                    moldean cada cosecha.
                </p>
                <button className="hero-boton" onClick={alClickExplorar}>
                    Explorar la cava
                </button>
            </div>

            <div className="hero-scroll-indicador" aria-hidden="true">
                <span className="hero-scroll-linea" />
            </div>
        </header>
    );
};

export default Hero;
