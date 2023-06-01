

export const addFlujo = (flujo) => {
    return {
        type: "ADD_FLUJO",
        payload: flujo
    }
};

export const removeFlujo = (id) => {
    return {
        type: "REMOVE_FLUJO",
        payload: id
    }
}

export const updateFlujoData = (newFlujoData) => {
    return {
        type: "UPDATE_FLUJO_DATA",
        payload: newFlujoData,
    }
}

export const setInitialLoadData = (flujos = []) => {
    return {
        type: 'INITIAL_LOAD',
        payload: flujos,
    }
}

export const setInitialLoadError = () => {
    return {
        type: 'INITIAL_LOAD_FAIL'
    }
}