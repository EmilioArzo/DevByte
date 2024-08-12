document.addEventListener('DOMContentLoaded', () => {
    loadCombos();
});

function loadCombos() {
    const combos = JSON.parse(localStorage.getItem('combos')) || [];
    const comboList = document.getElementById('comboList');
    comboList.innerHTML = '';

    combos.forEach(combo => {
        const row = document.createElement('tr');
        row.dataset.id = combo.id;  // Guarda el ID del combo en el dataset
        row.innerHTML = `
            <td>${combo.id}</td>
            <td>${combo.name}</td>
            <td>${combo.description}</td>
            <td>${combo.price}</td>
            <td>${combo.foods.map(food => `${food.food} (x${food.quantity})`).join(', ')}</td>
            <td>${combo.drinks.map(drink => `${drink.drink} (x${drink.quantity})`).join(', ')}</td>
            <td><img src="${combo.imageUrl}" alt="Imagen" style="width: 100px;"></td>
        `;
        row.addEventListener('click', () => populateForm(combo.id));
        comboList.appendChild(row);
    });
}

function populateForm(id) {
    const combos = JSON.parse(localStorage.getItem('combos')) || [];
    const combo = combos.find(c => c.id === id);

    if (combo) {
        document.getElementById('comboId').value = combo.id;
        document.getElementById('comboName').value = combo.name;
        document.getElementById('comboDescription').value = combo.description;
        document.getElementById('comboPrice').value = combo.price;

        // Set image preview
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = combo.imageUrl;
        imagePreview.style.display = 'block';

        // Populate food list
        const foodList = document.getElementById('foodList');
        foodList.innerHTML = '';
        combo.foods.forEach((food, index) => {
            foodList.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${food.food} (x${food.quantity})
                    <div>
                        <button class="btn btn-warning btn-sm" onclick="decreaseFood(${index})">Disminuir</button>
                        <button class="btn btn-success btn-sm ml-2" onclick="increaseFood(${index})">Aumentar</button>
                        <button class="btn btn-danger btn-sm ml-2" onclick="removeFood(${index})">Eliminar</button>
                    </div>
                </li>
            `;
        });

        // Populate drink list
        const drinkList = document.getElementById('drinkList');
        drinkList.innerHTML = '';
        combo.drinks.forEach((drink, index) => {
            drinkList.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${drink.drink} (x${drink.quantity})
                    <div>
                        <button class="btn btn-warning btn-sm" onclick="decreaseDrink(${index})">Disminuir</button>
                        <button class="btn btn-success btn-sm ml-2" onclick="increaseDrink(${index})">Aumentar</button>
                        <button class="btn btn-danger btn-sm ml-2" onclick="removeDrink(${index})">Eliminar</button>
                    </div>
                </li>
            `;
        });
    }
}

function addFood() {
    const foodSelect = document.getElementById('foodSelect');
    const foodName = foodSelect.options[foodSelect.selectedIndex].text;
    const quantity = parseInt(document.getElementById('foodQuantity').value, 10);
    const comboId = document.getElementById('comboId').value;

    if (foodName && quantity) {
        const combos = JSON.parse(localStorage.getItem('combos')) || [];
        const combo = combos.find(c => c.id === comboId);

        if (combo) {
            let food = combo.foods.find(f => f.food === foodName);
            if (food) {
                food.quantity += quantity;
            } else {
                combo.foods.push({ food: foodName, quantity: quantity });
            }
            localStorage.setItem('combos', JSON.stringify(combos));
            populateForm(comboId); // Refrescar el formulario para reflejar los cambios
        }
    }

    document.getElementById('foodSelect').value = '';
    document.getElementById('foodQuantity').value = '';
}

function addDrink() {
    const drinkSelect = document.getElementById('drinkSelect');
    const drinkName = drinkSelect.options[drinkSelect.selectedIndex].text;
    const quantity = parseInt(document.getElementById('drinkQuantity').value, 10);
    const comboId = document.getElementById('comboId').value;

    if (drinkName && quantity) {
        const combos = JSON.parse(localStorage.getItem('combos')) || [];
        const combo = combos.find(c => c.id === comboId);

        if (combo) {
            let drink = combo.drinks.find(d => d.drink === drinkName);
            if (drink) {
                drink.quantity += quantity;
            } else {
                combo.drinks.push({ drink: drinkName, quantity: quantity });
            }
            localStorage.setItem('combos', JSON.stringify(combos));
            populateForm(comboId); // Refrescar el formulario para reflejar los cambios
        }
    }

    document.getElementById('drinkSelect').value = '';
    document.getElementById('drinkQuantity').value = '';
}

function removeFood(index) {
    const comboId = document.getElementById('comboId').value;
    let combos = JSON.parse(localStorage.getItem('combos')) || [];
    let combo = combos.find(c => c.id === comboId);

    if (combo) {
        combo.foods.splice(index, 1);
        if (combo.foods.length === 0) {
            combo.foods = [];
        }
        localStorage.setItem('combos', JSON.stringify(combos));
        loadCombos();
        populateForm(comboId); // Refrescar el formulario para reflejar los cambios
    }
}

