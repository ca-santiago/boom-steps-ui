import { initialManagerState } from "../context/manager";

const managerReducer = (prev = initialManagerState, action) => {
    switch (action.type) {
        case "ADD_FLUJO": {
            return {
                ...prev,
                flujos: [action.payload, ...prev.flujos],
                lastCreated: action.payload,
            }
        }
        case "REMOVE_FLUJO": {
            return {
                ...prev,
                flujos: prev.flujos.filter(f => f.id !== action.payload),
            }
        }
        case "INITIAL_LOAD": {
            return {
                flujos: action.payload,
                loadingError: false,
                loading: false,
                lastCreated: null
            }
        }
        case "UPDATE_FLUJO_DATA": {
            return {
                ...prev,
                flujos: prev.flujos.map(f => f.id === action.payload.id ? action.payload : f),
            }
        }
        case "INITIAL_LOAD_FAIL": {
            return {
                ...prev,
                loadingError: true,
                loading: false
            }
        }
        default:
            return { ...prev };
    }
}

export default managerReducer;
