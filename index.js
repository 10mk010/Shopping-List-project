'use strict';


let data = [
    { id: 1, name: "Milk", quan: "2l", cost: "2", checkbox: true },
    { id: 2, name: "Butter", quan: "200g", cost: "1.99", checkbox: true }
];


function readAll() {
    localStorage.setItem("object", JSON.stringify(data)); 

    const tableData = document.querySelector(".table-data");
    const storedData = localStorage.getItem("object");
    const objectData = storedData ? JSON.parse(storedData) : [];

    let elements = objectData.map(record => `
        <tr>
            <td>${record.name}</td>
            <td>${record.quan}</td>
            <td>${record.cost}$</td>
            <td>
                <label class="checkbox-container">
                    <input type="checkbox" class="checkbox" data-id="${record.id}" ${record.checkbox ? "checked" : ""}>
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
        </tr>
    `).join("");

    tableData.innerHTML = elements;

    
    document.querySelectorAll(".checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", checkboxChange);
    });
}


function checkboxChange(e) {
    const checkbox = e.target;
    const id = parseInt(checkbox.dataset.id, 10);
    const checked = checkbox.checked;

    const index = data.findIndex(record => record.id === id);
    if (index !== -1) {
        data[index].checkbox = checked; 
    }

    localStorage.setItem("object", JSON.stringify(data)); 
}


function dropdown(buttonNumber) {
    const options = document.getElementById(`optionsDropdown${buttonNumber}`);
    options.classList.toggle("show");
}


window.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-content").forEach(dropdown => {
            dropdown.classList.remove("show");
        });
    }
});


const newBtn = document.querySelector(".new-btn");
const inputForm = document.querySelector(".input-form");

newBtn.addEventListener("click", () => {
    newBtn.classList.add("hide");
    inputForm.classList.add("show");
});


function add() {
    const name = document.getElementById("input-item-name").value.trim();
    const quan = document.getElementById("input-item-quan").value.trim();
    const cost = document.getElementById("input-item-cost").value.trim();


    if (!name || !quan || !cost || isNaN(parseFloat(cost))) {
        alert("Please enter valid item details.");
        return;
    }

    const newObj = { id: data.length + 1, name, quan, cost, checkbox: false };
    data.push(newObj);

    newBtn.classList.remove("hide");
    inputForm.classList.remove("show");

    readAll(); 
}


const editForm = document.querySelector(".edit-form");

function edit(id) {
    const obj = data.find(rec => rec.id === id);
    if (!obj) return;

    newBtn.classList.add("hide");
    editForm.classList.add("show");


    document.getElementById("edit-item-id").value = obj.id;
    document.getElementById("edit-item-name").value = obj.name;
    document.getElementById("edit-item-quan").value = obj.quan;
    document.getElementById("edit-item-cost").value = obj.cost;
}

function confirmEdit() {
    const id = parseInt(document.getElementById("edit-item-id").value, 10);
    const name = document.getElementById("edit-item-name").value.trim();
    const quan = document.getElementById("edit-item-quan").value.trim();
    const cost = document.getElementById("edit-item-cost").value.trim();

    if (!name || !quan || !cost || isNaN(parseFloat(cost))) {
        alert("Please enter valid item details.");
        return;
    }

    const index = data.findIndex(rec => rec.id === id);
    if (index !== -1) {
        data[index] = { id, name, quan, cost, checkbox: data[index].checkbox };
    }

    newBtn.classList.remove("hide");
    editForm.classList.remove("show");

    readAll();
}

function deleteItem(id) {
    data = data.filter(record => record.id !== id);
    readAll(); 
}

document.addEventListener("DOMContentLoaded", () => {
    readAll();
});
