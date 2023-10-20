import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskCalendar from './TaskCalendar';
import './App.css';

// Initialize the audio object
const applauseAudio = new Audio('/cheering-and-clapping-crowd-1-5995.mp3');

function Dashboard({ darkMode }) {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [notification, setNotification] = useState('');
  const [currentTask, setCurrentTask] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const checkTasks = () => {
      tasks.forEach(task => {
        const now = new Date();
        const startTime = new Date(task.startTime);
        const endTime = new Date(task.endTime);
        const timeBeforeStart = (startTime - now) / 1000;

        if (timeBeforeStart > 0 && timeBeforeStart <= 5) {
          setNotification(`Task ${task.text} is starting in a few seconds!`);
          setTimeout(() => setNotification(''), 5000);
        }

        if (now >= startTime && now <= endTime) {
          setCurrentTask(task);
          const interval = setInterval(() => {
            const now = new Date();
            const elapsed = now - startTime;
            const duration = endTime - startTime;
            const remaining = Math.floor((endTime - now) / 1000);
            const minutes = Math.floor(remaining / 60);
            const seconds = remaining % 60;
            setProgress((elapsed / duration) * 100);
            setTimeRemaining(`${minutes}m ${seconds}s`);

            if (now >= endTime) {
              clearInterval(interval);
              setCurrentTask(null);
              setTimeRemaining('');

              // Play applause audio
              applauseAudio.play();

              setNotification(`Well done! Task ${task.text} is complete. You are who you think you are`);
              setCompletedTasks([...completedTasks, task]);
              setTimeout(() => setNotification(''), 5000);
            }
          }, 1000);
          return () => clearInterval(interval);
        }
      });
    };

    checkTasks();
    const taskInterval = setInterval(checkTasks, 1000);

    return () => {
      clearInterval(taskInterval);
    };
  }, [tasks, completedTasks]);

  const addTask = (taskText, startTime, endTime) => {
    const newTask = {
      text: taskText,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      id: new Date().getTime()
    };
    setTasks([...tasks, newTask]);
    setNotification('Task successfully added!');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Virtual Planner</h1>
      {notification && <div className={`notification ${notification.includes("Well done!") ? "congratulatory-notification" : "sticky-notification"}`}>{notification}</div>}
      <TaskList tasks={tasks} addTask={addTask} />
      <TaskCalendar tasks={tasks} />
      {currentTask && (
        <div className="progress-chart">
          <h3>{currentTask.text}</h3>
          <progress value={progress} max="100"></progress>
          <div className="fixed-bar" style={{width: `${progress}%`}}>
            {currentTask.text}: {timeRemaining}
          </div>
        </div>
      )}
      <div className="completed-tasks">
        <h2>Completed Tasks</h2>
        <div className="format-guide">
          <strong>Format: </strong> {`{Task Name} {Date} {Duration in minutes}`}
        </div>
        <ul>
          {completedTasks.map(task => {
            const startTime = new Date(task.startTime);
            const endTime = new Date(task.endTime);
            const duration = (endTime - startTime) / 1000 / 60; // Duration in minutes
            return (
              <li key={task.id}>
                {task.text} {startTime.toDateString()} {duration} minutes
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
