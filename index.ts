import {
  useState as useStateNative,
  useCallback,
  useRef,
  useEffect
} from 'react';
import immer from 'immer'; // Immer rocks. Go check it out if you haven't

let log = console.log;

export const useStateM = <T> (initialState: T, showWarning = true) : [state: T, setState: (param: T) => void ] => {
    const [state, preSetState] = useStateNative(initialState);
  // console.log('executed..'); //This only executes at the very first time only i.e., when we call `useStateM` hook.
  const stateRef = useRef(state); // We could have simply used useRef() but typescript throws error on this case, like null is not mutable, so we must pass the same object i.e., `state` as initial state for the ref.
  useEffect(() => {
    //LEARN: useEffect doesn't execute if you mutate state directly.
    // log(state);
    stateRef.current = state; //This passes reference of state object.
    // stateRef.current = JSON.stringify(state);
  });
  const setState = useCallback(
    (updater) => {
      if (typeof updater !== 'function') {
        let value = updater;
        let isMutated = stateRef.current === value;
        // log(isMutated); // This tells us if we mutated state directly.
        if (isMutated) {
          let line1 = 'Warning from - usestatem';
          let line2 =
            'Hey, you mutated state badly, though its 100% legit to do.';
          let line3 =
            "> You are supposed to mutate 'state' inside the callback function of 'setState'.";
          let line4 =
            '> This is as equally performant though, but mutating this way can cause updates to state for the mutations that you made elsewhere in the code.\n';
          let line5 = "*Tip: You can disable this warning via supplying `false` as second parameter of useStateM(anything, false)"
          if (showWarning) console.warn(line1, line2, line3, line4, line5);
          // preSetState(JSON.parse(JSON.stringify(value)));
          preSetState({...value});
        } else {
          preSetState(value); //
        }
      } else {
        return preSetState((old) =>
          immer(old, (draft) => {
            updater(draft);
          })
        );
      }
    },
    [preSetState]
  );
  return [state, setState];
};

export const useState = useStateM;
