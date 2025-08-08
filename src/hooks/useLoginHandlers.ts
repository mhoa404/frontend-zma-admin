import { useLoginFormStore } from '../store/Auth/loginFormStore';
import { login } from '../scripts/authApi';
import { useNavigate } from 'react-router-dom';

export const useLoginHandlers = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    setErrors,
    setIsLoading,
    reset,
  } = useLoginFormStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrors({ err: 'Vui lòng nhập đầy đủ thông tin' });
      return;
    }

    setIsLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem('access_token', data.access_token);
      reset();
      navigate('/');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrors({ err: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
};
