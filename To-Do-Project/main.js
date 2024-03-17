/*
task 1) use sweet Alert if input is empty-------[]
task 2) check if task is exist before-----------[finished]
task 3) delete All tasks------------------------[finished]
task 4) finish all tasks------------------------[finished]
task 5) add tasks to local storage--------------[finished]
*/

// setting up variables
let theInput = document.querySelector(".add-task input"),
  addButton = document.querySelector(".add-task .plus"),
  tasksContainer = document.querySelector(".tasks-content"),
  noTasksMessage = document.querySelector(".tasks-content .no-tasks"),
  tasksCount = document.querySelector(".task-stats .tasks-count span"),
  tasksCompleted = document.querySelector(".task-stats .tasks-completed span");

//foucs ON Input Field
window.onload = () => {
  theInput.focus();
  getTasksFromLocalStorage();
  claculateTasks();
};

// Add Task

addButton.onclick = () => {
  if (
    theInput.value === "" ||
    theInput.value === " " ||
    theInput.value === "  " ||
    theInput.value === "   " ||
    theInput.value === "    " ||
    theInput.value === "     " ||
    theInput.value === "      " ||
    theInput.value === "       " ||
    theInput.value === "        " ||
    theInput.value === "          "
  ) {
    console.log("NO VALUE");
  } else {
    console.log(theInput.value);
    // check local Storage
    if (window.localStorage.getItem(theInput.value)) {
      console.log("Items already exest");
    } else {
      window.localStorage.setItem(theInput.value, theInput.value);
      //remove tasks message
      noTasksMessage.remove();

      //create mainSpan element
      let mainSpan = document.createElement("span");
      //create delete button
      let deleteButton = document.createElement("span");
      //add text to span
      let spanText = document.createElement("p");
      spanText.appendChild(document.createTextNode(theInput.value));
      mainSpan.appendChild(spanText);
      //add text to delete button
      let delText = document.createTextNode("Delete");
      deleteButton.appendChild(delText);
      //add class to mainSpan and delete button
      mainSpan.className = "tasks-box";
      deleteButton.className = "delete";

      //add delete button to main span
      mainSpan.appendChild(deleteButton);
      //ad task to container
      tasksContainer.appendChild(mainSpan);

      // reset input text input
      theInput.value = "";
      theInput.focus();

      // console.log(tasksList);
      claculateTasks();
    }
  }
};

// Make Delete Button Clickable

document.addEventListener("click", function (e) {
  //Delete task
  if (e.target.className === "delete") {
    console.log(document.querySelector(".tasks-content>span>p").textContent);

    if (
      window.localStorage.getItem(
        document.querySelector(".tasks-content>span>p").textContent
      )
    ) {
      window.localStorage.removeItem(
        document.querySelector(".tasks-content>span>p").textContent
      );
      e.target.parentNode.remove();
    }

    if (tasksContainer.childElementCount === 0) {
      tasksContainer.appendChild(noTasksMessage);
    }
    claculateTasks();
  }
  //Finish task
  if (e.target.classList.contains("tasks-box")) {
    // toggle (like switch on/off) class finished
    e.target.classList.toggle("finished");
    claculateTasks();
  }
});

// function to Claculate Tasks
function claculateTasks() {
  //calculate all tasks
  tasksCount.innerHTML = document.querySelectorAll(".tasks-box").length;

  //calculate all finished tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

// Delete all tasks
document.querySelector(".delete-all").onclick = () => {
  deleteAll();
  claculateTasks();
  window.localStorage.clear();
};
// finsh All tasks
document.querySelector(".finish-all").onclick = () => {
  finishAll();
  claculateTasks();
};

// let tasksList = Array.from(document.querySelectorAll(".tasks-box"));

// Delete all tasks
function deleteAll() {
  document.querySelectorAll(".tasks-box").forEach((e) => {
    e.remove();
  });
  if (tasksContainer.childElementCount === 0) {
    tasksContainer.appendChild(noTasksMessage);
  }
}

// finsh All tasks
function finishAll() {
  document.querySelectorAll(".tasks-box").forEach((e) => {
    e.classList.toggle("finished");
  });
}

// // get paginatin list Items
// let paginationListItems = Array.from(
//   document.querySelectorAll(".pagination-ul li")
// );

// // Change Current Slide by Bullites click
// paginationListItems.forEach((e, index) => {
//   e.onclick = () => {
//     curentSlide = index + 1;
//     checker();
//   };
// });

//Function Check Item in Local Storage and delete item
function deleteLocalStorageItem() {
  if (window.localStorage.getItem(theInput.value)) {
    console.log("check Items Found");
    window.localStorage.removeItem("");
  } else {
    console.log("check Items Not Found");
    window.localStorage.setItem(theInput.value, theInput.value);
  }
}

function getTasksFromLocalStorage() {
  if (window.localStorage.length === 0) {
    tasksContainer.appendChild(noTasksMessage);
  } else {
    //remove tasks message
    noTasksMessage.remove();
    for (let i = 0; i < window.localStorage.length; i++) {
      createTasksEliments(i);
    }
  }
}

//create element from local storage
function createTasksEliments(index) {
  //create mainSpan element
  let mainSpan = document.createElement("span");
  //create delete button
  let deleteButton = document.createElement("span");
  //add text to span
  let spanText = document.createElement("p");
  spanText.appendChild(document.createTextNode(window.localStorage.key(index)));
  mainSpan.appendChild(spanText);
  //add text to delete button
  let delText = document.createTextNode("Delete");
  deleteButton.appendChild(delText);
  //add class to mainSpan and delete button
  mainSpan.className = "tasks-box";
  deleteButton.className = "delete";

  //add delete button to main span
  mainSpan.appendChild(deleteButton);
  //ad task to container
  tasksContainer.appendChild(mainSpan);
}
