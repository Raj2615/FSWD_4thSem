import React from 'react';

function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return <p data-testid="no-tasks">No tasks available</p>;
  }

  return (
    <ul data-testid="task-list">
      {tasks.map(task => (
        <li key={task.id} data-testid={`task-item-${task.id}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            data-testid={`task-checkbox-${task.id}`}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList; 