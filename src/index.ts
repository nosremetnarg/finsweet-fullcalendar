import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

window.Webflow ||= [];
window.Webflow.push(() => {
  const calendarElement = document.querySelector<HTMLElement>('[data-element="calendar"]');
  if (!calendarElement) return;

  const events = getEvents();
  
  const calendar = new Calendar(calendarElement, {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
    },
    events,
    defaultAllDay: true,
  });
  calendar.render();
});

const getEvents = (): Event[] => {
  // Get Class Elements
  const classData = document.querySelectorAll<HTMLScriptElement>('[data-element="class-data"]');
  // Loop through Classes
  const events = [...classData].map((script) => {
    // if class doesnt have text - exit
    if (!script.textContent) {
      return;
    }
    // Parse the event data
    const event: Event = JSON.parse(script.textContent!);
    event.start = new Date(event.start);
    return event;
  });
  // Get Events
  getHappenings();
  return events;
};

const getHappenings = (): Happening[] => {
  console.log('looking for events');
  const scripts = document.querySelectorAll<HTMLScriptElement>('[data-element="event-data"]');

  const happenings = [...scripts].map((script) => {
    if (!script.textContent) {
      return;
    }
    const happening: Happening = JSON.parse(script.textContent!);
    happening.start = new Date(happening.start);
    return happening;
  });

  return happenings;
};
