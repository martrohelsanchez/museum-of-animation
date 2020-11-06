import React, { useState } from 'react';

import * as S from './ListShuffler.style';
import { AnimationProps } from '../../shared/types';

const data = [
  {
    num: 0,
    content: 'Hey,',
    bgColor: '#28df99'
  },
  {
    num: 1,
    content: 'Can',
    bgColor: '#f05454'
  },
  {
    num: 2,
    content: 'me',
    bgColor: '#ffe05d'
  },
  {
    num: 3,
    content: '?',
    bgColor: '#51adcf'
  },
  {
    num: 4,
    content: 'You',
    bgColor: '#f8bd7f'
  },
  {
    num: 5,
    content: 'Arrange',
    bgColor: '#ffc7c7'
  }
];

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 15
};

function App(props: AnimationProps) {
  const [list, setList] = useState(data);


  function handleSwitch() {
    const copy = list.slice(0);
    shuffleArray(copy);
    setList(copy);
  }

  function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const lists = list.map(list => (
    <S.List 
      layout 
      transition={spring} 
      key={list.num}
      bgColor={list.bgColor}
    >
      {list.content}
    </S.List>
  ));

  return (
    <S.Cont>
      <S.ListCont onClick={handleSwitch}>
        {lists}
      </S.ListCont>
    </S.Cont>
  )
}

export default App;
