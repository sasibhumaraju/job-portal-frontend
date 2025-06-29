import Cookies from 'universal-cookie';
export const cookies = new Cookies(null,{  path: '/',
        secure: true,
        sameSite: 'strict',
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 20))});
