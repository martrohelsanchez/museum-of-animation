import {useState, useLayoutEffect} from 'react';

function useWindowSize() {
    // const [size, setSize] = useState([0, 0]);
    const [size, setSize] = useState({width: 0, height: 0});
    useLayoutEffect(() => {
        function updateSize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default useWindowSize