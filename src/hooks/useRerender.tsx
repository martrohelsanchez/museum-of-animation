import { useState } from 'react';

function useRerender() {
  const [count, setcount] = useState(1);

  function rerender() {
    setcount(count + 1);
  }

  return rerender;
}

export default useRerender;
