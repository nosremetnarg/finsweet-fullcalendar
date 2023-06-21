import { Calendar } from '@fullcalendar/core';
// import { cl } from '@fullcalendar/core/internal-common';
import dayGridPlugin from '@fullcalendar/daygrid';

window.Webflow ||= [];
window.Webflow.push(() => {
  const calendarElement = document.querySelector<HTMLElement>('[data-element="calendar"]');
  if (!calendarElement) return;

  const events = getHappenings();
  const classes = getCourses();

  const calendar = new Calendar(calendarElement, {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
    },
    eventSources: [
      events,
      classes
    ],
    defaultAllDay: true,
  });
  calendar.render();
});

const getCourses = (): Course[] => {
  // Get Class Elements
  const classData = document.querySelectorAll<HTMLScriptElement>('[data-element="class-data"]');
  // Loop through Classes
  const courses = [...classData].map((script) => {
    // if class doesnt have text - exit
    if (!script.textContent) {
      return;
    }
    // Parse the event data
    const course: Course = JSON.parse(script.textContent!);
    console.log(course);
    course.start = new Date(course.start);
    return course;
  });
  // Get Events
  // getHappenings();
  return courses;
};

const getHappenings = (): Happening[] => {
  const happeningData = document.querySelectorAll<HTMLScriptElement>('[data-element="event-data"]');
  const happenings = [...happeningData].map((script) => {
    if (!script.textContent) {
      return;
    }

    const happening: Happening = JSON.parse(script.textContent!);
    console.log(happening);
    happening.start = new Date(happening.start);
    return happening;
  });

  return happenings;
};
