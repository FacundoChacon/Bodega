import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ cantidadCarrito, alAbrirCarrito, alClickCava, alClickHistoria, alClickResto }) => {
    const [animarClick, setAnimarClick] = useState(false);
    const [conScroll, setConScroll] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);

    useEffect(() => {
        const escucharAdicion = () => {
            setAnimarClick(true);
            setTimeout(() => setAnimarClick(false), 400);
        };
        window.addEventListener('vinoAnadido', escucharAdicion);
        return () => window.removeEventListener('vinoAnadido', escucharAdicion);
    }, []);

    useEffect(() => {
        const manejarScroll = () => setConScroll(window.scrollY > 40);
        window.addEventListener('scroll', manejarScroll);
        return () => window.removeEventListener('scroll', manejarScroll);
    }, []);

    const irYcerrar = (fn) => {
        fn();
        setMenuAbierto(false);
    };

    return (
        <nav className={`navbar ${conScroll ? 'navbar-con-scroll' : ''}`}>
            <div className="contenedor navbar-fila">
                <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    BODEGA MAIPÚ
                </div>

                <button
                    className="navbar-burger"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                >
                    <span /><span /><span />
                </button>

                <div className={`navbar-menu ${menuAbierto ? 'navbar-menu-abierto' : ''}`}>
                    <button onClick={() => irYcerrar(alClickHistoria)} className="navbar-enlace">
                        Nuestra historia
                    </button>
                    <button onClick={() => irYcerrar(alClickResto)} className="navbar-enlace">
                        Restó
                    </button>
                    <button onClick={() => irYcerrar(alClickCava)} className="navbar-enlace">
                        Nuestra cava
                    </button>
                    <button
                        onClick={() => irYcerrar(alAbrirCarrito)}
                        className={`navbar-boton-carrito ${animarClick ? 'navbar-carrito-destello' : ''}`}
                    >
                        Carrito ({cantidadCarrito})
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
