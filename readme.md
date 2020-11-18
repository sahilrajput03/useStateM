# useStateM

This is a custom hook made on one of the gists of `Tanner Linsley`. This hook code includes the use of `immer.js` straight away to provide directly mutable abilities for the state but you must mutate state inside the callback function of `setState`.

Tip: You can simply import from  `usestatem` package with one of the two bindings.

```js
import { useState } from 'usestatem'

or

import {useStateM } from 'usestatem'
// Both are equally legit options though.
```

> Basically the name of package ( `usestatem` ) stands for `useState` react hook with **m**utable abilities.

## Examples

[Below example on codesandbox 🔥](https://codesandbox.io/s/usestatem-demo-for-npm-package-6pmyz?file=/src/App.js)

You can definitely expect below example to work out of the box.

```js
export default function App() {
  const [state, setState] = useStateM(
    {
      counter: {value: 10},
      time: {hours: 20, minutes: 30, seconds: {milliseconds: 40}}
    },
    false
  );
  let _number = useStateM(0);
  let [number, setNumber] = _number;
  return (
    <div className="App">
      <h1>Hello useStateM</h1>
      <PrettyPrint object={state} />
      `number`: {number}
      <hr />
      <Button1 setState={setState} />
      <B2 setState={setState} />
      <B3 setState={setState} />
      <B4 setState={setState} />
      <B5 setState={setState} state={state} />
      <B6 setState={setState} state={state} />
      <br />
      <b>Special Case</b>
      <B7 _number={_number} />
    </div>
  );
}

const PrettyPrint = ({object}) => (
  <>
    <pre>{JSON.stringify(object, null, 2)}</pre> <br />
  </>
);

const Button1 = ({setState}) => {
  return (
    <button
      onClick={() =>
        setState((state1) => {
          state1.counter.value++;
        })
      }
    >
      Button1 - Increment <b>state.counter.value</b>
    </button>
  );
};

const B2 = ({setState}) => {
  return (
    <button
      onClick={() => {
        setState((state) => {
          state.time.hours += 2;
          state.time.minutes += 4;
        });
      }}
    >
      B2 - <b>Increment (+2) hours and decrement (-4) minutes</b>
    </button>
  );
};

const B3 = ({setState}) => {
  return (
    <button
      onClick={() => setState((state) => state.time.seconds.milliseconds++)}
    >
      B3 - Increment <b>state.time.milliseconds</b>
    </button>
  );
};

const B4 = ({setState}) => {
  return (
    <button
      onClick={() => setState((state) => state.time.seconds.milliseconds++)}
    >
      B4 - Increment <b>state.time.milliseconds</b>
    </button>
  );
};

const B5 = ({setState, state}) => {
  /* Below example shows that older api remains working!! */
  return (
    <button
      onClick={() =>
        setState({...state, counter: {value: state.counter.value + 2}})
      }
    >
      B5 - Increment <b>state.counter.value</b> by 2
    </button>
  );
};

const B6 = ({state, setState}) => {
  /* Below example show a 100% working but I recommend you to mutate `state` inside the callback. */
  return (
    <button
      onClick={() => {
        state.counter.value += 3;
        setState(state); // Ideally it should be: setState(() => { state.counter.value += 3; })
      }}
    >
      B6 - Increment <b>state.count.value</b> by 3 (WORKS BUT, throws{' '}
      <b>warning</b> in the console)
    </button>
  );
};

const B7 = ({_number}) => {
  let [number, setNumber] = _number;
  return (
    <>
      <button
        onClick={() => {
          number += 4; //This is possible with old setState api of react too. :joy:
          setNumber(number);
        }}
      >
        B7 - Increment `number` by 4
      </button>{' '}
    </>
  );
};

```

Thanks to `immerjs` and `Tanner Linsley`.