'use strict';

// Sukuriamas kintamasis kuriame bus talpinama informacija
let data = [
    { id: 1, name: "Milk", quan: "2l", cost: "2" },
    { id: 2, name: "Butter", quan: "200g", cost: "1.99" }
];


// Sukuriama funckija kuri įves informacija į "localStorage" ir sukurs naujus HTML elementus kad vaizduotu informacija
function readAll() {
    localStorage.setItem("object", JSON.stringify(data));
    const tableData = document.querySelector(".table-data");

    const object = localStorage.getItem('object');
    const objectData = JSON.parse(object);
    let elements = "";

    objectData.map(record => {
        elements += `
        <tr>
            <td>${record.name}</td>
            <td>${record.quan}</td>
            <td>${record.cost}$</td>
            <td>
                <label class="checkbox-container">
                    <input type="checkbox" class="checkbox">
                </label>
            </td>
            <td>
                <div class="dropdown">
                    <button onclick="dropdown(${record.id})" class="dropdown-btn"></button>
                    <div id="optionsDropdown${record.id}" class="dropdown-content">
                        <div class="edit-btn" onclick="edit(${record.id})">Edit</div>
                        <div class="delete-btn" onclick="deleteItem(${record.id})">Delete</div>
                    </div>
                </div>
            </td>
        </tr>`;
    });
    tableData.innerHTML = elements;
}


// Išskleidžiamojo meniu veikimo funkcija
function dropdown(buttonNumber) {
    const options = document.getElementById(`optionsDropdown${buttonNumber}`);
    options.classList.toggle("show");
}
// Uždaro išskleidžiamaji meniu jei vartotojas paspaudžia bet kurioje puslapio vietoje
window.addEventListener("click", (e) => {
    const dropdowns = document.querySelectorAll(".dropdown-content");

    dropdowns.forEach(dropdown => {
        if (!e.target.closest(".dropdown")) {
            dropdown.classList.remove("show");
        }
    });
});


// Paspaudus "Add New Item" mygtuka atskleižia naujo produkto įvestį
const newBtn = document.querySelector(".new-btn");
const inputForm = document.querySelector(".input-form");

newBtn.addEventListener("click", () => {
    newBtn.classList.add("hide");
    inputForm.classList.add("show");
});


// "Add New Item" mygtuko funckionalumas
function add() {
    const name = document.getElementById("input-item-name").value;
    const quan = document.getElementById("input-item-quan").value;
    const cost = document.getElementById("input-item-cost").value;

    const newObj = { id: data.length + 1, name, quan, cost };
    data.push(newObj);

    newBtn.classList.remove("hide");
    inputForm.classList.remove("show");

    readAll();
}


// Produkto pertvarkymo funkcija
const editForm = document.querySelector(".edit-form");

function edit(id) {
    newBtn.classList.add("hide");
    editForm.classList.add("show");

    const obj = data.find(rec => rec.id === id);
    document.getElementById("edit-item-id").value = obj.id;
    document.getElementById("edit-item-name").value = obj.name;
    document.getElementById("edit-item-quan").value = obj.quan;
    document.getElementById("edit-item-cost").value = obj.cost;
}


// Funkcija atgaunanti "id" naudojant "name" elementą
function idByName(name) {
    const obj = data.find(rec => rec.name === name);
    return obj ? obj.id : null;
}


// Pertvarkymu įvesties funkcija
function confirmEdit() {
    const id = parseInt(document.getElementById("edit-item-id").value, 10);
    const name = document.getElementById("edit-item-name").value;
    const quan = document.getElementById("edit-item-quan").value;
    const cost = document.getElementById("edit-item-cost").value;

    const index = data.findIndex(rec => rec.id === id);
    if (index !== -1) {
        data[index] = { id, name, quan, cost };
    }

    newBtn.classList.remove("hide");
    editForm.classList.remove("show");

    readAll();
}


// Produkto ištrinimo iš sarašo funkcija
function deleteItem(id) {
    data = data.filter(record => record.id !== id);
    readAll();
}


// Žymiamųjų langelių padeties išsaugojimo į "localstorage"

const checkboxes = document.querySelectorAll(".checkbox");

function saveCheckboxStates(){
    checkboxes.forEach((checkboxes) => {
        localStorage.setItem(checkbox.id, checkbox.checked);
    })
}

// Žymiamųjų langelių padeties išreiškimas
function loadCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const savedState = localStorage.getItem(checkbox.id);
      if (savedState !== null) {
        checkbox.checked = savedState === 'true';
      }
    });
  }
  
  // Attach event listener to the checkboxes to save their states
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', saveCheckboxStates);
  });
  
  // Load checkbox states on page load
  document.addEventListener('DOMContentLoaded', loadCheckboxStates);