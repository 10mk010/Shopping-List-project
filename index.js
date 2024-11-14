'use strict';

const itemContainer = document.querySelector('.item-container');
const addBtn = document.querySelector('.add-btn');

let data = [
    {id: 1, name: "Milk", quan: "2l", cost: "2$"},
    {id: 2, name: "Butter", quan: "200g", cost: "1.99$"}
];

function readAll() {
    localStorage.setItem("object", JSON.stringify(data));
    var tableData = document.querySelector(".table-data");

    var object = localStorage.getItem('object');
    var objectData = JSON.parse(object);
    var elements = "";

    objectData.map(record => (
        elements += `<tr>
            <td>${record.name}</td>
            <td>${record.quan}</td>
            <td>${record.cost}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>`
    ))

    tableData.innerHTML = elements;
}