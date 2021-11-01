import { useState } from 'react';

function useCursorPositionInContainer() {
  const [cursorPositionInContainer, setCursorPositionInContainer] = useState({
    x: 0,
    y: 0,
  });

  function handleMouseMoveInContainer(
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    setCursorPositionInContainer({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    });
  }

  return {
    handleMouseMoveInContainer,
    cursorPositionInContainer,
  };
}

export default useCursorPositionInContainer;
