document.addEventListener('DOMContentLoaded', function() {
    let maxId = 0;

    // Cargar datos desde el archivo JSON
    fetch('js/jasonCombo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                addRowToTable(item.id, item.nombre, item.descripcion, item.precio, item.categoria, item.bebida, item.imagen);
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
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;
        const categoria = document.getElementById('categoria').value;
        const bebida = document.getElementById('bebida').value;
        
        // Obtener la imagen seleccionada
        const imagenInput = document.getElementById('imagen');
        const imagenFile = imagenInput.files[0];

        let imagenUrl = '';
        if (imagenFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagenUrl = event.target.result;
                addRowToTable(id, nombre, descripcion, precio, categoria, bebida, imagenUrl);
                // Limpiar los campos del formulario
                document.getElementById('dataForm').reset();
                imagenInput.value = ''; // Limpiar el campo de archivo
                document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
            };
            reader.readAsDataURL(imagenFile);
        } else {
            addRowToTable(id, nombre, descripcion, precio, categoria, bebida, imagenUrl);
            // Limpiar los campos del formulario
            document.getElementById('dataForm').reset();
            document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
        }
    });
});

// Función para agregar una fila a la tabla
function addRowToTable(id, nombre, descripcion, precio, categoria, bebida, imagenUrl) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    

    cell1.textContent = id;
    cell2.textContent = nombre;
    cell3.textContent = descripcion;
    cell4.textContent = precio;
    cell5.textContent = categoria;
    cell6.textContent = bebida;
    
    if (imagenUrl) {
        const img = document.createElement('img');
        img.src = imagenUrl;
        img.style.width = '100px'; // Ajusta el tamaño según sea necesario
        img.style.height = 'auto';
        cell7.appendChild(img);
    } else {
        cell7.textContent = 'No disponible';
    }
}



