import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { HiXMark } from 'react-icons/hi2';
import useClickOutSide from '../hooks/useClickOutSide';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [windowOpening, setWindowOpening] = useState('');

  const handleOpen = setWindowOpening;
  const handleClose = () => setWindowOpening('');

  return (
    <ModalContext.Provider value={{ windowOpening, handleOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({ children, triggerOf }) {
  const { handleOpen } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => {
      handleOpen(triggerOf);
    },
  });
}

function Window({ children, name }) {
  const { windowOpening, handleClose } = useContext(ModalContext);
  const { ref } = useClickOutSide({ onClickOutside: handleClose });

  if (name !== windowOpening) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={handleClose}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onClose: handleClose })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Trigger = Trigger;
Modal.Window = Window;

export default Modal;
