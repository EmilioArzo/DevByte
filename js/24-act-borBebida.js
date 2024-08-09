document.addEventListener('DOMContentLoaded', function() {
    let maxId = 0;
    let selectedRow = null;
 
    // Cargar datos desde el archivo JSON
    fetch('js/jasonBebida.json')
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
            
        })
        .catch(error => console.error('Error cargando datos JSON:', error));

    // Manejar el envío del formulario
    document.getElementById('dataForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        if (selectedRow) {
            updateRow(selectedRow);
        } else {
            const id = ++maxId;
            document.getElementById('id').value = id; // Asignar el nuevo ID al campo de ID

            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = document.getElementById('precio').value;
            const categoria = document.getElementById('categoria').value;
           

            const imagenInput = document.getElementById('imagen');
            const imagenFile = imagenInput.files[0];

            let imagenUrl = '';
            if (imagenFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    imagenUrl = event.target.result;
                    addRowToTable(id, nombre, descripcion, precio, categoria, imagenUrl);
                    document.getElementById('dataForm').reset();
                    imagenInput.value = ''; // Limpiar el campo de archivo
                    document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
                };
                reader.readAsDataURL(imagenFile);
            } else {
                addRowToTable(id, nombre, descripcion, precio, categoria, imagenUrl);
                document.getElementById('dataForm').reset();
                document.getElementById('id').value = maxId + 1; // Actualizar el campo de ID
            }
        }
    });

    // Manejar el clic en el botón de actualizar
    document.getElementById('updateButton').addEventListener('click', function() {
        if (selectedRow) {
            updateRow(selectedRow);
        } else {
            alert('Por favor, selecciona una fila para actualizar.');
        }
    });

    // Manejar el clic en el botón de borrar
    document.getElementById('deleteButton').addEventListener('click', function() {
        if (selectedRow) {
            deleteRow(selectedRow);
        } else {
            alert('Por favor, selecciona una fila para borrar.');
        }
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

        // Añadir el evento de selección
        newRow.addEventListener('click', function() {
            selectRow(newRow);
        });
    }

    // Función para seleccionar una fila
    function selectRow(row) {
        if (selectedRow) {
            selectedRow.classList.remove('selected');
        }
        selectedRow = row;
        selectedRow.classList.add('selected');

        const cells = row.getElementsByTagName('td');
        document.getElementById('id').value = cells[0].textContent;
        document.getElementById('nombre').value = cells[1].textContent;
        document.getElementById('descripcion').value = cells[2].textContent;
        document.getElementById('precio').value = cells[3].textContent;
        document.getElementById('categoria').value = cells[4].textContent;
        

        const img = cells[5].getElementsByTagName('img')[0];
        if (img) {
            document.getElementById('imagen').value = img.src;
        } else {
            document.getElementById('imagen').value = '';
        }
    }

    // Función para actualizar una fila
    function updateRow(row) {
        const id = document.getElementById('id').value;
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;
        const categoria = document.getElementById('categoria').value;
        

        const imagenInput = document.getElementById('imagen');
        const imagenFile = imagenInput.files[0];

        let imagenUrl = '';
        if (imagenFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagenUrl = event.target.result;
                updateRowInTable(row, id, nombre, descripcion, precio, categoria, imagenUrl);
            };
            reader.readAsDataURL(imagenFile);
        } else {
            updateRowInTable(row, id, nombre, descripcion, precio, categoria, imagenUrl);
        }
    }

    // Función para actualizar una fila en la tabla
    function updateRowInTable(row, id, nombre, descripcion, precio, categoria, imagenUrl) {
        const cells = row.getElementsByTagName('td');
        cells[0].textContent = id;
        cells[1].textContent = nombre;
        cells[2].textContent = descripcion;
        cells[3].textContent = precio;
        cells[4].textContent = categoria;
        

        const imgCell = cells[5];
        imgCell.innerHTML = '';
        if (imagenUrl) {
            const img = document.createElement('img');
            img.src = imagenUrl;
            img.style.width = '100px'; // Ajusta el tamaño según sea necesario
            img.style.height = 'auto';
            imgCell.appendChild(img);
        } else {
            imgCell.textContent = 'No disponible';
        }

        selectedRow = null;
        document.getElementById('dataForm').reset();
    }

    // Función para eliminar una fila
    function deleteRow(row) {
        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        table.deleteRow(row.rowIndex - 1); // Ajusta el índice de la fila
        selectedRow = null;
        document.getElementById('dataForm').reset();
    }
});