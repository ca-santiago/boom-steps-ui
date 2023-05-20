
export const isInReadiness = (flujo) => {
    return (flujo.status === 'CREATED' || flujo.status === 'STARTED');
}
