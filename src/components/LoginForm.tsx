import React, { useState } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@camped-ui/card';
import { Label } from '@camped-ui/label';
import { Input } from '@camped-ui/input';
import { Button } from '@camped-ui/button';

// import IncrescoImage from '../../assets/incresco.svg';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useFrappeAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!username || !password) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }

    try {
      const res = await login({ username, password });
      if (res.message === 'Logged In') {
        console.log('Login successful');
        navigate('/app');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-background flex justify-center items-center flex-col w-full">
      {/* <img src={IncrescoImage} alt="not-found" /> */}
      <Card className="w-3/12 mt-10">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                value={username}
                placeholder="User Name"
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={password}
                placeholder="Password"
                type="password"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="text-red-600">{error}</div>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
