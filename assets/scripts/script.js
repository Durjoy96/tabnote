const browserTitle = document.querySelector("title");
const inputTitle = document.querySelector(".note-title");
const inputDescription = document.querySelector(".note-description");
const taskList = document.getElementById("taskList");
const toDoContainer = document.querySelector(".to-do-container");
const toDoListBtn = document.querySelector(".to-do-list-btn");
const textNoteBtn = document.querySelector(".text-note-btn"); 

// Replace the document title with the inputted title
inputTitle.addEventListener("input", () => {
    let inputValue = inputTitle.value;
    let words = inputValue.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (words[i]) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
    }
    let capitalize = words.join(" ");
    browserTitle.innerText = capitalize;
    if (inputTitle.value === "") {
        browserTitle.innerText = "TabNote - Turn Every Browser Tab into a Simple Note";
    };
});

// Default title, if there is no title inputted
function defaultTitle() {
    if (inputTitle.value) {
        document.title = inputTitle.value;
    } else {
        document.title = "Note - " + getNoteNumber();
        inputTitle.value = "Note - " + getNoteNumber();
    };
};

// Default title function execute
inputDescription.addEventListener("input", () => {
    defaultTitle();
});

// Function to get the current note number from the URL
function getNoteNumber() {
    let params = new URLSearchParams(window.location.search);
    let noteNumber = params.get('note');
    return noteNumber ? parseInt(noteNumber) : 1;
}

// Function to set the title based on the note number
function setTitle(noteNumber) {
    document.title = 'Note - ' + noteNumber;
}

// Generate new tab and link
function getNewTab() {
    let currentNoteNumber = getNoteNumber();

    let newNoteNumber = currentNoteNumber + 1;

    let newUrl = window.location.origin + window.location.pathname + '?note=' + newNoteNumber;

    let newWindow = window.open(newUrl, '_blank');
}

// Open new tab note button
document.getElementById('newNoteBtn').addEventListener('click', function () {
    getNewTab()
});

// Set the initial title based on the URL when the page loads
setTitle(getNoteNumber());

// Add to-do tasks dynamically
function addTask(taskTextValue = '', isChecked = false) {
    const taskItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = function () {
        if (this.checked) {
            taskItem.classList.add("completed");
        } else {
            taskItem.classList.remove("completed");
        }
    };

    const taskText = document.createElement("input");
    taskText.type = "text";
    taskText.addEventListener("input", () => {
        defaultTitle();
    });

    const taskDelete = document.createElement("button");
    taskDelete.classList.add("delete");
    taskDelete.innerHTML = `<span class="tooltip right"><span>Shift</span> + <span>D</span></span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=" #dc3545"><path d="M292.31-140q-29.92 0-51.12-21.19Q220-182.39 220-212.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-720ZM376.16-280h59.99v-360h-59.99v360Zm147.69 0h59.99v-360h-59.99v360ZM280-720v520-520Z"/></svg>`;
    taskDelete.addEventListener("click", () => {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDelete);
    taskList.appendChild(taskItem);
};

// Default title function execute
document.getElementById("addTaskBtn").addEventListener("click", () => {
    addTask();
});

// To-do list button
let isTaskAdded = false;
toDoListBtn.addEventListener("click", () => {
    document.querySelector("textarea").style.display = "none";
    toDoContainer.style.display = "block";
    toDoListBtn.style.display = "none";
    textNoteBtn.style.display = "inline-block";

    if (isTaskAdded === false) {
        addTask();
        isTaskAdded = true;
    }
});

// Text note button
textNoteBtn.addEventListener("click", () => {
    document.querySelector("textarea").style.display = "block";
    toDoContainer.style.display = "none";
    toDoListBtn.style.display = "inline-block";
    textNoteBtn.style.display = "none";
});

// New tab note shortcut
document.addEventListener("keydown", function (e) {
    if (e.altKey && e.key === "n") {
        getNewTab();
    };
});

// Add new to-do task shortcut
document.addEventListener("keydown", function (e) {
    if (e.altKey && e.key === "a" && toDoListBtn.style.display === "none") {
        addTask();
    }
});

// Delete a to-do task item shortcut 
document.addEventListener("keydown", function (e) {
    if (e.shiftKey && e.key === "D" && toDoListBtn.style.display === "none") {
        taskList.removeChild(taskList.lastElementChild);
    };
});
