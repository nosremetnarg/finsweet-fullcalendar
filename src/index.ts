import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

window.Webflow ||= [];
window.Webflow.push(() => {
  const calendarElement = document.querySelector<HTMLElement>('[data-element="calendar"]');
  if (!calendarElement) return;

  const events = getEvents();
  // const happenings = getHappenings();

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
  const scripts = document.querySelectorAll<HTMLScriptElement>('[data-element="class-data"]');
  const events = [...scripts].map((script) => {
    if (!script.textContent) {
      return;
    }
    const event: Event = JSON.parse(script.textContent!);
    event.start = new Date(event.start);
    return event;
  });

  return events;
};

// const getHappenings = (): Happening[] => {
//   const scripts = document.querySelectorAll<HTMLScriptElement>('[data-element="happening-data"]');
//   const happenings = [...scripts].map((script) => {
//     if (!script.textContent) {
//       return;
//     }
//     const happening: Happening = JSON.parse(script.textContent!);
//     happening.start = new Date(happening.start);
//     return happening;
//   });

//   return happenings;
// };
