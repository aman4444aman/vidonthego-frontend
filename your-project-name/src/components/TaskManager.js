// TaskManager.js

import React, { useReducer, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTheme } from '../ThemeContext'; // Importing useTheme for Dark Mode toggle
import './TaskManager.css';

// Action Types
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED';

// Initial state for tasks
const initialState = {
  tasks: [],
};

// Reducer function to handle actions
const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload], // Add task to state
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates } // Update task based on ID
            : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id), // Delete task by ID
      };
    case TOGGLE_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed } // Toggle completed status
            : task
        ),
      };
    default:
      return state;
  }
};

const TaskManager = () => {
  const { theme, toggleTheme } = useTheme(); // Dark mode toggle function
  const [state, dispatch] = useReducer(taskReducer, initialState); // Using useReducer for task management
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the task being edited
  const [filter, setFilter] = useState('all'); // Filter criteria: 'all', 'completed', 'incomplete'

  // Create a reference for the task input field
  const taskTitleInputRef = useRef(null); // This will hold a reference to the task input field

  // Add task action
  const addTask = () => {
    if (taskTitle && taskDescription) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false, // Initially tasks are not completed
      };
      dispatch({ type: ADD_TASK, payload: newTask }); // Dispatch add task action
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  // Update task action
  const updateTask = () => {
    if (taskTitle && taskDescription) {
      const updatedTask = {
        id: editingTaskId,
        updates: { title: taskTitle, description: taskDescription },
      };
      dispatch({ type: UPDATE_TASK, payload: updatedTask }); // Dispatch update task action
      setTaskTitle('');
      setTaskDescription('');
      setEditingTaskId(null); // Reset the editing task state
    }
  };

  // Delete task action
  const deleteTask = (id) => {
    dispatch({ type: DELETE_TASK, payload: { id } }); // Dispatch delete task action
  };

  // Toggle completion status action
  const toggleCompleted = (id) => {
    dispatch({ type: TOGGLE_COMPLETED, payload: { id } }); // Dispatch toggle completed status action
  };

  // Autosave to localStorage whenever tasks are updated
  useEffect(() => {
    if (state.tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      alert('Task list updated!');
    }
  }, [state.tasks]);

  // Focus the input field on component mount
  useEffect(() => {
    if (taskTitleInputRef.current) {
      taskTitleInputRef.current.focus(); // Autofocus on the input field
    }
  }, []); // This will run once when the component mounts

  // Handle Edit button click
  const handleEdit = (task) => {
    setEditingTaskId(task.id); // Set the task ID for editing
    setTaskTitle(task.title); // Pre-fill the title
    setTaskDescription(task.description); // Pre-fill the description
  };

  // useMemo to optimize task filtering based on the selected filter criteria
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return state.tasks.filter((task) => task.completed);
      case 'incomplete':
        return state.tasks.filter((task) => !task.completed);
      default:
        return state.tasks; // Return all tasks if 'all' is selected
    }
  }, [state.tasks, filter]); // Re-run only when tasks or filter change

  // Memoize event handlers using useCallback
  const memoizedHandleEdit = useCallback(handleEdit, []); // Memoize edit function
  const memoizedDeleteTask = useCallback(deleteTask, []); // Memoize delete function
  const memoizedToggleCompleted = useCallback(toggleCompleted, []); // Memoize toggle completion function

  return (
    <div className={theme}>
      <h1>Task Manager</h1>
      <button onClick={toggleTheme}>Toggle Dark Mode</button>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          ref={taskTitleInputRef} // Attach the reference to the input field
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        {editingTaskId ? (
          <button type="button" onClick={updateTask}>Update Task</button>
        ) : (
          <button type="button" onClick={addTask}>Add Task</button>
        )}
      </form>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All Tasks</button>
        <button onClick={() => setFilter('completed')}>Completed Tasks</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete Tasks</button>
      </div>
      <TaskList 
        tasks={filteredTasks} 
        deleteTask={memoizedDeleteTask} 
        handleEdit={memoizedHandleEdit} 
        toggleCompleted={memoizedToggleCompleted} 
      />
    </div>
  );
};

// TaskList Component to display tasks
const TaskList = ({ tasks, deleteTask, handleEdit, toggleCompleted }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleEdit(task)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button 
            onClick={() => toggleCompleted(task.id)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Completed'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskManager;
