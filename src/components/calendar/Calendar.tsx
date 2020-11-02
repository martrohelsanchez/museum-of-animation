import React, {useRef} from 'react';

import * as S from './calendar.styles';
import Page from './Page';
import useWindowSize from '../../hooks/useWindowSize';

// const pages = ['Mon', 'Teus', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
const calendar = ['Sun', 'Sat', 'Fri', 'Thurs', 'Wed', 'Teus', 'Mon'];

function wait(timeout: number) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, timeout)
    })
}

function Calendar() {
    const windowSize = useWindowSize();
    const animationStack = useRef<{(): Promise<void>}[]>([]);

    function addAnimationStack(animation: () => Promise<void>) {
        animationStack.current = [
            animation,
            ...animationStack.current
        ];
    }

    async function flyAnimationsBack() {
        for (const animateBack of animationStack.current) {
            animateBack();
            await wait(300);
        }
        animationStack.current = [];
    }

    return (
        <S.Bg>
            <S.CalendarSize>
                <S.CalendarCont>
                    <S.TopRed>
                    </S.TopRed>
                    <S.TopGrey>
                    </S.TopGrey>
                    <S.StackElements
                        style={{
                            height: '77%'
                        }}
                    >
                        {calendar.map((text, i) => (
                            <Page
                                key={i}
                                text={text}
                                windowSize={windowSize}
                                addAnimationStack={addAnimationStack}
                                flyAnimationsBack={flyAnimationsBack}
                                isLast={i === 0}
                            />
                        ))}
                    </S.StackElements>
                </S.CalendarCont>
            </S.CalendarSize>
        </S.Bg>
    )
}

export default Calendar;