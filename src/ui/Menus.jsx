import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import useClickOutSide from '../hooks/useClickOutSide';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledSelect = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledOption = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

function Menus({ children }) {
  const [currentMenu, setCurrentMenu] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const open = (id, x, y) => {
    setCurrentMenu(id);
    setX(x);
    setY(y);
  };
  const close = () => setCurrentMenu('');

  return (
    <MenuContext.Provider value={{ currentMenu, x, y, open, close }}>
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ triggerOf }) {
  const { currentMenu, open, close } = useContext(MenuContext);
  const ref = useRef();

  const handleClick = function (e) {
    e.stopPropagation();
    // console.log(
    //   ref.current &&
    //     opened &&
    //     (e.target === ref.current || ref.current.contains(e.target))
    // );

    const rect = e.target.closest('button').getBoundingClientRect();

    !currentMenu === '' || currentMenu !== triggerOf
      ? open(
          triggerOf,
          window.innerWidth - rect.x - rect.width,
          rect.y + rect.height + 5
        )
      : close();
  };

  return (
    <StyledToggle onClick={handleClick} ref={ref}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function Select({ children, id }) {
  const { currentMenu, x, y, close } = useContext(MenuContext);
  const { ref } = useClickOutSide({
    onClickOutside: () => {
      close();
    },
    bubble: false,
  });

  if (currentMenu !== id) return null;
  return (
    <StyledSelect position={{ x, y }} ref={ref}>
      {children}
    </StyledSelect>
  );
}

function Option({ children, icon, onClick }) {
  const { setOpened, close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    setOpened(false);

    close();
  }

  return (
    <li onClick={handleClick}>
      <StyledOption>
        <span>{icon}</span> {children}
      </StyledOption>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Select = Select;
Menus.Option = Option;

export default Menus;
