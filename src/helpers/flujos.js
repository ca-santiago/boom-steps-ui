
export const isInReadiness = (flujo) => {
    return (flujo.status === 'CREATED' || flujo.status === 'STARTED');
}

export const isFinished = (flujo) => {
    return (flujo.status === 'LOCKED' || flujo.status === 'FINISHED');
}
