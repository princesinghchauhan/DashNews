import axios from 'axios';

const BASE_URL = '/api';

const API_BASE = 'https://newsapi.org/v2';
const API_KEY = 'YOUR_NEWS_API_KEY';

export const fetchArticles = async () => {
    try {
        const response = await axios.get(`${API_BASE}/everything?q=technology&apiKey=${API_KEY}`);
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
};



export async function login(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to login');
        }

        return await response.json(); // Returns { message, token }
    } catch (error) {
        throw error; // Let the calling code handle the error
    }
}

export const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Optionally, you can also redirect the user to the login page after logout
    window.location.href = '/login';
};