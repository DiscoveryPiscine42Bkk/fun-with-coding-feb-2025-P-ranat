$(document).ready(function () {
  const $newbtn = $("#newbtn");
  const $taskList = $("#ft_list");

  $newbtn.on("click", function () {
      const taskText = prompt("Input your task here:");
      if (taskText) {
          addTaskToDOM(taskText);
      }
  });

  function addTaskToDOM(taskText) {
      const $task = $("<div>").addClass("task").text(taskText);
      $taskList.prepend($task);
      saveTasksToCookies();

      $task.on("click", function () {
          if (confirm("Do you want to delete this task?")) {
              $task.remove();
              saveTasksToCookies();
          }
      });
  }

  function saveTasksToCookies() {
      const tasks = [];
      $taskList.find(".task").each(function () {
          tasks.push($(this).text());
      });
      const encodedTasks = encodeURIComponent(JSON.stringify(tasks));
      document.cookie = `tasks=${encodedTasks}; path=/;`;
  }

  function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function loadTasksFromCookies() {
      const savedTasks = getCookie("tasks");
      if (savedTasks) {
          const decodedTasks = decodeURIComponent(savedTasks);
          const tasks = JSON.parse(decodedTasks);
          tasks.reverse().forEach(task => addTaskToDOM(task));
      }
  }

  loadTasksFromCookies();
});