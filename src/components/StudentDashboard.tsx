import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  class?: string;
};

type StudentDashboardProps = {
  user: User;
  onLogout: () => void;
};

const mockSchedule = [
  { id: 1, subject: 'Математика', time: '08:30 - 09:15', teacher: 'Иванова М.П.', room: '205' },
  { id: 2, subject: 'Русский язык', time: '09:25 - 10:10', teacher: 'Петрова А.С.', room: '301' },
  { id: 3, subject: 'Английский', time: '10:20 - 11:05', teacher: 'Смирнов В.И.', room: '412' },
  { id: 4, subject: 'Физика', time: '11:25 - 12:10', teacher: 'Козлов Д.М.', room: '107' },
  { id: 5, subject: 'История', time: '12:20 - 13:05', teacher: 'Федорова Н.В.', room: '204' },
];

const mockGrades = [
  { id: 1, subject: 'Математика', grades: [5, 4, 5, 5, 4], average: 4.6 },
  { id: 2, subject: 'Русский язык', grades: [4, 5, 4, 5], average: 4.5 },
  { id: 3, subject: 'Английский', grades: [5, 5, 4, 5, 5], average: 4.8 },
  { id: 4, subject: 'Физика', grades: [4, 4, 5, 4], average: 4.25 },
  { id: 5, subject: 'История', grades: [5, 5, 5, 4, 5], average: 4.8 },
];

const mockHomework = [
  { id: 1, subject: 'Математика', task: 'Решить задачи №125-130 из учебника', deadline: '15.12.2025' },
  { id: 2, subject: 'Русский язык', task: 'Написать сочинение на тему "Зима"', deadline: '16.12.2025' },
  { id: 3, subject: 'Физика', task: 'Подготовить доклад о законах Ньютона', deadline: '18.12.2025' },
];

const StudentDashboard = ({ user, onLogout }: StudentDashboardProps) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      toast({
        title: 'Сообщение отправлено',
        description: 'Учитель получит ваше сообщение в ближайшее время',
      });
      setMessage('');
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-green-500';
    if (grade === 4) return 'bg-blue-500';
    if (grade === 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="GraduationCap" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Дневник.Ру</h1>
              <p className="text-sm text-muted-foreground">{user.class} класс</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium hidden sm:inline">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <Icon name="LogOut" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Выйти</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="home" className="gap-2">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="gap-2">
              <Icon name="Award" size={16} />
              <span className="hidden sm:inline">Оценки</span>
            </TabsTrigger>
            <TabsTrigger value="homework" className="gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">ДЗ</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <Icon name="MessageSquare" size={16} />
              <span className="hidden sm:inline">Сообщения</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" className="text-primary" />
                    Средний балл
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary">4.6</div>
                  <p className="text-sm text-muted-foreground mt-1">За текущий период</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" className="text-secondary" />
                    Домашние задания
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-secondary">{mockHomework.length}</div>
                  <p className="text-sm text-muted-foreground mt-1">Активных заданий</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" className="text-accent-foreground" />
                    Уроков сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-accent-foreground">{mockSchedule.length}</div>
                  <p className="text-sm text-muted-foreground mt-1">По расписанию</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" className="text-primary" />
                  Расписание на сегодня
                </CardTitle>
                <CardDescription>Вторник, 2 декабря 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {mockSchedule.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-r from-white to-accent/20 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col items-center gap-1 min-w-[60px]">
                          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{lesson.time}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{lesson.subject}</h4>
                          <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                          <Badge variant="outline" className="mt-2">
                            <Icon name="DoorOpen" size={12} className="mr-1" />
                            Кабинет {lesson.room}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-primary" />
                  Успеваемость по предметам
                </CardTitle>
                <CardDescription>Текущие оценки за четверть</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockGrades.map((subject) => (
                    <div key={subject.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{subject.subject}</h3>
                        <Badge className="bg-primary">
                          Средний балл: {subject.average.toFixed(1)}
                        </Badge>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {subject.grades.map((grade, index) => (
                          <div
                            key={index}
                            className={`w-12 h-12 rounded-lg ${getGradeColor(grade)} text-white font-bold flex items-center justify-center shadow-md hover-scale`}
                          >
                            {grade}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="space-y-4">
            {mockHomework.map((hw) => (
              <Card key={hw.id} className="hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="BookMarked" className="text-secondary" />
                        {hw.subject}
                      </CardTitle>
                      <CardDescription className="mt-1">{hw.task}</CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {hw.deadline}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Send" className="text-primary" />
                  Написать сообщение
                </CardTitle>
                <CardDescription>Отправьте сообщение учителю или администратору</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Ваше сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Введите текст сообщения..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" className="text-primary" />
                  Профиль ученика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.class} класс</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Средний балл</p>
                    <p className="text-2xl font-bold text-primary">4.6</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Предметов</p>
                    <p className="text-2xl font-bold text-secondary">5</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Активных ДЗ</p>
                    <p className="text-2xl font-bold text-accent-foreground">{mockHomework.length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Оценок за период</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;
