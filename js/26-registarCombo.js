let foods = [];
let drinks = [];
let combos = [];
let nextId = 1; // Valor inicial para el siguiente ID

// Función para cargar los combos desde el archivo JSON y localStorage
function loadCombos() {
    // Cargar combos desde localStorage
    const storedCombos = localStorage.getItem('combos');
    if (storedCombos) {
        combos = JSON.parse(storedCombos);
        nextId = combos.length > 0 ? Math.max(...combos.map(combo => parseInt(combo.id))) + 1 : 1;
    } else {
        // Si no hay combos en localStorage, cargar desde el archivo JSON
        fetch('js/jasonCombo.json')
            .then(response => response.json())
            .then(data => {
                combos = data.combos;
                nextId = combos.length > 0 ? Math.max(...combos.map(combo => parseInt(combo.id))) + 1 : 1;
                updateComboList();
                updateComboId(); // Actualiza el ID en el formulario
            })
            .catch(error => console.error('Error al cargar los combos:', error));
    }
    updateComboList();
    updateComboId(); // Actualiza el ID en el formulario
}

window.onload = function() {
    loadCombos(); // Cargar combos predefinidos al cargar la página
};

// Función para actualizar el campo de ID con el siguiente valor disponible
function updateComboId() {
    const comboIdField = document.getElementById('comboId');
    comboIdField.value = nextId; // Muestra el siguiente ID disponible
}

function addFood() {
    const foodSelect = document.getElementById('foodSelect');
    const foodQuantity = document.getElementById('foodQuantity');
    const food = foodSelect.value;
    const quantity = parseInt(foodQuantity.value);

    if (food && quantity) {
        const existingFood = foods.find(item => item.food === food);
        
        if (existingFood) {
            existingFood.quantity += quantity;
        } else {
            foods.push({ food, quantity });
        }
        
        updateFoodList();
        foodSelect.value = '';
        foodQuantity.value = '';
    } else {
        alert('Por favor selecciona un alimento y una cantidad.');
    }
}

function addDrink() {
    const drinkSelect = document.getElementById('drinkSelect');
    const drinkQuantity = document.getElementById('drinkQuantity');
    const drink = drinkSelect.value;
    const quantity = parseInt(drinkQuantity.value);

    if (drink && quantity) {
        const existingDrink = drinks.find(item => item.drink === drink);
        
        if (existingDrink) {
            existingDrink.quantity += quantity;
        } else {
            drinks.push({ drink, quantity });
        }
        
        updateDrinkList();
        drinkSelect.value = '';
        drinkQuantity.value = '';
    } else {
        alert('Por favor selecciona una bebida y una cantidad.');
    }
}

function updateFoodList() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';
    foods.forEach((item, index) => {
        foodList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${item.food} - Cantidad: ${item.quantity} <button class="btn btn-danger btn-sm" onclick="removeFood(${index})">Eliminar</button></li>`;
    });
}

function updateDrinkList() {
    const drinkList = document.getElementById('drinkList');
    drinkList.innerHTML = '';
    drinks.forEach((item, index) => {
        drinkList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${item.drink} - Cantidad: ${item.quantity} <button class="btn btn-danger btn-sm" onclick="removeDrink(${index})">Eliminar</button></li>`;
    });
}

function removeFood(index) {
    foods.splice(index, 1);
    updateFoodList();
}

function removeDrink(index) {
    drinks.splice(index, 1);
    updateDrinkList();
}

function registerCombo() {
    const comboId = document.getElementById('comboId').value;
    const comboName = document.getElementById('comboName').value;
    const comboDescription = document.getElementById('comboDescription').value;
    const comboPrice = document.getElementById('comboPrice').value;
    const comboImage = document.getElementById('comboImage').files[0];
    const imageUrl = comboImage ? URL.createObjectURL(comboImage) : '';

    if (comboName && comboDescription && comboPrice) {
        // Validación para asegurarse de que haya al menos un alimento o bebida
        if (foods.length === 0 && drinks.length === 0) {
            alert('Debes agregar al menos un alimento o bebida al combo.');
            return;
        }

        // Validación para asegurarse de que se haya seleccionado una imagen
        if (!comboImage) {
            alert('Debes agregar una imagen para el combo.');
            return;
        }

        const combo = {
            id: comboId,
            name: comboName,
            description: comboDescription,
            price: comboPrice,
            foods: [...foods],
            drinks: [...drinks],
            imageUrl
        };
        
        combos.push(combo);
        localStorage.setItem('combos', JSON.stringify(combos)); // Guardar combos en localStorage
        updateComboList();
        nextId++; // Incrementa el ID para el próximo combo
        updateComboId(); // Actualiza el ID en el formulario
        resetForm();
    } else {
        alert('Por favor completa todos los campos del formulario.');
    }
}

function updateComboList() {
    const comboList = document.getElementById('comboList');
    comboList.innerHTML = '';
    combos.forEach(combo => {
        comboList.innerHTML += `
            <tr>
                <td>${combo.id}</td>
                <td>${combo.name}</td>
                <td>${combo.description}</td>
                <td>${combo.price}</td>
                <td>${combo.foods.map(f => `${f.food} (${f.quantity})`).join(', ')}</td>
                <td>${combo.drinks.map(d => `${d.drink} (${d.quantity})`).join(', ')}</td>
                <td><img src="${combo.imageUrl}" alt="${combo.name}" style="max-width: 100px; max-height: 100px;"></td>
            </tr>
        `;
    });
}

function resetForm() {
    document.getElementById('comboName').value = '';
    document.getElementById('comboDescription').value = '';
    document.getElementById('comboPrice').value = '';
    document.getElementById('foodSelect').value = '';
    document.getElementById('foodQuantity').value = '';
    document.getElementById('drinkSelect').value = '';
    document.getElementById('drinkQuantity').value = '';
    document.getElementById('comboImage').value = '';
    document.getElementById('imagePreview').style.display = 'none';
    foods = [];
    drinks = [];
    updateFoodList();
    updateDrinkList();
}

