import styled from 'styled-components';
import useUser from './useUser';
import Spinner from '../../ui/Spinner';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isLoading, error } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (error) return <Navigate to="/login" />;

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (user) return children;
}

export default ProtectedRoute;
