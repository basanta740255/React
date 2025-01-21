import React, { useState, useCallback, memo } from 'react';
import { Star, CheckCircle, Circle, AlertCircle } from 'lucide-react';

const Task = memo(({ task, onComplete, onPriorityChange }) => {
  return (
    <div className="task">
      <div className="task-left">
        <button
          onClick={() => onComplete(task.id)}
          className="task-complete-button"
        >
          {task.completed ? (
            <CheckCircle className="task-icon completed" size={24} />
          ) : (
            <Circle className="task-icon" size={24} />
          )}
        </button>
        <span className={`${task.completed ? 'task-text-completed' : ''}`}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onPriorityChange(task.id)}
        className="task-priority-button"
      >
        <Star
          className={`task-priority-icon ${task.priority ? 'priority' : ''}`}
          size={24}
        />
      </button>
    </div>
  );
});

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review code PR', completed: false, priority: true },
    { id: 2, text: 'Update documentation', completed: false, priority: false },
    { id: 3, text: 'Plan sprint meeting', completed: true, priority: true },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const handleComplete = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, []);

  const handlePriorityChange = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, priority: !task.priority }
          : task
      )
    );
  }, []);

  const handleAddTask = useCallback((event) => {
    event.preventDefault();
    if (!newTask.trim()) return;

    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        priority: false,
      },
    ]);
    setNewTask('');
  }, [newTask]);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'active':
        return !task.completed;
      case 'priority':
        return task.priority;
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    priority: tasks.filter(t => t.priority).length,
  };

  return (
    <div className="task-manager">
      {/* Stats Section */}
      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.priority}</div>
          <div className="stat-label">Priority</div>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button
          type="submit"
          className="add-task-button"
        >
          Add Task
        </button>
      </form>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {['all', 'active', 'completed', 'priority'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => handleFilterChange(filterType)}
            className={`filter-button ${filter === filterType ? 'active' : ''}`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onPriorityChange={handlePriorityChange}
            />
          ))
        ) : (
          <div className="no-tasks">
            <AlertCircle className="no-tasks-icon" />
            No tasks found
          </div>
        )}
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        /* General styles */
        body {
          font-family: Arial, sans-serif;
          background-color: #f7fafc;
          color: #333;
        }

        .task-manager {
          max-width: 720px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-item {
          padding: 15px;
          background-color: #eff6ff;
          border-radius: 8px;
          text-align: center;
        }

        .stat-number {
          font-size: 24px;
          font-weight: bold;
        }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
        }

        .add-task-form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .task-input {
          flex: 1;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
        }

        .task-input:focus {
          border-color: #3b82f6;
        }

        .add-task-button {
          padding: 10px 20px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .add-task-button:hover {
          background-color: #2563eb;
        }

        .filter-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .filter-button {
          padding: 10px 20px;
          background-color: #f3f4f6;
          border-radius: 8px;
          cursor: pointer;
          text-transform: capitalize;
        }

        .filter-button.active {
          background-color: #3b82f6;
          color: white;
        }

        .filter-button:hover {
          background-color: #e5e7eb;
        }

        .task-list {
          margin-top: 20px;
        }

        .task {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background-color: #fff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          margin-bottom: 10px;
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
        }

        .task-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .task-complete-button, .task-priority-button {
          background: none;
          border: none;
          cursor: pointer;
        }

        .task-icon {
          color: #9ca3af;
        }

        .task-icon.completed {
          color: #10b981;
        }

        .task-priority-icon {
          color: #d1d5db;
        }

        .task-priority-icon.priority {
          color: #f59e0b;
        }

        .task-text-completed {
          text-decoration: line-through;
          color: #6b7280;
        }

        .no-tasks {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          color: #6b7280;
        }

        .no-tasks-icon {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default TaskManager;
