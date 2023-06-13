export type Course = {
  title: string;
  start: string | Date;
  end: string | Date;
  location: string;
  teacher: string;
};

export type Happening = {
  title: string;
  date: string | Date;
  location: string;
};
