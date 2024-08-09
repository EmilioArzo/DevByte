document.addEventListener('DOMContentLoaded', function() {
    let maxId = 0;

    // Cargar datos desde el archivo JSON
    fetch('js/jason.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                addRowToTable(item.id, item.horario, item.nombre, item.direccion, item.latitud, item.longitud, item.url, item.imagen);
                maxId = Math.max(maxId, parseInt(item.id));
            });
            document.getElementById('id').value = maxId + 1; // Asignar el siguiente ID al campo de ID
        })
        .catch(error => console.error('Error cargando datos JSON:', error));

    // Manejar el envío del formulario
    document.getElementById('dataForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Incrementar el ID automáticamente
        const id = ++maxId;
        document.getElementById('id').value = id; // Asignar el nuevo ID al campo de ID

        const horario = document.getElementById('horario').value;
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const latitud = document.getElementById('latitud').value;
        const longitud = document.getElementById('longitud').value;
        const url = document.getElementById('url').value;

        // Obtener la imagen seleccionada
        const imagenInput = document.getElementById('imagen');
        const imagenFile = imagenInput.files[0];

        let imagenUrl = '';
        if (imagenFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagenUrl = event.target.result;
                addRowToTable(id, horario, nombre, direccion, latitud, longitud, url, imagenUrl);
                // Limpiar los campos del formulario
                document.getElementById('dataForm').reset();
                imagenInput.value = ''; // Limpiar el campo de archivo
                document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
            };
            reader.readAsDataURL(imagenFile);
        } else {
            addRowToTable(id, horario, nombre, direccion, latitud, longitud, url, imagenUrl);
            // Limpiar los campos del formulario
            document.getElementById('dataForm').reset();
            document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
        }
    });
});

// Función para agregar una fila a la tabla
function addRowToTable(id, horario, nombre, direccion, latitud, longitud, url, imagenUrl) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    const cell8 = newRow.insertCell(7);

    cell1.textContent = id;
    cell2.textContent = horario;
    cell3.textContent = nombre;
    cell4.textContent = direccion;
    cell5.textContent = latitud;
    cell6.textContent = longitud;
    cell7.textContent = url;

    if (imagenUrl) {
        const img = document.createElement('img');
        img.src = imagenUrl;
        img.style.width = '100px'; // Ajusta el tamaño según sea necesario
        img.style.height = 'auto';
        cell8.appendChild(img);
    } else {
        cell8.textContent = 'No disponible';
    }
}
