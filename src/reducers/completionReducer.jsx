import { initialAppState } from "../context/completion";

export const completionReducer = (prev = initialAppState, action) => {
    switch (action.type) {
        case "SET_SESSION": {
            return {
                ...prev,
                ...action.payload,
                loadingError: false,
                loading: false,
            }
        }
        case "SET_FLUJO": {
            return {
                ...prev,
                loading: false,
                loadginError: false,
                flujo: action.payload,
            }
        }
        case "SET_ERROR": {
            return {
                ...prev,
                loadgin: false,
                loadginError: action.payload
            }
        }
        default:
            return { ...prev };
    }
}
