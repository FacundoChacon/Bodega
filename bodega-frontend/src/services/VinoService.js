// src/services/VinoService.js

/**
 * Pide a la API los vinos filtrados, ordenados y paginados.
 * @param {Object} filtros - Objeto con los criterios de búsqueda.
 * @returns {Promise<Object>} El objeto Page que envía Spring Boot.
 */
export const obtenerVinosConFiltrosYPaginas = async (filtros = {}) => {
    const {
    bodega = '',
    precioMin = '',
    precioMax = '',
    categoriaId = '',
    ordenarPor = 'NOMBRE',
    ordenDirection = 'ASC',
    page = 0,
    size = 6
    } = filtros;

    const url = new URL('http://localhost:8080/api/vinos');

    if (bodega) url.searchParams.append('bodega', bodega);
    if (precioMin) url.searchParams.append('precioMin', precioMin);
    if (precioMax) url.searchParams.append('precioMax', precioMax);
    if (categoriaId) url.searchParams.append('categoriaId', categoriaId);

    url.searchParams.append('ordenarPor', ordenarPor);
    url.searchParams.append('ordenDireccion', ordenDirection);
    url.searchParams.append('page', page);
    url.searchParams.append('size', size);

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
    throw new Error('Error al conectar con la cava de la API');
    }
    return await respuesta.json(); // Retorna el objeto Page entero (content, totalPages, etc.)
};