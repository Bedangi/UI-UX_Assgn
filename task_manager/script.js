const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
  const titleInput = document.getElementById("taskTitle");
  const descInput = document.getElementById("taskDescription");

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title || !description) return;

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const taskTitle = document.createElement("h3");
  taskTitle.textContent = title;

  const taskDesc = document.createElement("p");
  taskDesc.textContent = description;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Mark as Completed";
  completeBtn.classList.add("complete-btn");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);

  taskDiv.appendChild(taskTitle);
  taskDiv.appendChild(taskDesc);
  taskDiv.appendChild(buttonContainer);
  taskList.appendChild(taskDiv);

  titleInput.value = "";
  descInput.value = "";

  completeBtn.addEventListener("click", () => {
    taskDiv.classList.toggle("completed");

    if (taskDiv.classList.contains("completed")) {
      completeBtn.textContent = "Mark as Incomplete";
    } else {
      completeBtn.textContent = "Mark as Completed";
    }
  });

  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Edit") {
      const titleEdit = document.createElement("input");
      titleEdit.value = taskTitle.textContent;

      const descEdit = document.createElement("textarea");
      descEdit.value = taskDesc.textContent;

      taskDiv.replaceChild(titleEdit, taskTitle);
      taskDiv.replaceChild(descEdit, taskDesc);

      editBtn.textContent = "Save";

      editBtn.addEventListener("click", () => {
        taskTitle.textContent = titleEdit.value;
        taskDesc.textContent = descEdit.value;

        taskDiv.replaceChild(taskTitle, titleEdit);
        taskDiv.replaceChild(taskDesc, descEdit);

        editBtn.textContent = "Edit";
      }, { once: true });
    }
  });

  deleteBtn.addEventListener("click", () => {
    taskDiv.remove();
  });
});
