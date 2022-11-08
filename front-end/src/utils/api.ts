export const API_HOST = 'http://localhost:8000';

export const endpoints = {
  login: '/api/token/',
  logout: '/api/auth/logout',
  signup: '/api/auth/signup',
  token: '/api/auth/token',
  user: '/api/users/me',
};
const csrftoken = getCookie('csrftoken');
export async function fetchWrapper(endpoint: string, opts: {
  method: string;
  headers?: { [key: string]: string };
  mode?: string;
  body?: { [key: string]: any } | string;
}) {
  opts.headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'X-CSRFToken': `${csrftoken}`,
    ...opts.headers,
  };
  
  if (opts.body) {
    opts.body = JSON.stringify(opts.body);
  }
  return fetch(`${API_HOST}${endpoint}?fomat=json`, opts as RequestInit);
}

function getCookie(name: string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}