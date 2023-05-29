

export const setCompletionSession = ({
    token,
    flujo,
    secondsLeft,
}) => {
    return {
        type: "SET_SESSION",
        payload: {
            token,
            flujo,
            secondsLeft
        }
    }
};

export const setCompletionFlujo = (flujo) => {
    return {
        type: "SET_FLUJO",
        payload: flujo
    }
};

export const setLoadingError = (error) => {
    return {
        type: "SET_LOADING_ERROR",
        payload: error,
    }
}

export const resetStatus = () => {
    return {
        type: 'RESET'
    }
}