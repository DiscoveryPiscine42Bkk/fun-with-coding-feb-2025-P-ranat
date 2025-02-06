const newbtn = document.getElementById("newbtn")
const taskList = document.getElementById("ft_list")

newbtn.addEventListener("click", () => {
  const taskTaxt = prompt("inputhere")
  if(taskTaxt){
    addTaskToDOM(taskTaxt)
  }
})

function addTaskToDOM(taskText) {
  const task = document.createElement('div');
  task.className = 'task';
  task.textContent = taskText;
  taskList.prepend(task);
  saveTasksToCookies();

  task.addEventListener("click", () => {
    if (confirm("want to delete?")){
      task.remove();
      saveTasksToCookies();
    }
  })
}

function saveTasksToCookies() {
  const tasks = [];
  document.querySelectorAll('#ft_list .task').forEach(task => tasks.push(task.textContent));
  const encodedTasks = encodeURIComponent(JSON.stringify(tasks));
  document.cookie = `tasks=${encodedTasks}; path=/;`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onload = () => {
  const savedTasks = getCookie('tasks');
  if (savedTasks) {
    const decodedTasks = decodeURIComponent(savedTasks);
    const tasks = JSON.parse(decodedTasks);
    tasks.reverse().forEach(task => addTaskToDOM(task));
  }
};



