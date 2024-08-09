document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos desde localStorage
    const alimentos = JSON.parse(localStorage.getItem('alimentos')) || [];

    // Manejar el envío del formulario de búsqueda
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        const nombre = document.getElementById('searchInputNombre').value.toLowerCase();
        const precio = document.getElementById('searchInputPrecio').value;
        const categoria = document.getElementById('searchInputCategoria').value.toLowerCase();

        const resultados = alimentos.filter(alimento => {
            return (nombre && alimento.nombre.toLowerCase().includes(nombre)) || 
                   (precio && alimento.precio === precio) || 
                   (categoria && alimento.categoria.toLowerCase().includes(categoria));
        });

        mostrarResultados(resultados);
    });
});

// Función para mostrar los resultados de la búsqueda en la tabla
function mostrarResultados(resultados) {
    const tableBody = document.getElementById('searchResultsBody');
    tableBody.innerHTML = ''; // Limpiar los resultados anteriores

    resultados.forEach(alimento => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = alimento.id;
        row.insertCell(1).textContent = alimento.nombre;
        row.insertCell(2).textContent = alimento.descripcion;
        row.insertCell(3).textContent = alimento.precio;
        row.insertCell(4).textContent = alimento.categoria;

        const imgCell = row.insertCell(5);
        if (alimento.imagenUrl) {
            const img = document.createElement('img');
            img.src = alimento.imagenUrl;
            img.style.width = '100px'; // Ajusta el tamaño según sea necesario
            img.style.height = 'auto';
            imgCell.appendChild(img);
        } else {
            imgCell.textContent = 'No disponible';
        }

        
    });
}
