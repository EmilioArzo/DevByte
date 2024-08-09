document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buscarButton').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value.toLowerCase();
        
        // Cargar datos desde el archivo JSON
        fetch('js/jasonUsuario.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const usuario = data.find(user => user.nombre.toLowerCase().includes(nombre));
                if (usuario) {
                    document.getElementById('userName').textContent = usuario.nombre;
                    document.getElementById('userDescription').textContent = `ID: ${usuario.id} - Contraseña: ${usuario.contraseña}`;
                    document.getElementById('userInfo').style.display = 'block';
                    
                    // Redirigir con parámetros
                    const actBorrUrl = new URL('http://127.0.0.1:5500/Elzarape_DevByte_v2/web/13-act-borr-usuario.html', window.location.origin);
                    actBorrUrl.searchParams.set('id', usuario.id);
                    actBorrUrl.searchParams.set('nombre', usuario.nombre);
                    actBorrUrl.searchParams.set('contraseña', usuario.contraseña);
                    document.querySelector('.buttonActualizarBorrarUsuario').addEventListener('click', function() {
                        window.location.href = actBorrUrl.toString();
                    });
                } else {
                    alert('Usuario no encontrado');
                    document.getElementById('userInfo').style.display = 'none';
                }
            })
            .catch(error => console.error('Error cargando datos JSON:', error));
    });
});
