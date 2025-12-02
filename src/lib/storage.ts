import { Student, Teacher, Grade, Homework, Schedule, Message } from '@/types';

const STORAGE_KEYS = {
  STUDENTS: 'dnevnik_students',
  TEACHERS: 'dnevnik_teachers',
  GRADES: 'dnevnik_grades',
  HOMEWORK: 'dnevnik_homework',
  SCHEDULES: 'dnevnik_schedules',
  MESSAGES: 'dnevnik_messages',
};

const defaultTeacher: Teacher = {
  id: 'teacher_1',
  name: 'Кушнир Роман Сергеевич',
  email: 'kushnir@school.ru',
  password: '060320',
  classes: ['1А', '6А'],
};

const defaultSchedule1A: Schedule = {
  id: 'schedule_1a',
  class: '1А',
  dayOfWeek: 2,
  lessons: [
    { id: '1', subject: 'Математика', time: '08:30 - 09:15', teacher: 'Кушнир Роман Сергеевич', room: '205' },
    { id: '2', subject: 'Русский язык', time: '09:25 - 10:10', teacher: 'Петрова А.С.', room: '301' },
    { id: '3', subject: 'Чтение', time: '10:20 - 11:05', teacher: 'Кушнир Роман Сергеевич', room: '205' },
    { id: '4', subject: 'Физкультура', time: '11:25 - 12:10', teacher: 'Иванов С.П.', room: 'Спортзал' },
  ],
};

const defaultSchedule6A: Schedule = {
  id: 'schedule_6a',
  class: '6А',
  dayOfWeek: 2,
  lessons: [
    { id: '1', subject: 'Алгебра', time: '08:30 - 09:15', teacher: 'Кушнир Роман Сергеевич', room: '305' },
    { id: '2', subject: 'История', time: '09:25 - 10:10', teacher: 'Федорова Н.В.', room: '204' },
    { id: '3', subject: 'Английский', time: '10:20 - 11:05', teacher: 'Смирнов В.И.', room: '412' },
    { id: '4', subject: 'Геометрия', time: '11:25 - 12:10', teacher: 'Кушнир Роман Сергеевич', room: '305' },
    { id: '5', subject: 'Физика', time: '12:20 - 13:05', teacher: 'Козлов Д.М.', room: '107' },
  ],
};

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.TEACHERS)) {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify([defaultTeacher]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GRADES)) {
    localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.HOMEWORK)) {
    localStorage.setItem(STORAGE_KEYS.HOMEWORK, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SCHEDULES)) {
    localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify([defaultSchedule1A, defaultSchedule6A]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
  }
}

export const storage = {
  init: initStorage,

  getStudents: (): Student[] => {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return data ? JSON.parse(data) : [];
  },

  addStudent: (student: Student) => {
    const students = storage.getStudents();
    students.push(student);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  },

  getTeachers: (): Teacher[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    return data ? JSON.parse(data) : [defaultTeacher];
  },

  getGrades: (): Grade[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GRADES);
    return data ? JSON.parse(data) : [];
  },

  addGrade: (grade: Grade) => {
    const grades = storage.getGrades();
    grades.push(grade);
    localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades));
  },

  getGradesByStudent: (studentId: string): Grade[] => {
    return storage.getGrades().filter(g => g.studentId === studentId);
  },

  getHomework: (): Homework[] => {
    const data = localStorage.getItem(STORAGE_KEYS.HOMEWORK);
    return data ? JSON.parse(data) : [];
  },

  addHomework: (homework: Homework) => {
    const homeworks = storage.getHomework();
    homeworks.push(homework);
    localStorage.setItem(STORAGE_KEYS.HOMEWORK, JSON.stringify(homeworks));
  },

  getHomeworkByClass: (className: string): Homework[] => {
    return storage.getHomework().filter(hw => hw.class === className);
  },

  getSchedules: (): Schedule[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
    return data ? JSON.parse(data) : [defaultSchedule1A, defaultSchedule6A];
  },

  getScheduleByClass: (className: string): Schedule | undefined => {
    return storage.getSchedules().find(s => s.class === className);
  },

  updateSchedule: (schedule: Schedule) => {
    const schedules = storage.getSchedules();
    const index = schedules.findIndex(s => s.class === schedule.class);
    if (index !== -1) {
      schedules[index] = schedule;
    } else {
      schedules.push(schedule);
    }
    localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
  },

  getMessages: (): Message[] => {
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return data ? JSON.parse(data) : [];
  },

  addMessage: (message: Message) => {
    const messages = storage.getMessages();
    messages.push(message);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  },

  getMessagesByUser: (userId: string): Message[] => {
    return storage.getMessages().filter(m => m.toId === userId || m.fromId === userId);
  },

  markMessageAsRead: (messageId: string) => {
    const messages = storage.getMessages();
    const message = messages.find(m => m.id === messageId);
    if (message) {
      message.read = true;
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
  },
};
