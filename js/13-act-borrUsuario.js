document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const nombre = urlParams.get('nombre');
    const contraseña = urlParams.get('contraseña');

    if (id && nombre && contraseña) {
        document.getElementById('id').value = id;
        document.getElementById('nombre').value = nombre;
        document.getElementById('contraseña').value = contraseña;
    }

    document.getElementById('updateButton').addEventListener('click', function() {
        // Lógica para actualizar el usuario
        alert('Usuario actualizado');
    });

    document.getElementById('deleteButton').addEventListener('click', function() {
        // Lógica para borrar el usuario
        alert('Usuario borrado');
    });
});
