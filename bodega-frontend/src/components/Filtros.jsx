import React from 'react';

const Filtros = ({ 
    filtros, 
    alCambiarFiltro,
    alLimpiarFiltros 
}) => {
    return (
        //  FILTROS PRINCIPALES: Bodega, Categoría, Precio Mín, Precio Máx, Ordenar Por
        <div style={styles.contenedorPrincipal}>
            <div style={styles.barraFiltros}>
                {/* POR BODEGA */}
                <div style={styles.grupoFiltro}>
                    <label style={styles.label}>BODEGA</label>
                    <input 
                        type="text" 
                        placeholder="Ej: Catena Zapata" 
                        value={filtros.bodega}
                        onChange={(e) => alCambiarFiltro('bodega', e.target.value)}
                        style={styles.input}
                    />
                </div>

                {/* POR CATEGORIA */}
                <div style={styles.grupoFiltro}>
                    <label style={styles.label}>VARIEDAD</label>
                    <select 
                        value={filtros.categoriaId} 
                        onChange={(e) => alCambiarFiltro('categoriaId', e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Todas las variedades</option>
                        <option value="1">Tinto (Malbec / Cabernet)</option>
                        <option value="2">Blanco (Chardonnay / Torrontés)</option>
                        <option value="3">Rosado</option>
                        <option value="4">Espumante / Blend</option>
                    </select>
                </div>

                {/* RANGO DE PRECIO */}
                <div style={styles.grupoFiltro}>
                    <label style={styles.label}>PRECIO MÍN</label>
                    <input 
                        type="number" 
                        placeholder="$ Min" 
                        value={filtros.precioMin}
                        onChange={(e) => alCambiarFiltro('precioMin', e.target.value)}
                        style={styles.inputPrecio}
                    />
                </div>

                <div style={styles.grupoFiltro}>
                    <label style={styles.label}>PRECIO MÁX</label>
                    <input 
                        type="number" 
                        placeholder="$ Max" 
                        value={filtros.precioMax}
                        onChange={(e) => alCambiarFiltro('precioMax', e.target.value)}
                        style={styles.inputPrecio}
                    />
                </div>

                {/* COMBINADO */}
                <div style={styles.grupoFiltro}>
                    <label style={styles.label}>ORDENAR POR</label>
                    <select 
                        value={`${filtros.ordenarPor},${filtros.ordenDireccion}`} 
                        onChange={(e) => {
                            const [campo, direccion] = e.target.value.split(',');
                            alCambiarFiltro('ordenarPor', campo);
                            alCambiarFiltro('ordenDireccion', direccion);
                        }}
                        style={styles.select}
                    >
                        <option value="NOMBRE,ASC">Nombre (A-Z)</option>
                        <option value="NOMBRE,DESC">Nombre (Z-A)</option>
                        <option value="PRECIO,ASC">Precio: Menor a Mayor</option>
                        <option value="PRECIO,DESC">Precio: Mayor a Menor</option>
                    </select>
                </div>
            </div>

            <button onClick={alLimpiarFiltros} style={styles.botonLimpiar}>
                Limpiar Filtros
            </button>
        </div>
    );
};

const styles = {
    contenedorPrincipal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '40px',
        fontFamily: '"Inter", sans-serif'
    },
    barraFiltros: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        padding: '20px 30px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        border: '1px solid #f0f0f0'
    },
    grupoFiltro: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '6px'
    },
    label: {
        fontSize: '10px',
        letterSpacing: '2px',
        color: '#888',
        fontWeight: '700'
    },
    input: {
        padding: '10px 14px',
        fontSize: '14px',
        border: '1px solid #eaeaea',
        borderRadius: '4px',
        outline: 'none',
        width: '160px'
    },
    inputPrecio: {
        padding: '10px 14px',
        fontSize: '14px',
        border: '1px solid #eaeaea',
        borderRadius: '4px',
        outline: 'none',
        width: '90px'
    },
    select: {
        padding: '10px 14px',
        fontSize: '14px',
        border: '1px solid #eaeaea',
        backgroundColor: '#fff',
        borderRadius: '4px',
        color: '#1a1a1a',
        cursor: 'pointer',
        outline: 'none',
        minWidth: '180px'
    },
    botonLimpiar: {
        background: 'none',
        border: 'none',
        color: '#722f37',
        fontSize: '13px',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontFamily: '"Inter", sans-serif'
    }
};

export default Filtros;