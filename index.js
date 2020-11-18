var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useState as useStateNative, useCallback, useRef, useEffect } from 'react';
import immer from 'immer'; // Immer rocks. Go check it out if you haven't
var log = console.log;
export var useStateM = function (initialState, showWarning) {
    if (showWarning === void 0) { showWarning = true; }
    var _a = useStateNative(initialState), state = _a[0], preSetState = _a[1];
    // console.log('executed..'); //This only executes at the very first time only i.e., when we call `useStateM` hook.
    var stateRef = useRef(state); // We could have simply used useRef() but typescript throws error on this case, like null is not mutable, so we must pass the same object i.e., `state` as initial state for the ref.
    useEffect(function () {
        //LEARN: useEffect doesn't execute if you mutate state directly.
        // log(state);
        stateRef.current = state; //This passes reference of state object.
        // stateRef.current = JSON.stringify(state);
    });
    var setState = useCallback(function (updater) {
        if (typeof updater !== 'function') {
            var value = updater;
            var isMutated = stateRef.current === value;
            // log(isMutated); // This tells us if we mutated state directly.
            if (isMutated) {
                var line1 = 'Warning from - usestatem';
                var line2 = 'Hey, you mutated state badly, though its 100% legit to do.';
                var line3 = "> You are supposed to mutate 'state' inside the callback function of 'setState'.";
                var line4 = '> This is as equally performant though, but mutating this way can cause updates to state for the mutations that you made elsewhere in the code.\n';
                var line5 = "*Tip: You can disable this warning via supplying `false` as second parameter of useStateM(anything, false)";
                if (showWarning)
                    console.warn(line1, line2, line3, line4, line5);
                // preSetState(JSON.parse(JSON.stringify(value)));
                preSetState(__assign({}, value));
            }
            else {
                preSetState(value); //
            }
        }
        else {
            return preSetState(function (old) {
                return immer(old, function (draft) {
                    updater(draft);
                });
            });
        }
    }, [preSetState]);
    return [state, setState];
};
export var useState = useStateM;
