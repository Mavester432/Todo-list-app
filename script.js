let tasks = [];

function showSection(sectionId) {
    document.getElementById('task-form').style.display = 'none';
    document.getElementById('achieved-tasks').style.display = 'none';
    document.getElementById('selected-task').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === 'achieved-tasks') {
        displayAchievedTasks();
    }
}

function addTask(event) {
    event.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;

    const task = { name: taskName, date: taskDate, achieved: false };
    tasks.push(task);

    document.getElementById('task-name').value = '';
    document.getElementById('task-date').value = '';

    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span>${task.name} - ${task.date}</span>
        <button onclick="showTaskDetails(${index})">View</button>
        `;
        taskList.appendChild(li);
    });
}

function showTaskDetails(index) {
    document.getElementById('task-form').style.display = 'none';
    document.getElementById('selected-task').style.display = 'block';
    const task = tasks[index];
    document.getElementById('task-details').innerText = `Task: ${task.name}\nDue: ${task.date}`;
}

function backToList() {
    document.getElementById('selected-task').style.display = 'none';
    document.getElementById('task-form').style.display = 'block';
}

function markAsAchieved(index) {
    tasks[index].achieved = true;
    displayTasks();
}

function displayAchievedTasks() {
    const achievedList = document.getElementById('achieved-list');
    achievedList.innerHTML = '';

    tasks.forEach((task, index) => {
        if (task.achieved) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.name} - ${task.date}</span>
                <button class="done">Done</button>
            `;
            achievedList.appendChild(li);
        }
    });
}
