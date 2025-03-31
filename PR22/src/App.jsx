import { useReducer } from 'react'
import './App.css'

const initialState = {
  expenses: [],
  total: 0
}

const ACTIONS = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE'
}


function expenseReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_EXPENSE:
      return {
        expenses: [...state.expenses, { ...action.payload, id: Date.now() }],
        total: state.total + action.payload.amount
      }
    case ACTIONS.DELETE_EXPENSE:
      const expenseToDelete = state.expenses.find(exp => exp.id === action.payload.id)
      return {
        expenses: state.expenses.filter(exp => exp.id !== action.payload.id),
        total: state.total - expenseToDelete.amount
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(expenseReducer, initialState)

  const handleAddExpense = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const expense = {
      description: formData.get('description'),
      amount: parseFloat(formData.get('amount')),
      category: formData.get('category')
    }
    dispatch({ type: ACTIONS.ADD_EXPENSE, payload: expense })
    e.target.reset()
  }

  const handleDeleteExpense = (id) => {
    dispatch({ type: ACTIONS.DELETE_EXPENSE, payload: { id } })
  }

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      
      <form onSubmit={handleAddExpense} className="expense-form">
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          step="0.01"
          required
        />
        <select name="category" required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <div className="expense-summary">
        <h2>Total Expenses: ${state.total.toFixed(2)}</h2>
      </div>

      <div className="expense-list">
        <h2>Expenses</h2>
        {state.expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-details">
              <h3>{expense.description}</h3>
              <p>Category: {expense.category}</p>
              <p>Amount: ${expense.amount.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleDeleteExpense(expense.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
