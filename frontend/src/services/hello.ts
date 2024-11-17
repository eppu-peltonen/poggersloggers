const baseUrl = import.meta.env.VITE_API_URL;

export const getHello = async () => {
    const response = await fetch(baseUrl + '/api/hello');
    return response.json();
};