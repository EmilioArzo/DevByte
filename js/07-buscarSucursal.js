document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos desde localStorage
    const sucursales = JSON.parse(localStorage.getItem('sucursales')) || [];

    // Manejar el envío del formulario de búsqueda
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        const id = document.getElementById('id').value;
        const nombre = document.getElementById('usuario').value;

        const resultados = sucursales.filter(sucursal => {
            return (id && sucursal.id === id) || (nombre && sucursal.nombre.toLowerCase().includes(nombre.toLowerCase()));
        });

        mostrarResultados(resultados);
    });
});

// Función para mostrar los resultados de la búsqueda en la tabla
function mostrarResultados(resultados) {
    const tableBody = document.getElementById('tblProductos');
    tableBody.innerHTML = ''; // Limpiar los resultados anteriores

    resultados.forEach(sucursal => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = sucursal.id;
        row.insertCell(1).textContent = sucursal.horario;
        row.insertCell(2).textContent = sucursal.nombre;
        row.insertCell(3).textContent = sucursal.direccion;
        row.insertCell(4).textContent = sucursal.latitud;
        row.insertCell(5).textContent = sucursal.longitud;
        row.insertCell(6).textContent = sucursal.url;

        const imgCell = row.insertCell(7);
        if (sucursal.imagen) {
            const img = document.createElement('img');
            img.src = sucursal.imagen;
            img.style.width = '100px'; // Ajusta el tamaño según sea necesario
            img.style.height = 'auto';
            imgCell.appendChild(img);
        } else {
            imgCell.textContent = 'No disponible';
        }
    });
}
