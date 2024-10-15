import { useState, ChangeEvent, FormEvent } from 'react';
import './App.css'

type TodoItem = {
  id: number;
  label: string;
  isCompleted: boolean;
}

const myTodoList: TodoItem[] = [
  {
    id: 1,
    label: 'Walk the dog',
    isCompleted: true
  },
  {
    id: 2,
    label: 'Buy the dinner',
    isCompleted: false
  },
  {
    id: 3,
    label: 'Take a shower',
    isCompleted: true
  },
]

function App() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(myTodoList);
  const [newItem, setNewItem] = useState<string>('');

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: todoItems.length + 1,
      label: newItem,
      isCompleted: false
    }
    setTodoItems([...todoItems, newTodo])
    setNewItem('');
  }

  const handleRemoveTodo = (id: number): void => {
    const filteredItems = todoItems.filter(item => item.id !== id);
    setTodoItems(filteredItems);
  }

  const handleCheckboxChange = (id: number): void => {
    const updatedItems = todoItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        };
      } else {
        return item;
      }
    });
  
    setTodoItems(updatedItems);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setNewItem(value);
  }

  return (
      <div>
        <h1>My Todo List</h1>
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: '50px'}}>
        {todoItems.map(item => (
          <div 
            key={item.id} 
            style={{display: 'flex', alignItems: 'center', gap: '20px', height: '30px', marginBottom: '10px'}}
          >
            <span style={{width: 300, textAlign: 'start'}}>{item.label}</span>
            <input type='checkbox' checked={item.isCompleted} onChange={() => handleCheckboxChange(item.id)} />
            <button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => handleRemoveTodo(item.id)}>
              Remove Item
            </button>
          </div>
        ))}
        </div>
        <form onSubmit={handleAddTodo}>
          <div style={{marginBottom: '20px'}}>
            <div>Name of todo:</div>
            <input type='text' placeholder='New item' value={newItem} onChange={(e) => handleInputChange(e)}/>
          </div>
          <button type='submit'>Create todo</button>
        </form>

      </div>
  )
}

export default App

// remove item to the list (done)
// adding item to the list (Done)
// giving an status of complete to the items in the list (marked as done)