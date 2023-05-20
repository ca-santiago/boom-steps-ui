
export const createShareLink = (flujoId) => {
    const origin = window.location.origin;
    return `${origin}/complete/${flujoId}`;
}
