import { Dispatch, SetStateAction } from 'react';
import { EisHover } from '../../../../pages/HomePage/homePage.type';

interface HoverState {
  [key: string]: boolean;
}

export const useHover = () => {
  const handleMouseEnter = (setIsHover: Dispatch<SetStateAction<HoverState>>, setHoverId: Dispatch<SetStateAction<string | null>>) => {
    return (icon: EisHover, hoverId: string | null = null) => {
      setIsHover((prev) => ({ ...prev, [icon]: true }));
      setHoverId(hoverId);
    };
  };

  const handleMouseLeave = (setIsHover: Dispatch<SetStateAction<HoverState>>, setHoverId: Dispatch<SetStateAction<string | null>>) => {
    return (icon: EisHover) => {
      setIsHover((prev) => ({ ...prev, [icon]: false }));
      setHoverId(null);
    };
  };

  return { handleMouseEnter, handleMouseLeave };
};
