// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export type TUser = {
//   accessToken: any;
//   refreshToken: any;
// };

// export const useAuth = () => useContext(AuthContext);

// export const getUserData = () => {
//   if (typeof Storage === 'undefined') return {};
//   return JSON.parse(localStorage.getItem('user') || '{}');
// };

// export const setUserData = (user: Partial<TUser>) => {
  
//   localStorage.setItem('user', JSON.stringify(user));
// };

// export function clearUserData(): void {
//   if (typeof Storage === 'undefined') return;
//   localStorage.removeItem('user');
// }

// export const getRefreshToken = () => {
//   if (typeof Storage === 'undefined') return false;
//   return JSON.parse(localStorage.getItem('user') || '{}')?.refreshToken;
// };

// export const getAccessToken = () => {
//   if (typeof Storage === 'undefined') {
//     return new Error('Storage type not valid');
//   }
//   return JSON.parse(localStorage.getItem('user') || '{}')?.accessToken;
// };

// export const updateAccessToken = (token: string): void => {
//   if (typeof Storage === 'undefined') return;
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   user.accessToken = token;
//   localStorage.setItem('user', JSON.stringify(user));
// };

// export const isAuthenticated = () => {
//   const accessToken = getAccessToken();
//   if (!accessToken) return false;
//   return true;
// };

// export function getPayloadFromToken(token: string) {
//   if (!token) { return {}; }
//   const base64Url = token.split('.')[1] as string;
//   const base64 = base64Url.replace('-', '+').replace('_', '/');
//   return JSON.parse(window.atob(base64));
// }

export const auths= 0