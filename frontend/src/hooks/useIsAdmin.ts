import Cookie from 'universal-cookie';

export const useIsAdmin = () => {
    const cookies = new Cookie();
    return cookies.get('is_admin');
};
