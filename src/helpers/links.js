
export const createShareLink = (flujoId) => {
    const origin = window.location.origin;
    return `${origin}/flujo/${flujoId}`;
}
