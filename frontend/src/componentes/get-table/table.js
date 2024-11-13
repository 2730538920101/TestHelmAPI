// src/componentes/get-table/table.js
import React, { useState, useEffect } from 'react';
import { getContactos, getContactoByName } from '../../servicios/contacto_service';
import './table.css';

function GetComponent() {
    const [contactos, setContactos] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredContactos, setFilteredContactos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const data = await getContactos();
                if (data && data.length > 0) {
                    setContactos(data);
                    setFilteredContactos(data);
                    setError(''); // Limpiar mensaje de error si se obtienen datos
                } else {
                    setError('No se encontraron contactos.'); // Mensaje cuando no hay datos
                }
            } catch (err) {
                setError(err.message || 'Error al obtener contactos');
            }
        };

        fetchContactos();
    }, []);

    const handleSearch = async () => {
        if (search) {
            try {
                const data = await getContactoByName(search);
                if (data) {
                    setFilteredContactos([data]);
                    setError(''); // Limpiar mensaje de error
                } else {
                    setFilteredContactos([]);
                    setError('No se encontraron coincidencias.');
                }
            } catch (err) {
                setFilteredContactos([]);
                setError('Error al buscar contacto');
            }
        } else {
            setFilteredContactos(contactos);
            setError(''); // Limpiar mensaje de error si el campo de búsqueda está vacío
        }
    };

    return (
        <div className="table-container">
            <h1>Contactos</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Buscar</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContactos && filteredContactos.length > 0 ? (
                        filteredContactos.map((contacto, index) => (
                            <tr key={index}>
                                <td>{contacto.nombre}</td>
                                <td>{contacto.telefono}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">{error || "No hay contactos"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GetComponent;
