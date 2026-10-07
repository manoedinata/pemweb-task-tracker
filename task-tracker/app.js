// Task Tracker Kuliah — state & DOM refs
const form = document.getElementById("task-form");
const judulInput = document.getElementById("judul");
const matkulInput = document.getElementById("matkul");
const deadlineInput = document.getElementById("deadline");
const formError = document.getElementById("form-error");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let currentFilter = "semua";

function formatDeadline(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getVisibleTasks() {
  if (currentFilter === "aktif") return tasks.filter((t) => !t.selesai);
  if (currentFilter === "selesai") return tasks.filter((t) => t.selesai);
  return tasks;
}

function render() {
  const visible = getVisibleTasks();

  taskList.innerHTML = "";

  visible.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.selesai ? " selesai" : "");
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle-checkbox";
    checkbox.checked = task.selesai;

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.judul;

    const meta = document.createElement("span");
    meta.className = "task-meta";
    meta.textContent = `${task.matkul} · deadline ${formatDeadline(task.deadline)}`;

    info.appendChild(title);
    info.appendChild(meta);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "×";
    deleteBtn.setAttribute("aria-label", "Hapus tugas");

    li.appendChild(checkbox);
    li.appendChild(info);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  emptyMessage.hidden = visible.length !== 0;

  const aktifCount = tasks.filter((t) => !t.selesai).length;
  counter.textContent = `${aktifCount} tugas aktif`;
}

render();
