import React, { useState } from 'react';

import * as S from './ListShuffler.style';

const data = [
  {
    num: 0,
    content: 'Zero'
  },
  {
    num: 1,
    content: 'One'
  },
  {
    num: 2,
    content: 'Two'
  },
  {
    num: 3,
    content: 'Three'
  },
  {
    num: 4,
    content: 'Four'
  },
  {
    num: 5,
    content: 'Five'
  }
];

function App() {
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };
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
