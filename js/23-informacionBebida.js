document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    const precio = urlParams.get('precio');
    const categoria = urlParams.get('categoria');
    
    console.log("Parámetros URL:");
    console.log("Nombre:", nombre);
    console.log("Precio:", precio);
    console.log("Categoría:", categoria);

    // Cargar datos desde localStorage
    const bebidas = JSON.parse(localStorage.getItem('bebidas')) || [];

    // Buscar la bebida en localStorage
    const bebida = bebidas.find(bebida => {
        const matchesNombre = nombre ? bebida.nombre.toLowerCase().includes(nombre.toLowerCase()) : true;
        const matchesPrecio = precio ? bebida.precio.toLowerCase().includes(precio.toLowerCase()) : true;
        const matchesCategoria = categoria ? bebida.categoria.toLowerCase() === categoria.toLowerCase() : true;
        return matchesNombre && matchesPrecio && matchesCategoria;
    });

    console.log("Bebida encontrada:", bebida);

    if (bebida) {
        document.getElementById('nombreBebida').textContent = bebida.nombre;
        document.getElementById('descripcionBebida').innerHTML = `
            <div><strong>ID:</strong> ${bebida.id}</div>
            <div><strong>Descripción:</strong> ${bebida.descripcion}</div>
            <div><strong>Precio:</strong> ${bebida.precio}</div>
            <div><strong>Categoría:</strong> ${bebida.categoria}</div>
        `;

        const imagenBebida = document.getElementById('imagenBebida');
        if (bebida.imagen) {
            imagenBebida.src = bebida.imagen;
        } else {
            imagenBebida.src = 'imagenes/no-imagen.png'; // Imagen por defecto si no hay imagen disponible
        }
    } else {
        alert('Bebida no encontrada');
    }
});
