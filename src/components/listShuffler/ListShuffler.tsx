import React, { useState } from 'react';

import * as S from './ListShuffler.style';
import { AnimationProps } from '../../shared/types';

const data = [
  {
    num: 0,
    content: 'Please'
  },
  {
    num: 1,
    content: 'Can'
  },
  {
    num: 2,
    content: 'me'
  },
  {
    num: 3,
    content: '?'
  },
  {
    num: 4,
    content: 'You'
  },
  {
    num: 5,
    content: 'Arrange'
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
    <S.List layout transition={spring} num={list.num} key={list.num}>
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
