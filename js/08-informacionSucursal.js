document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const nombre = urlParams.get('usuario');

    // Cargar datos desde localStorage
    const sucursales = JSON.parse(localStorage.getItem('sucursales')) || [];

    const sucursal = sucursales.find(sucursal => {
        return (id && sucursal.id === id) || (nombre && sucursal.nombre.toLowerCase().includes(nombre.toLowerCase()));
    });

    if (sucursal) {
        document.getElementById('sucursalNombre').textContent = sucursal.nombre;
        document.getElementById('sucursalDescripcion').textContent = `
            ID: ${sucursal.id}
            Horario: ${sucursal.horario}
            Dirección: ${sucursal.direccion}
            Latitud: ${sucursal.latitud}
            Longitud: ${sucursal.longitud}
            URL: ${sucursal.url}
        `;
        const imgElement = document.getElementById('sucursalImagen');
        if (sucursal.imagen) {
            imgElement.src = sucursal.imagen;
        } else {
            imgElement.src = 'imagenes/default-image.png'; // Imagen por defecto si no hay imagen disponible
        }
    } else {    
        alert('Sucursal no encontrada');
    }
});
