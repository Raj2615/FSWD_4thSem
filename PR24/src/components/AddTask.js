import React, { useState } from 'react';

function AddTask({ onAdd }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAdd(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add-task-form">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
        data-testid="task-input"
      />
      <button type="submit" data-testid="add-task-button">
        Add Task
      </button>
    </form>
  );
}

export default AddTask; 