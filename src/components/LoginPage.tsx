import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  class?: string;
};

type LoginPageProps = {
  onLogin: (user: User) => void;
};

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const { toast } = useToast();

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName && studentClass) {
      onLogin({
        id: `student_${Date.now()}`,
        name: studentName,
        role: 'student',
        class: studentClass,
      });
    }
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherCode === '060320') {
      onLogin({
        id: `teacher_${Date.now()}`,
        name: teacherName,
        role: 'teacher',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Неверный код учителя',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="GraduationCap" size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Дневник.Ру
          </h1>
          <p className="text-muted-foreground">Современная образовательная платформа</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student" className="gap-2">
              <Icon name="User" size={16} />
              Ученик
            </TabsTrigger>
            <TabsTrigger value="teacher" className="gap-2">
              <Icon name="UserCheck" size={16} />
              Учитель
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Вход для ученика</CardTitle>
                <CardDescription>Введите ваши данные для входа в систему</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Имя и Фамилия</Label>
                    <Input
                      id="student-name"
                      placeholder="Иван Иванов"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-class">Класс</Label>
                    <Input
                      id="student-class"
                      placeholder="9А"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teacher">
            <Card>
              <CardHeader>
                <CardTitle>Вход для учителя</CardTitle>
                <CardDescription>Введите секретный код для доступа к системе</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTeacherLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-name">Имя и Фамилия</Label>
                    <Input
                      id="teacher-name"
                      placeholder="Мария Петровна"
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-code">Секретный код</Label>
                    <Input
                      id="teacher-code"
                      type="password"
                      placeholder="Введите код"
                      value={teacherCode}
                      onChange={(e) => setTeacherCode(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="Shield" size={16} className="mr-2" />
                    Войти как учитель
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
