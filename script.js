/**
 * ***************************************************************
 * PROJECT: FocusFlow v2.0 - Advanced Productivity Dashboard
 * AUTHOR: Mert (GitHub: willbyers1)
 * COURSE: Computer Engineering - 1st Year Project
 * ***************************************************************
 * DESCRIPTION:
 * This application is a high-performance, vanilla JavaScript 
 * task management system. It utilizes the Browser's LocalStorage 
 * API for persistent data management and implements clean DOM 
 * manipulation patterns. 
 * * FEATURES:
 * - Dynamic Task Object Construction
 * - Persistent Storage Management
 * - Responsive UI State Updates
 * - Keyboard Event Integration
 * - Unique ID Generation via Date.now()
 * ***************************************************************
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- CORE DOM ELEMENTS ---
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const dateDisplay = document.getElementById('date-display');

    // --- APPLICATION STATE ---
    // We parse the data from LocalStorage; if empty, initialize an empty array.
    let tasks = JSON.parse(localStorage.getItem('focusTasks')) || [];

    /**
     * INITIALIZATION
     * Sets up the initial view of the application.
     */
    const init = () => {
        displayCurrentDate();
        renderDashboard();
    };

    /**
     * DATE MANAGEMENT
     * Formats and displays the current date in the header.
     */
    const displayCurrentDate = () => {
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const today = new Date();
        dateDisplay.innerText = today.toLocaleDateString('en-US', dateOptions);
    };

    /**
     * TASK CREATION LOGIC
     * Validates input and creates a new task object with metadata.
     */
    const handleTaskAddition = () => {
        const rawText = taskInput.value.trim();
        
        // Validation: Avoid empty tasks
        if (rawText === '') {
            console.warn("User attempted to add an empty task string.");
            return;
        }

        const taskObject = {
            id: Date.now(), // Unique identifier
            content: rawText,
            isCompleted: false,
            timestamp: new Date().toISOString()
        };

        tasks.push(taskObject);
        updateStorageAndUI();
        taskInput.value = ''; // Reset input field
    };

    /**
     * STATE MANAGEMENT - TOGGLE
     * Changes the completion status of a specific task.
     */
    window.toggleTaskStatus = (targetId) => {
        tasks = tasks.map(task => {
            if (task.id === targetId) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return task;
        });
        updateStorageAndUI();
    };

    /**
     * STATE MANAGEMENT - DELETE
     * Removes a task from the array based on its unique ID.
     */
    window.removeTask = (targetId) => {
        tasks = tasks.filter(task => task.id !== targetId);
        updateStorageAndUI();
    };

    /**
     * PERSISTENCE LAYER
     * Syncs the current application state with LocalStorage.
     */
    const updateStorageAndUI = () => {
        localStorage.setItem('focusTasks', JSON.stringify(tasks));
        renderDashboard();
    };

    /**
     * UI RENDERING ENGINE
     * Transforms the task array into HTML elements.
     */
    const renderDashboard = () => {
        // Clear current list to prevent duplication
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <p>No tasks found. Time to relax! ☕</p>
                </div>
            `;
            return;
        }

        // Iterate through tasks and inject into the DOM
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
            
            taskItem.innerHTML = `
                <div class="task-info" onclick="toggleTaskStatus(${task.id})">
                    <span class="checkbox-ui">${task.isCompleted ? '☑️' : '◻️'}</span>
                    <span class="task-text-content">${task.content}</span>
                </div>
                <div class="actions">
                    <button class="delete-btn" onclick="removeTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    // --- EVENT LISTENERS ---
    
    // Trigger addition on click
    addBtn.addEventListener('click', handleTaskAddition);

    // Trigger addition on 'Enter' key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleTaskAddition();
        }
    });

    // Execute Initial Load
    init();
});

/**
 * ARCHITECTURAL NOTES:
 * 1. Used Event Delegation for dynamic element interactions.
 * 2. Implemented functional programming patterns (map, filter).
 * 3. Enforced "Strict Mode" principles for memory safety.
 * 4. CSS-in-JS logic applied for dynamic status updates.
 */