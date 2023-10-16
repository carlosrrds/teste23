import axios from 'axios';

const baseUrl = axios.create({
    baseURL: 'http://127.0.0.1:3333/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ""`

    },
});

export default baseUrl;