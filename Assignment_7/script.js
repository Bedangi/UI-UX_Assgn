function addTask() {
    let title = document.getElementById("title").value.trim();
    let desc = document.getElementById("desc").value.trim();

    if (title === "" || desc === "") {
        alert("Please enter both title and description!");
        return;
    }

    // Create task container
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    // Task title & description
    let taskTitle = document.createElement("h3");
    taskTitle.innerText = title;

    let taskDesc = document.createElement("p");
    taskDesc.innerText = desc;

    // Mark Completed button
    let completeBtn = document.createElement("button");
    completeBtn.innerText = "Mark as Completed";
    completeBtn.onclick = function () {
        taskDiv.classList.toggle("completed");
        completeBtn.innerText =
            completeBtn.innerText === "Mark as Completed"
                ? "Mark as Incomplete"
                : "Mark as Completed";
    };


    // Edit button
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = function () {
        if (editBtn.innerText === "Edit") {
            // Switch to edit mode
            let titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.value = taskTitle.innerText;

            let descInput = document.createElement("textarea");
            descInput.value = taskDesc.innerText;

            taskDiv.replaceChild(titleInput, taskTitle);
            taskDiv.replaceChild(descInput, taskDesc);

            taskTitle = titleInput;
            taskDesc = descInput;

            editBtn.innerText = "Save";
        } else {
            // Save mode
            let newTitle = taskTitle.value;
            let newDesc = taskDesc.value;

            let titleEl = document.createElement("h3");
            titleEl.innerText = newTitle;

            let descEl = document.createElement("p");
            descEl.innerText = newDesc;

            taskDiv.replaceChild(titleEl, taskTitle);
            taskDiv.replaceChild(descEl, taskDesc);

            taskTitle = titleEl;
            taskDesc = descEl;

            editBtn.innerText = "Edit";
        }
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function () {
        taskDiv.remove();
    };

    // Append elements
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDesc);
    taskDiv.appendChild(completeBtn);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(taskDiv);

    // Clear inputs
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
}
