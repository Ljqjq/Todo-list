"use strict";

const todoList = document.querySelector(".todo-list");
const eventAddButton = document.querySelector(".todo-button-add");

var data = JSON.parse(localStorage.getItem("data")) || [];
//marking as done
todoList.addEventListener("click", (ev) => {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked"); 
  }
}, false);

//deleting event from list
function deleteEvent(ev) {
  const toDelete = ev.target.closest("li").innerText;
  const index = data.indexOf(toDelete);

  if (index > -1) {
    data.splice(index, 1);
  }

  ev.target.closest("li").remove();
  localStorage.setItem("data", JSON.stringify(data)); 
}

//adding event to list
function addNewEvent(input) {
  const inputValue = input;
  const inputText = document.createTextNode(inputValue);
  const newEvent = document.createElement("li");

  newEvent.classList.add("todo-event");
  newEvent.appendChild(inputText);

  const deleteButton = document.createElement("button");

  deleteButton.classList.add("todo-event-delete");
  deleteButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="#4d4d62"/>
        <path fill-rule="evenodd" clip-rule="evenodd" 
          d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 
          10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 
          10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 
          11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 
          5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
      </svg>`;

  newEvent.appendChild(deleteButton);

  deleteButton.addEventListener("click", deleteEvent);

  if (inputValue == "") {
    alert("You should do something, stupid lazy ass nigger!");
  } else {
    todoList.appendChild(newEvent);
  }

  document.getElementById("adder").value = "";
  
}

eventAddButton.addEventListener("click", () => {
  let input = document.getElementById("adder").value;
  addNewEvent(input);
  
  if (input == "") {
    return;
  }

  data.push(input);
  localStorage.setItem("data", JSON.stringify(data));
}
);

data.forEach(element => {
  addNewEvent(element);
});