function removeDrink(index) {
    const comboId = document.getElementById('comboId').value;
    let combos = JSON.parse(localStorage.getItem('combos')) || [];
    let combo = combos.find(c => c.id === comboId);

    if (combo) {
        combo.drinks.splice(index, 1);
        if (combo.drinks.length === 0) {
            combo.drinks = [];
        }
        localStorage.setItem('combos', JSON.stringify(combos));
        loadCombos();
        populateForm(comboId); // Refrescar el formulario para reflejar los cambios
    }
}

function decreaseFood(index) {
    const comboId = document.getElementById('comboId').value;
    let combos = JSON.parse(localStorage.getItem('combos')) || [];
    let combo = combos.find(c => c.id === comboId);

    if (combo) {
        let food = combo.foods[index];
        if (food.quantity > 1) {
            food.quantity -= 1;
            localStorage.setItem('combos', JSON.stringify(combos));
            loadCombos();
            populateForm(comboId); // Refrescar el formulario para reflejar los cambios
        } else {
            removeFood(index); // Eliminar si la cantidad es 1
        }
    }
}

function increaseFood(index) {
    const comboId = document.getElementById('comboId').value;
    let combos = JSON.parse(localStorage.getItem('combos')) || [];
    let combo = combos.find(c => c.id === comboId);

    if (combo) {
        combo.foods[index].quantity += 1;
        localStorage.setItem('combos', JSON.stringify(combos));
        loadCombos();
        populateForm(comboId); // Refrescar el formulario para reflejar los cambios
    }
}

function decreaseDrink(index) {
    const comboId = document.getElementById('comboId').value;
    let combos = JSON.parse(localStorage.getItem('combos')) || [];
    let combo = combos.find(c => c.id === comboId);

    if (combo) {
        let drink = combo.drinks[index];
        if (drink.quantity > 1) {
            drink.quantity -= 1;
            localStorage.setItem('combos', JSON.stringify(combos));
            loadCombos();
            populateForm(comboId); // Refrescar el formulario para reflejar los cambios
        } else {
            removeDrink(index); // Eliminar si la cantidad es 1
        }
    }
}

function increaseDrink(index) {
    const comboId = document.getElementById('comboId').value;
    let combos = JSON.parse(localStorage.getItem('combos')) || [];
    let combo = combos.find(c => c.id === comboId);

    if (combo) {
        combo.drinks[index].quantity += 1;
        localStorage.setItem('combos', JSON.stringify(combos));
        loadCombos();
        populateForm(comboId); // Refrescar el formulario para reflejar los cambios
    }
}

function updateCombo() {
    const id = document.getElementById('comboId').value;
    const name = document.getElementById('comboName').value;
    const description = document.getElementById('comboDescription').value;
    const price = parseFloat(document.getElementById('comboPrice').value);
    const foods = Array.from(document.getElementById('foodList').getElementsByTagName('li')).map(li => {
        const parts = li.textContent.split(' (x');
        const foodName = parts[0].trim();
        const quantity = parseInt(parts[1].replace(')', '').trim(), 10);
        return { food: foodName, quantity: quantity };
    });
    const drinks = Array.from(document.getElementById('drinkList').getElementsByTagName('li')).map(li => {
        const parts = li.textContent.split(' (x');
        const drinkName = parts[0].trim();
        const quantity = parseInt(parts[1].replace(')', '').trim(), 10);
        return { drink: drinkName, quantity: quantity };
    });
    const image = document.getElementById('imagePreview').src;

    if (!id || !name || !description || isNaN(price)) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    let combos = JSON.parse(localStorage.getItem('combos')) || [];
    const comboIndex = combos.findIndex(c => c.id === id);

    if (comboIndex > -1) {
        combos[comboIndex] = { id, name, description, price, foods, drinks, imageUrl: image };
        localStorage.setItem('combos', JSON.stringify(combos));
        loadCombos();
        clearForm();
        alert('Combo actualizado correctamente.');
    } else {
        alert('Combo no encontrado.');
    }
}

function deleteCombo() {
    const id = document.getElementById('comboId').value;

    if (!id) {
        alert('Selecciona un combo para eliminar.');
        return;
    }

    let combos = JSON.parse(localStorage.getItem('combos')) || [];
    combos = combos.filter(c => c.id !== id);

    localStorage.setItem('combos', JSON.stringify(combos));
    loadCombos();
    clearForm();
    alert('Combo eliminado correctamente.');
}

function clearForm() {
    document.getElementById('comboId').value = '';
    document.getElementById('comboName').value = '';
    document.getElementById('comboDescription').value = '';
    document.getElementById('comboPrice').value = '';
    document.getElementById('foodList').innerHTML = '';
    document.getElementById('drinkList').innerHTML = '';
    document.getElementById('imagePreview').src = '';
    document.getElementById('imagePreview').style.display = 'none';
}

function previewImage() {
    const file = document.getElementById('comboImage').files[0];
    const preview = document.getElementById('imagePreview');
    const reader = new FileReader();

    reader.onloadend = function() {
        preview.src = reader.result;
        preview.style.display = 'block';
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
        preview.style.display = 'none';
    }
}
