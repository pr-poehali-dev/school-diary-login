import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  class?: string;
};

type TeacherDashboardProps = {
  user: User;
  onLogout: () => void;
};

const mockStudents = [
  { id: 1, name: 'Иванов Иван', class: '9А', avgGrade: 4.8 },
  { id: 2, name: 'Петрова Мария', class: '9А', avgGrade: 4.5 },
  { id: 3, name: 'Сидоров Петр', class: '9А', avgGrade: 4.2 },
  { id: 4, name: 'Козлова Анна', class: '9А', avgGrade: 4.9 },
  { id: 5, name: 'Смирнов Алексей', class: '9Б', avgGrade: 4.3 },
  { id: 6, name: 'Федорова Елена', class: '9Б', avgGrade: 4.7 },
];

const mockClasses = ['9А', '9Б', '10А', '10Б', '11А'];
const mockSubjects = ['Математика', 'Русский язык', 'Английский', 'Физика', 'История'];

const TeacherDashboard = ({ user, onLogout }: TeacherDashboardProps) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [hwClass, setHwClass] = useState('');
  const [hwSubject, setHwSubject] = useState('');
  const [hwTask, setHwTask] = useState('');
  const [hwDeadline, setHwDeadline] = useState('');
  const { toast } = useToast();

  const handleSubmitGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudent && selectedSubject && grade) {
      toast({
        title: 'Оценка выставлена',
        description: `Оценка ${grade} по предмету ${selectedSubject} успешно добавлена`,
      });
      setSelectedStudent('');
      setSelectedSubject('');
      setGrade('');
    }
  };

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (hwClass && hwSubject && hwTask && hwDeadline) {
      toast({
        title: 'Домашнее задание создано',
        description: `Задание для класса ${hwClass} по предмету ${hwSubject} успешно добавлено`,
      });
      setHwClass('');
      setHwSubject('');
      setHwTask('');
      setHwDeadline('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-primary/5 to-accent">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
              <Icon name="GraduationCap" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Дневник.Ру</h1>
              <p className="text-sm text-muted-foreground">Панель учителя</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-secondary text-white">
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Обзор</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="gap-2">
              <Icon name="PenTool" size={16} />
              <span className="hidden sm:inline">Оценки</span>
            </TabsTrigger>
            <TabsTrigger value="homework" className="gap-2">
              <Icon name="BookPlus" size={16} />
              <span className="hidden sm:inline">Задания</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Ученики</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="Users" className="text-primary" size={20} />
                    Всего учеников
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary">{mockStudents.length}</div>
                  <p className="text-sm text-muted-foreground mt-1">В ваших классах</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="BookOpen" className="text-secondary" size={20} />
                    Предметов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-secondary">{mockSubjects.length}</div>
                  <p className="text-sm text-muted-foreground mt-1">Преподаете</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="School" className="text-accent-foreground" size={20} />
                    Классов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-accent-foreground">{mockClasses.length}</div>
                  <p className="text-sm text-muted-foreground mt-1">Под вашим руководством</p>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon name="TrendingUp" className="text-green-600" size={20} />
                    Средний балл
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600">4.6</div>
                  <p className="text-sm text-muted-foreground mt-1">По всем предметам</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" className="text-yellow-500" />
                    Лучшие ученики
                  </CardTitle>
                  <CardDescription>Топ учеников по среднему баллу</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockStudents
                      .sort((a, b) => b.avgGrade - a.avgGrade)
                      .slice(0, 5)
                      .map((student, index) => (
                        <div
                          key={student.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-accent/20 to-transparent border"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.class} класс</p>
                          </div>
                          <Badge className="bg-primary">{student.avgGrade}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" className="text-primary" />
                    Быстрые действия
                  </CardTitle>
                  <CardDescription>Основные функции учителя</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="PenTool" className="mr-2" />
                    Выставить оценку
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="BookPlus" className="mr-2" />
                    Создать домашнее задание
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="FileText" className="mr-2" />
                    Посмотреть расписание
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="MessageSquare" className="mr-2" />
                    Сообщения от учеников
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="PenTool" className="text-primary" />
                  Выставление оценок
                </CardTitle>
                <CardDescription>Добавьте оценку для ученика по выбранному предмету</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitGrade} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="student">Выберите ученика</Label>
                      <Select value={selectedStudent} onValueChange={setSelectedStudent} required>
                        <SelectTrigger id="student">
                          <SelectValue placeholder="Выберите ученика" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockStudents.map((student) => (
                            <SelectItem key={student.id} value={student.id.toString()}>
                              {student.name} ({student.class})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Предмет</Label>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject} required>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Выберите предмет" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockSubjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Оценка</Label>
                    <Select value={grade} onValueChange={setGrade} required>
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="Выберите оценку" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 (Отлично)</SelectItem>
                        <SelectItem value="4">4 (Хорошо)</SelectItem>
                        <SelectItem value="3">3 (Удовлетворительно)</SelectItem>
                        <SelectItem value="2">2 (Неудовлетворительно)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full">
                    <Icon name="Check" size={16} className="mr-2" />
                    Выставить оценку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BookPlus" className="text-secondary" />
                  Создание домашнего задания
                </CardTitle>
                <CardDescription>Добавьте новое домашнее задание для класса</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitHomework} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="hw-class">Класс</Label>
                      <Select value={hwClass} onValueChange={setHwClass} required>
                        <SelectTrigger id="hw-class">
                          <SelectValue placeholder="Выберите класс" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockClasses.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              {cls}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hw-subject">Предмет</Label>
                      <Select value={hwSubject} onValueChange={setHwSubject} required>
                        <SelectTrigger id="hw-subject">
                          <SelectValue placeholder="Выберите предмет" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockSubjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hw-task">Описание задания</Label>
                    <Textarea
                      id="hw-task"
                      placeholder="Введите описание домашнего задания..."
                      value={hwTask}
                      onChange={(e) => setHwTask(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hw-deadline">Срок сдачи</Label>
                    <Input
                      id="hw-deadline"
                      type="date"
                      value={hwDeadline}
                      onChange={(e) => setHwDeadline(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать задание
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="text-primary" />
                  Список учеников
                </CardTitle>
                <CardDescription>Все ученики в ваших классах</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-3">
                    {mockStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-white to-accent/10 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-white">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.class} класс</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Средний балл</p>
                            <p className="text-xl font-bold text-primary">{student.avgGrade}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;
