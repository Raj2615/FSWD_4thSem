import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from './AddTask';

describe('AddTask Component', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  test('renders form elements', () => {
    render(<AddTask onAdd={mockOnAdd} />);
    
    expect(screen.getByTestId('add-task-form')).toBeInTheDocument();
    expect(screen.getByTestId('task-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-task-button')).toBeInTheDocument();
  });

  test('submits form with valid input', () => {
    render(<AddTask onAdd={mockOnAdd} />);
    
    const input = screen.getByTestId('task-input');
    const submitButton = screen.getByTestId('add-task-button');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);
    
    expect(mockOnAdd).toHaveBeenCalledWith('New Task');
    expect(input.value).toBe('');
  });

  test('does not submit form with empty input', () => {
    render(<AddTask onAdd={mockOnAdd} />);
    
    const submitButton = screen.getByTestId('add-task-button');
    fireEvent.click(submitButton);
    
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test('submits form when pressing Enter', () => {
    render(<AddTask onAdd={mockOnAdd} />);
    
    const input = screen.getByTestId('task-input');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    
    expect(mockOnAdd).toHaveBeenCalledWith('New Task');
    expect(input.value).toBe('');
  });
}); 