import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList Component', () => {
  const mockTasks = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ];

  const mockToggleTask = jest.fn();

  test('renders "No tasks available" when tasks array is empty', () => {
    render(<TaskList tasks={[]} onToggle={mockToggleTask} />);
    expect(screen.getByTestId('no-tasks')).toBeInTheDocument();
  });

  test('renders list of tasks when tasks are provided', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockToggleTask} />);
    
    
    expect(screen.getByTestId('task-list')).toBeInTheDocument();
    
    
    mockTasks.forEach(task => {
      expect(screen.getByTestId(`task-item-${task.id}`)).toBeInTheDocument();
      expect(screen.getByText(task.text)).toBeInTheDocument();
    });
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockToggleTask} />);
    
    const checkbox = screen.getByTestId('task-checkbox-1');
    fireEvent.click(checkbox);
    
    expect(mockToggleTask).toHaveBeenCalledWith(1);
  });
}); 