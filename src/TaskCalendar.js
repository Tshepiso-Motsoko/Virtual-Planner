/* global bootstrap */

import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick

function TaskCalendar({ tasks }) {
  // Map tasks to events
  const events = tasks.map(task => {
    const startTime = new Date(task.startTime);
    const endTime = new Date(task.endTime);
    const duration = (endTime - startTime) / 1000 / 60; // Duration in minutes
    return {
      title: `${task.text} (${startTime.toLocaleTimeString()} - ${duration} mins)`,
      start: startTime,
      end: endTime,
      extendedProps: {
        description: task.text
      }
    };
  });

  // Log events for debugging
  useEffect(() => {
    console.log("Events:", events);
  }, [events]);

  // Handle mouse enter event for tooltip
  const handleEventMouseEnter = (info) => {
    new bootstrap.Tooltip(info.el, {
      title: info.event.extendedProps.description,
      placement: 'top',
      trigger: 'hover',
      container: 'body'
    });
  };

  return (
    <div>
      <h2>Upcoming Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text} - {new Date(task.startTime).toLocaleString()} to {new Date(task.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
      <p>Note: The colored day is today's date.</p>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventMouseEnter={handleEventMouseEnter}
      />
    </div>
  );
}

export default TaskCalendar;

