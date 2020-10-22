import { useAnimation } from 'framer-motion';
import React, { useRef, useState } from 'react';

import * as S from './Droplets.styles';

function DropLets() {
    const firstWave = useRef<HTMLDivElement>(null!);
    const [count, setCount] = useState(0);
    const waveControls = useAnimation();
    const firstWaveContRef = useRef<HTMLDivElement>(null!);

    async function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        firstWaveContRef.current.style.left = e.clientX  + 'px';
        firstWaveContRef.current.style.top = e.clientY + 'px';
        firstWave.current.style.display = 'block';

        await waveControls.set({
            display: 'block'
        });

        await waveControls.start({
            // height: '70px',
            // width: '70px',
            scale: 20,
            // opacity: [null, 0],
            transition: {
                type: "spring",
                duration: 1
            }
        });

        // await waveControls.set({
        //     display: 'none',
        //     scale: 0,
        //     // height: 0,
        //     // width: 0,
        //     opacity: 1
        // });
    }

    return (
        <S.Bg onClick={handleClick}>
            <S.FirstWaveCont ref={firstWaveContRef} >
                <S.FirstWave 
                    ref={firstWave}
                    initial={{
                        // opacity: '1',
                        // display: 'none',
                    }}
                    animate={waveControls}
                >
                </S.FirstWave>
            </S.FirstWaveCont>
        </S.Bg>
    )
}

export default DropLets;