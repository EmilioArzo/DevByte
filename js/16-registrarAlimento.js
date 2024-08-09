document.addEventListener('DOMContentLoaded', function() {
    let maxId = 0;

    // Cargar datos desde el archivo JSON
    fetch('js/jsonAlimento.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                addRowToTable(item.id, item.nombre, item.descripcion, item.precio, item.categoria, item.imagen);
                maxId = Math.max(maxId, parseInt(item.id));
            });
            document.getElementById('id').value = maxId + 1; // Asignar el siguiente ID al campo de ID
            localStorage.setItem('alimentos', JSON.stringify(data));
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

        // Obtener la imagen seleccionada
        const imagenInput = document.getElementById('imagen');
        const imagenFile = imagenInput.files[0];

        let imagenUrl = '';
        if (imagenFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagenUrl = event.target.result;
                addRowToTable(id, nombre, descripcion, precio, categoria, imagenUrl);
                saveToLocalStorage(id, nombre, descripcion, precio, categoria, imagenUrl);
                // Limpiar los campos del formulario
                document.getElementById('dataForm').reset();
                imagenInput.value = ''; // Limpiar el campo de archivo
                document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
            };
            reader.readAsDataURL(imagenFile);
        } else {
            addRowToTable(id, nombre, descripcion, precio, categoria, imagenUrl);
            saveToLocalStorage(id, nombre, descripcion, precio, categoria, imagenUrl);
            // Limpiar los campos del formulario
            document.getElementById('dataForm').reset();
            document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
        }
    });
});

// Función para agregar una fila a la tabla
function addRowToTable(id, nombre, descripcion, precio, categoria, imagenUrl) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.textContent = id;
    cell2.textContent = nombre;
    cell3.textContent = descripcion;
    cell4.textContent = precio;
    cell5.textContent = categoria;

    if (imagenUrl) {
        const img = document.createElement('img');
        img.src = imagenUrl;
        img.style.width = '100px'; // Ajusta el tamaño según sea necesario
        img.style.height = 'auto';
        cell6.appendChild(img);
    } else {
        cell6.textContent = 'No disponible';
    }
}

// Función para guardar los datos en LocalStorage
function saveToLocalStorage(id, nombre, descripcion, precio, categoria, imagenUrl){
    const data = {
        id: id.toString(),
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        categoria: categoria,
        imagenUrl: imagenUrl
    };

    let alimentos = JSON.parse(localStorage.getItem('alimentos')) || [];
    alimentos.push(data);
    localStorage.setItem('alimentos', JSON.stringify(alimentos));
}
