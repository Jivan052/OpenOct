import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to log in');
      console.error('Login error:', error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      setIsResettingPassword(false);
    } catch (error) {
      toast.error('Failed to send password reset email');
      console.error('Reset password error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{isResettingPassword ? 'Reset Password' : 'Login'}</h1>
      <form onSubmit={isResettingPassword ? handleResetPassword : handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!isResettingPassword && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn-primary w-full">
          {isResettingPassword ? 'Reset Password' : 'Login'}
        </button>
      </form>
      {!isResettingPassword && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsResettingPassword(true)}
            className="text-primary-600 hover:text-primary-700"
          >
            Forgot Password?
          </button>
        </div>
      )}
      {isResettingPassword && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsResettingPassword(false)}
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;