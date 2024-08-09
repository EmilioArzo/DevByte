document.addEventListener('DOMContentLoaded', function() {
    let maxId = 0;

    // Cargar datos desde el archivo JSON
    fetch('js/jasonUsuario.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                addRowToTable(item.id, item.nombre, item.contraseña);
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

        const nombre = document.getElementById('nombre').value;
        const contraseña = document.getElementById('contraseña').value;

        addRowToTable(id, nombre, contraseña);

        // Limpiar los campos del formulario
        document.getElementById('dataForm').reset();
        document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
    });
});

// Función para agregar una fila a la tabla
function addRowToTable(id, nombre, contraseña) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.textContent = id;
    cell2.textContent = nombre;
    cell3.textContent = contraseña;
}
