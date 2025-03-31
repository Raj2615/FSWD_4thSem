class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title, dueTime, priority) {
        try {
            if (!title || typeof dueTime !== 'number' || !priority) {
                throw new Error("Invalid task data. Title, dueTime, and priority are required.");
            }
            const task = {
                title,
                dueTime: Date.now() + dueTime * 60000,
                priority
            };
            this.tasks.push(task);
            this.scheduleReminder(task);
        } catch (error) {
            console.error("Error adding task:", error.message);
        }
    }

    sortTasksByPriority() {
        this.tasks.sort((a, b) => a.priority - b.priority);
    }

    getTasksDueWithin(minutes) {
        const now = Date.now();
        return this.tasks.filter(task => (task.dueTime - now) <= minutes * 60000);
    }

    scheduleReminder(task) {
        const delay = task.dueTime - Date.now();
        if (delay > 0) {
            setTimeout(() => {
                console.log(`Reminder: Task '${task.title}' is due now!`);
            }, delay);
        }
    }

    displayTasks() {
        console.log("Task List:", this.tasks);
    }
}
const taskManager = new TaskManager();
taskManager.addTask("Finish project", 5, 1);
taskManager.addTask("Prepare meeting notes", 10, 2);
taskManager.addTask("Call client", 3, 3);
taskManager.sortTasksByPriority();
console.log("Sorted Tasks:", taskManager.tasks);
console.log("Tasks due in 10 minutes:", taskManager.getTasksDueWithin(10));
taskManager.displayTasks();