import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservas';

export const ReservaService = {
    crearReserva: async (datosReserva) => {
        try {
            // MANDA LA PETICIÓN AL BACKEND PARA CREAR LA RESERVA
            const respuesta = await axios.post(API_URL, datosReserva);
            return respuesta.data;
        } catch (error) {
            // CAPTURA EL ERROR Y LO LANZA PARA QUE EL COMPONENTE LO MANEJE
            throw error.response?.data?.error || 'No se pudo procesar la reserva.';
        }
    }
};