import React from "react";
import { completionReducer } from "../reducers/completionReducer";
import { resetStatus, setCompletionFlujo, setCompletionSession, setLoadingError } from "../reducers/completionActions";
import { useParams } from "react-router";
import CompletionService from "../services/completion";

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
    const { id } = useParams();
    const [state, dispatch] = React.useReducer(completionReducer, initialAppState);

    const getFlujoData = React.useCallback(() => {
        dispatch(resetStatus());
        CompletionService.getFlujoData(id)
            .then((payload) => {
                dispatch(setCompletionFlujo(payload));
            })
            .catch((err) => {
                console.log(err);
                dispatch(setLoadingError(true));
            });
    }, [id]);

    const actions = React.useMemo(() => ({
        setFlujo: (...args) => dispatch(setCompletionFlujo(...args)),
        setSession: (...args) => dispatch(setCompletionSession(...args)),
        setLoadingError: (...args) => dispatch(setLoadingError(...args)),
        refetch: () => getFlujoData(),
    }), [dispatch]);

    React.useEffect(() => {
        getFlujoData();
    }, [id]);

    if (state.loading) return null;

    if (!state.flujo) return <p>Whoops! This flujo does not exists</p>;

    if (state.loadingError) return <p>Error loading... please try again later</p>;

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
