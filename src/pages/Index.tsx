import { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import StudentDashboard from '@/components/StudentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';

type User = {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  class?: string;
};

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return user.role === 'student' ? (
    <StudentDashboard user={user} onLogout={handleLogout} />
  ) : (
    <TeacherDashboard user={user} onLogout={handleLogout} />
  );
};

export default Index;