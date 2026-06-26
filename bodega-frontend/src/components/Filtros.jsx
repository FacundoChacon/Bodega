import React from 'react';
import './Filtros.css';

const Filtros = ({
    filtros,
    alCambiarFiltro,
    alLimpiarFiltros
}) => {
    return (
        <div className="filtros-contenedor">
            <div className="filtros-barra">
                <div className="filtros-grupo">
                    <label className="filtros-label">Bodega</label>
                    <input
                        type="text"
                        placeholder="Ej: Catena Zapata"
                        value={filtros.bodega}
                        onChange={(e) => alCambiarFiltro('bodega', e.target.value)}
                        className="filtros-input"
                    />
                </div>

                <div className="filtros-grupo">
                    <label className="filtros-label">Variedad</label>
                    <select
                        value={filtros.categoriaId}
                        onChange={(e) => alCambiarFiltro('categoriaId', e.target.value)}
                        className="filtros-select"
                    >
                        <option value="">Todas las variedades</option>
                        <option value="1">Tinto (Malbec / Cabernet)</option>
                        <option value="2">Blanco (Chardonnay / Torrontés)</option>
                        <option value="3">Rosado</option>
                        <option value="4">Espumante / Blend</option>
                    </select>
                </div>

                <div className="filtros-grupo">
                    <label className="filtros-label">Precio mín.</label>
                    <input
                        type="number"
                        placeholder="$ Min"
                        value={filtros.precioMin}
                        onChange={(e) => alCambiarFiltro('precioMin', e.target.value)}
                        className="filtros-input-precio"
                    />
                </div>

                <div className="filtros-grupo">
                    <label className="filtros-label">Precio máx.</label>
                    <input
                        type="number"
                        placeholder="$ Max"
                        value={filtros.precioMax}
                        onChange={(e) => alCambiarFiltro('precioMax', e.target.value)}
                        className="filtros-input-precio"
                    />
                </div>

                <div className="filtros-grupo">
                    <label className="filtros-label">Ordenar por</label>
                    <select
                        value={`${filtros.ordenarPor},${filtros.ordenDireccion}`}
                        onChange={(e) => {
                            const [campo, direccion] = e.target.value.split(',');
                            alCambiarFiltro('ordenarPor', campo);
                            alCambiarFiltro('ordenDireccion', direccion);
                        }}
                        className="filtros-select"
                    >
                        <option value="NOMBRE,ASC">Nombre (A-Z)</option>
                        <option value="NOMBRE,DESC">Nombre (Z-A)</option>
                        <option value="PRECIO,ASC">Precio: menor a mayor</option>
                        <option value="PRECIO,DESC">Precio: mayor a menor</option>
                    </select>
                </div>
            </div>

            <button onClick={alLimpiarFiltros} className="filtros-boton-limpiar">
                Limpiar filtros
            </button>
        </div>
    );
};

export default Filtros;
