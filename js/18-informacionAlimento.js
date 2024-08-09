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
    const alimentos = JSON.parse(localStorage.getItem('alimentos')) || [];

    // Buscar el alimento en localStorage
    const alimento = alimentos.find(alimento => {
        const matchesNombre = nombre ? alimento.nombre.toLowerCase().includes(nombre.toLowerCase()) : true;
        const matchesPrecio = precio ? alimento.precio.toLowerCase().includes(precio.toLowerCase()) : true;
        const matchesCategoria = categoria ? alimento.categoria.toLowerCase() === categoria.toLowerCase() : true;
        return matchesNombre && matchesPrecio && matchesCategoria;
    });

    console.log("Alimento encontrado:", alimento);

    if (alimento) {
        document.getElementById('nombreAlimento').textContent = alimento.nombre;
        document.getElementById('descripcionAlimento').innerHTML = `
            <div><strong>ID:</strong> ${alimento.id}</div>
            <div><strong>Descripción:</strong> ${alimento.descripcion}</div>
            <div><strong>Precio:</strong> ${alimento.precio}</div>
            <div><strong>Categoría:</strong> ${alimento.categoria}</div>
        `;

        const imagenAlimento = document.getElementById('imagenAlimento');
        if (alimento.imagen) {
            imagenAlimento.src = alimento.imagen;
        } else {
            imagenAlimento.src = 'imagenes/no-imagen.png'; // Imagen por defecto si no hay imagen disponible
        }
    } else {
        alert('Alimento no encontrado');
    }
});
