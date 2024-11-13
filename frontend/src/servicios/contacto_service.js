import Contacto from '../modelos/contacto'; // Importa la clase Contacto

// Usa la variable de entorno REACT_APP_API_SERVER o un valor predeterminado
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : process.env.REACT_APP_API_SERVER; 

// Función para agregar un nuevo contacto
export const addContacto = async (contacto) => {
    try {
        console.log(process.env.NODE_ENV);
        console.log(API_BASE_URL);
        // Crea una instancia de Contacto
        const nuevoContacto = new Contacto(contacto.nombre, contacto.telefono);

        const response = await fetch(`${API_BASE_URL}/postMethod`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoContacto),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error?.message || 'Error al agregar contacto');
        }

        return result.message;
    } catch (error) {
        throw new Error(error.message || 'Error en la petición');
    }
};

// Función para obtener todos los contactos
export const getContactos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/getMethod`);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error?.message || 'Error al obtener contactos');
        }

        return result.contactos;
    } catch (error) {
        throw new Error(error.message || 'Error en la petición');
    }
};

// Función para buscar un contacto por nombre
export const getContactoByName = async (nombre) => {
    try {
        const response = await fetch(`${API_BASE_URL}/getContact/${encodeURIComponent(nombre)}`);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error?.message || 'Error al buscar contacto');
        }

        return result.contacto;
    } catch (error) {
        throw new Error(error.message || 'Error en la petición');
    }
};
