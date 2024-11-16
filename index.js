'use strict';
console.log(document.querySelector(".item-container"))
const itemContainer = document.querySelector('.item-container');
const addBtn = document.querySelector('.add-btn');

let data = [
    {id: 1, name: "Milk", quan: "2l", cost: "2$"},
];

function readAll() {
    localStorage.setItem("object", JSON.stringify(data));
    var tableData = document.querySelector(".table-data");

    var object = localStorage.getItem('object');
    var objectData = JSON.parse(object);
    var elements = "";

    objectData.map(record => (
        elements += `
        <tr>
            <td>${record.name}</td>
            <td>${record.quan}</td>
            <td>${record.cost}</td>
            <td>
                <label class="checkbox-container">
                <input type="checkbox" class="checkbox">
                <label>
            </td>
            <td>
                <div class="dropdown">
                    <div class="dropdown-btn"></div>
                    <div id="optionsDropdown" class="dropdown-content">
                        <div class="edit-btn">Edit</div>
                        <div class="delete-btn">Delete</div>
                    </div>
                </div>
            </td>
        </tr>`
    ))
    tableData.innerHTML = elements;
    
}
 
const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownBtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
})