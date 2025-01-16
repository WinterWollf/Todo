import Cookie from 'universal-cookie';

export const useIsLogged = () => {
    const cookies = new Cookie();
    return cookies.get('is_logged') !== undefined;
}