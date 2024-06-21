import { useEffect } from 'react';
import useUser from './useUser';
import { Navigate, useNavigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;

    if (user) navigate('/', { replace: true });
  }, [user, isLoading, navigate]);

  if (!isLoading && user) return <Navigate to={'/'} replace="true" />;

  if (!isLoading && !user) return children;
};
