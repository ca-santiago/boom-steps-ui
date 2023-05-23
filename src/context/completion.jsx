import React from "react";

export const CompletionContext = React.createContext({ token: null, flujo: null, timeLeft: 0 });

export const useCompletionContext = () => {
    const context = React.useContext(CompletionContext);
    if (!context) {
        throw new Error('useCompletionContext should be called down CompletionContext.Provider');
    }
    return context;
}