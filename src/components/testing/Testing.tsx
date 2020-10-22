import React, { useState } from 'react';

import * as S from './Testing.style';
import { Variants } from 'framer-motion/types/types';

function Testing() {
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <S.Box
                onClick={e => setToggle(!toggle)}
                variants={variant}
                animate={toggle ? 'open' : 'close'}
                drag='x'
            ></S.Box>
        </>
    )
}

const variant: Variants = {
    open: {
        position: 'absolute',
        x: '50%'
    },
    close: {
        
    }
}

export default Testing;