import ButtonIcon from './ButtonIcon';
import { HiOutlineMoon } from 'react-icons/hi';

import { useDarkMode } from '../contexts/DarkModeContext';

function DarkModeToggle() {
  // console.log('re-render DarkModeToggle');
  const { setDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={() => setDarkMode((isDarkMode) => !isDarkMode)}>
      <HiOutlineMoon />
    </ButtonIcon>
  );
}

export default DarkModeToggle;
