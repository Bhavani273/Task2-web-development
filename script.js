

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = [];



addTaskBtn.addEventListener("click", addTask);


function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
}



function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");

        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }


        
        const completeButton = document.createElement("button");

        completeButton.textContent =
            task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function() {

            tasks[index].completed =
                !tasks[index].completed;

            displayTasks();
        });


        
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            displayTasks();
        });


        const buttons = document.createElement("div");

        buttons.appendChild(completeButton);
        buttons.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(buttons);

        taskList.appendChild(li);
    });


    updateDashboard();
}


function updateDashboard() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending = total - completed;

    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;
}



const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const messageError =
        document.getElementById("messageError");

    const successMessage =
        document.getElementById("successMessage");


    
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";


    let valid = true;



    if (name === "") {

        nameError.textContent =
            "Name is required.";

        valid = false;
    }


    if (email === "") {

        emailError.textContent =
            "Email is required.";

        valid = false;

    } else if (!validateEmail(email)) {

        emailError.textContent =
            "Enter a valid email address.";

        valid = false;
    }


    
    if (message === "") {

        messageError.textContent =
            "Message is required.";

        valid = false;
    }


    
    if (valid) {

        successMessage.textContent =
            "Message sent successfully!";

        contactForm.reset();
    }

});


function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}
