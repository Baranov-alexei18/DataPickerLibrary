import { RefObject, useEffect } from 'react';

export const useOutsideClick = (
  elementRef: RefObject<HTMLElement>,
  handler: () => void,
  attached = true,
) => {
  const handleClose = ({ target }: MouseEvent) => {
    if (!elementRef.current) return;

    if (!elementRef.current.contains(target as Node)) {
      handler();
    }
  };

  useEffect(() => {
    if (!attached) return;
    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [elementRef, handler, attached]);
};
