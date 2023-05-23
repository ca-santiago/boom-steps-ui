import React from "react";
import { completionReducer } from "../reducers/completionReducer";
import { setCompletionFlujo, setCompletionSession, setLoadingError } from "../reducers/completionActions";

export const initialAppState = {
    token: null,
    flujo: null,
    timeLeft: 0,
    loading: true,
};

export const CompletionContext = React.createContext({ actions: {}, state: initialAppState });

export const useCompletionContext = () => {
    const context = React.useContext(CompletionContext);
    if (!context) {
        throw new Error('useCompletionContext should be called down CompletionContext.Provider');
    }
    return context;
}

export const CompletionProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(completionReducer, initialAppState);

    const actions = React.useMemo(() => ({
        setFlujo: (...args) => dispatch(setCompletionFlujo(...args)),
        setSession: (...args) => dispatch(setCompletionSession(...args)),
        setLoadginError: (...args) => dispatch(setLoadingError(...args))
    }), [dispatch]);

    return (
        <CompletionContext.Provider value={{ actions, state }} >
            {children}
        </CompletionContext.Provider>
    );
}

export const withCompletionProvider = (Component) => {
    return () => (
        <CompletionProvider>
            <Component />
        </CompletionProvider>
    );
}
