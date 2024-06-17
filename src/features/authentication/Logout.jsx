import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import useLogout from './useLogout';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Logout() {
  const { mutate, isLoggingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={mutate}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
