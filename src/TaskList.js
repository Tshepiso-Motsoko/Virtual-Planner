import React, { useState } from 'react';

function TaskList({ tasks, addTask }) {
  const [taskText, setTaskText] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = () => {
    if (taskText && startTime && endTime) {
      addTask(taskText, startTime, endTime);
      setTaskText('');
      setStartTime('');
      setEndTime('');
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <label htmlFor="taskText">Task:</label>
      <input id="taskText" name="taskText" type="text" value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="Enter task" />
      <label htmlFor="startTime">Start Time:</label>
      <input id="startTime" name="startTime" type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
      <label htmlFor="endTime">End Time:</label>
      <input id="endTime" name="endTime" type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}

export default TaskList;

