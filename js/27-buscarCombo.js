document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const messageContainer = document.getElementById('messageContainer');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('id').value.trim().toLowerCase();
        const alimento = document.getElementById('alimento').value.trim().toLowerCase();
        const bebida = document.getElementById('bebida').value.trim().toLowerCase();

        // Obtener los datos desde localStorage o desde el archivo JSON si no hay datos en localStorage
        let combos = JSON.parse(localStorage.getItem('combos')) || [];

        // Si no hay combos en localStorage, obtener del archivo JSON
        if (combos.length === 0) {
            fetch('js/jasonCombo.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok. Status: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    combos = data.combos;
                    localStorage.setItem('combos', JSON.stringify(combos));
                    searchCombos(combos, nombre, alimento, bebida); // Pasar los filtros
                })
                .catch(error => {
                    console.error('Error al obtener los datos del JSON:', error);
                    showMessage('Error al obtener los datos.');
                });
        } else {
            searchCombos(combos, nombre, alimento, bebida); // Pasar los filtros
        }
    });

    function searchCombos(combos, nombre, alimento, bebida) {
        // Filtrar los combos
        const filteredCombos = combos.filter(combo => {
            const matchNombre = nombre === '' || combo.name.toLowerCase().includes(nombre);
            const matchAlimento = alimento === '' || combo.foods.some(f => f.food.toLowerCase() === alimento);
            const matchBebida = bebida === '' || combo.drinks.some(d => d.drink.toLowerCase() === bebida);
            return matchNombre && matchAlimento && matchBebida;
        });

        // Mostrar resultados
        if (filteredCombos.length > 0) {
            let resultsHtml = '<h2>Resultados encontrados: </h2><ul>';
            
            filteredCombos.forEach(combo => {
                resultsHtml += `
                    <li>
                        <strong>Nombre:</strong> ${combo.name} <br>
                        <strong>Descripción:</strong> ${combo.description} <br>
                        <strong>Precio:</strong> ${combo.price} <br>
                        <strong>Alimentos:</strong> ${combo.foods.map(f => `${f.food} (${f.quantity})`).join(', ')} <br>
                        <strong>Bebidas:</strong> ${combo.drinks.map(d => `${d.drink} (${d.quantity})`).join(', ')} <br>
                        <img src="${combo.imageUrl}" alt="${combo.name}" style="max-width: 200px; max-height: 200px;">
                    </li>
                `;
            });
            resultsHtml += '</ul>';
            showMessage(resultsHtml);
        } else {
            showMessage('<p>No se encontraron resultados.</p>');
        }
    }

    function showMessage(messageHtml) {
        // Limpia el contenedor del mensaje y configura el botón de cierre
        messageContainer.innerHTML = messageHtml;
        const closeButton = document.createElement('button');
        closeButton.id = 'closeButton';
        closeButton.innerHTML = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.color = '#E73F0B';
        closeButton.style.fontSize = '30px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '1000';
        
        messageContainer.appendChild(closeButton);
        
        // Muestra el contenedor del mensaje
        messageContainer.style.display = 'block';
        
        // Oculta el mensaje automáticamente después de un tiempo
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 10000); // Ajusta el tiempo (en milisegundos) según sea necesario

        // Agrega el evento para el botón de cierre
        closeButton.addEventListener('click', function () {
            messageContainer.style.display = 'none';
        });
    }
});
