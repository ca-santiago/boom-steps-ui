import React from "react";
import managerReducer from "../reducers/manager";
import { addFlujo, setInitialLoadData, setInitialLoadError } from "../reducers/managerActions";
import FlujoService from "../services/flujo";

export const initialManagerState = {
    flujos: [],
    lastCreated: null,
    loading: true,
    loadingError: false,
};

export const ManagerContext = React.createContext(null);

export const useManagerContext = () => {
    const context = React.useContext(ManagerContext);
    if (!context) {
        throw new Error('useManagerContext should be called down ManagerContext.Provider');
    }
    return context;
}

export const ManagerProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(managerReducer, initialManagerState);

    const getFlujos = () => {
        FlujoService.GetFlujosPaginated()
            .then(({ results }) => {
                console.log(results);
                dispatch(setInitialLoadData(results))
            })
            .catch((erro) => {
                console.log(erro);
                dispatch(setInitialLoadError('Something went wrong, try refreshing the page'));
            });
    }

    React.useEffect(() => {
        getFlujos();
    }, []);

    const actions = React.useMemo(() => ({
        addFlujo: (flujo) => dispatch(addFlujo(flujo)),
    }), [dispatch]);

    if (state.loading) return null;
    if (state.loadingError) return <p>Something went wrong, please refresh the page</p>;

    return (
        <ManagerContext.Provider value={{ actions, state }} >
            {children}
        </ManagerContext.Provider>
    );
}

export const withManagerProvider = (Component) => {
    return () => (
        <ManagerProvider>
            <Component />
        </ManagerProvider>
    );
}
