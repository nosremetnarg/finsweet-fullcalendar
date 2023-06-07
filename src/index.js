import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  const calendarElement = document.querySelector('[data-element="calendar"]');
  if (!calendarElement) return;

  const events = getEvents();
  console.log({ events });

  const calendar = new FullCalendar.Calendar(calendarElement, {
    plugins: [FullCalendar.dayGridPlugin, FullCalendar.timeGridPlugin, FullCalendar.listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek',
    },
    events,
    defaultAllDay: true,
  });
  calendar.render();
});

function getEvents() {
  const scripts = document.querySelectorAll('[data-element="event-data"]');
  const events = Array.from(scripts).map((script) => {
    if (!script.textContent) {
      return;
    }
    const event = JSON.parse(script.textContent);
    event.start = new Date(event.start);
    return event;
  });

  return events;
}
