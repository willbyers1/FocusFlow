document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const dateDisplay = document.getElementById('date-display');

    // Display Current Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.innerText = new Date().toLocaleDateString('en-US', options);

    // Load Tasks from LocalStorage
    let tasks = JSON.parse(localStorage.getItem('focusTasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">Remove</button>
            `;
            taskList.appendChild(li);
        });
    };

    window.addUpdateTask = () => {
        const taskValue = taskInput.value.trim();
        if (taskValue) {
            tasks.push(taskValue);
            localStorage.setItem('focusTasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('focusTasks', JSON.stringify(tasks));
        renderTasks();
    };

    addBtn.addEventListener('click', addUpdateTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addUpdateTask();
    });

    renderTasks();
});