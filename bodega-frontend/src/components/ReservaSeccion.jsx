import React, { useState } from 'react';
import { ReservaService } from '../services/ReservaService';
import './ReservaSeccion.css';

const ReservaSeccion = ({ reservaRef }) => {
    const [datos, setDatos] = useState({
        nombreCliente: '',
        telefono: '',
        fecha: '',
        hora: '12:30:00', // FORMATO PARA JAVA (HH:mm:ss)
        cantidadPersonas: 2
    });
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(null);

    const elCambio = (e) => {
        const { name, value } = e.target;
        // SI EL CAMPO ES "hora", LO CONVERTIMOS A FORMATO HH:mm:ss PARA JAVA
        if (name === 'hora') {
            setDatos({ ...datos, hora: `${value}:00` });
        } else {
            setDatos({ ...datos, [name]: value });
        }
    };

    const manejarReserva = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await ReservaService.crearReserva(datos);
            setEnviado(true);
        } catch (msgError) {
            setError(msgError); // SETEA EL MENSAJE DE ERROR PARA MOSTRARLO EN EL FORMULARIO
        }
    };

    return (
        <section ref={reservaRef} className="reserva-seccion">
            <div className="contenedor reserva-grid">
                <div className="reserva-info">
                    <span className="eyebrow">Restó &amp; experiencias</span>
                    <h2 className="titulo-seccion reserva-titulo">
                        Alquimia: sabores de nuestra tierra
                    </h2>
                    <p className="reserva-descripcion">
                        Disfrutá de un menú por pasos maridado minuciosamente con los mejores varietales
                        de la bodega, con vista directa a la cordillera de los Andes.
                    </p>
                    <div className="reserva-detalle">
                        <p><strong>Ubicación</strong> Bodega Maipú, Mendoza</p>
                        <p><strong>Horarios</strong> Almuerzos 12:30 a 15:30 · Cenas 20:30 a 23:30</p>
                    </div>
                </div>

                <div className="reserva-bloque-form">
                    {enviado ? (
                        <div className="reserva-exito">
                            <span className="reserva-exito-icono">🍽️</span>
                            <h3>¡Reserva confirmada!</h3>
                            <p>
                                Tu mesa ha sido asignada con éxito para el día {datos.fecha} a las{' '}
                                {datos.hora.substring(0, 5)} hs.
                            </p>
                            <button onClick={() => setEnviado(false)} className="reserva-btn-volver">
                                Nueva reserva
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={manejarReserva} className="reserva-formulario">
                            <h3 className="reserva-form-titulo">Reservá tu mesa</h3>

                            {error && <p className="reserva-error">⚠ {error}</p>}

                            <input
                                type="text"
                                name="nombreCliente"
                                placeholder="Nombre completo"
                                required
                                onChange={elCambio}
                                className="reserva-input"
                            />
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono de contacto"
                                required
                                onChange={elCambio}
                                className="reserva-input"
                            />

                            <div className="reserva-fila">
                                <input
                                    type="date"
                                    name="fecha"
                                    required
                                    onChange={elCambio}
                                    className="reserva-input"
                                />
                                <select name="hora" onChange={elCambio} className="reserva-select">
                                    <option value="12:30">12:30 hs (Almuerzo)</option>
                                    <option value="13:30">13:30 hs (Almuerzo)</option>
                                    <option value="21:00">21:00 hs (Cena)</option>
                                    <option value="22:00">22:00 hs (Cena)</option>
                                </select>
                            </div>

                            <select name="cantidadPersonas" onChange={elCambio} className="reserva-select">
                                <option value={2}>2 personas</option>
                                <option value={4}>4 personas</option>
                                <option value={6}>6 personas</option>
                                <option value={8}>8 personas</option>
                            </select>

                            <button type="submit" className="reserva-boton-submit">
                                Solicitar reserva
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReservaSeccion;
