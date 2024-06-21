import { useEffect, useRef } from 'react';

function useClickOutSide({ onClickOutside, bubble = true }) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = function (e) {
      console.log(e.target);
      if (
        ref.current &&
        ref.current !== e.target &&
        !ref.current.contains(e.target)
      ) {
        onClickOutside();
      }
    };

    document.body.addEventListener('click', handleClick, bubble);
    return () => {
      document.body.removeEventListener('click', handleClick, bubble);
    };
  }, [onClickOutside, bubble]);

  return { ref };
}

export default useClickOutSide;
