import React, { useState } from 'react';

import * as S from './SpreadCards.styles';
import { Variants } from 'framer-motion';

const cards = [
    'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
    'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
    'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg'
];

function SpreadCards() {
    const [isCardsSpread, setIsCardsSpread] = useState(false);

    function onCardClick() {
        setIsCardsSpread(!isCardsSpread);
    }

    return (
        <S.Bg>
            <S.CardCont
                style={{
                    rotateX: 35,
                    perspective: 900,
                }}
            >
                {cards.map((image, i) => (
                    <S.Card
                        key={i}
                        style={{
                            zIndex: cards.length - i,
                            backgroundImage: `url(${image})`
                        }}
                        onClick={onCardClick}
                        animate={isCardsSpread ? 'spread' : 'notSpread'}
                        variants={cardVariant}
                        custom={i}
                    >
                    </S.Card>
                ))}
            </S.CardCont>
        </S.Bg>
    )
}

const cardVariant: Variants = {
    spread: i => ({
        x: `${getPart(250, cards.length + 1, i + 1) - 125}%`,
        rotate: getPart(80, cards.length - 1, i) - 40,
        boxShadow: '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
        transition: {
            type: 'spring',
            stiffness: 150,
            mass: 2,
            damping: 15
        }
    }),
    notSpread: i => ({
        rotate: -40,
        x: `${(getPart(250, cards.length + 1, cards.length) - 125) - i * 1.5}%`,
        boxShadow: '0 5px 5px 1px rgba(50, 50, 73, 0.1), 0 5px 5px 1px rgba(50, 50, 73, 0.1)',
        transition: {
            type: 'spring',
            mass: 2.5,
            damping: 20,
            restDelta: 0.001
        }
    })
}

function getPart(whole: number, length: number,  i: number) {
    return 1 / length * (length - i) * whole;
}

export default SpreadCards;