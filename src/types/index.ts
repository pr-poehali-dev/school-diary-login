export type User = {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  class?: string;
  email?: string;
};

export type Student = {
  id: string;
  name: string;
  class: string;
  email: string;
  password: string;
};

export type Teacher = {
  id: string;
  name: string;
  email: string;
  password: string;
  classes: string[];
};

export type Grade = {
  id: string;
  studentId: string;
  subject: string;
  grade: number;
  date: string;
  teacherId: string;
};

export type Homework = {
  id: string;
  class: string;
  subject: string;
  task: string;
  deadline: string;
  teacherId: string;
  createdAt: string;
};

export type Schedule = {
  id: string;
  class: string;
  dayOfWeek: number;
  lessons: ScheduleLesson[];
};

export type ScheduleLesson = {
  id: string;
  subject: string;
  time: string;
  teacher: string;
  room: string;
};

export type Message = {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  text: string;
  timestamp: string;
  read: boolean;
};
