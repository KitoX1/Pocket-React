import axios from 'axios';

import { REQUESTS } from '../constants/requests';
import { setAuth } from '../redux/actions/auth';
import { store } from '../redux/reduxStore';

const instance = axios.create({
    baseURL: REQUESTS.baseUrl,
})

const instanceNoToken = axios.create({
    baseURL: REQUESTS.baseUrl + REQUESTS.auth,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;

    return config;
})

instance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await instanceNoToken.post('token/refresh/', {'refresh': localStorage.getItem('refresh')});
            
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);

            return instance.request(originalRequest);
        } catch {
            store.dispatch(setAuth(false));
        }
    }

    throw error;
})



export const authAPI = {
    async getUsername() {
        const {data} = await instance.get('users/me/');

        return data;
    },
    async login(values) {
        const {data} = await instance.post(`${REQUESTS.auth}token/obtain/`, values);

        return data;
    },
    async register(values) {
        const {data} = await instanceNoToken.post('register/', values);

        return data;
    }
}



export const categoriesAPI = {
    async addCategory(values) {
        const {data} = await instance.post(REQUESTS.categories, values);

        return data;
    },
    deleteCategory(categoryId) {
        return instance.delete(`${REQUESTS.categories}${categoryId}/`);
    },
    getCategories(dates) {
        return instance.get(`${REQUESTS.categories}transactions-by-categories/`, { params: { start_date: dates.start_date, end_date: dates.end_date } });
    }
}



export const globalAPI = {
    async getGlobal(dates) {
        const {data} = await instance.get(`${REQUESTS.transactions}global/`, { params: { start_date: dates.start_date, end_date: dates.end_date } });
        
        return data;
    }
}



export const transactionsAPI = {
    async addTransaction(values) {
        const {data} = await instance.post(REQUESTS.transactions, values);
        
        return data;
    },
    deleteTransaction(transactionId) {
        return instance.delete(`${REQUESTS.transactions}${transactionId}/`);
    },
    async editTransaction(transactionId, values) {
        const {data} = await instance.put(`${REQUESTS.transactions}${transactionId}/`, values);
        
        return data;
    },
    async getTransactions(dates) {
        const {data} = await instance.get(REQUESTS.transactions, { params: { start_date: dates.start_date, end_date: dates.end_date } });
        
        return data.results;
    }
}



export const widgetsAPI = {
    async addWidget(values) {
        const {data} = await instance.post(REQUESTS.widgets, values);
        
        return data;
    },
    deleteWidget(widgetId) {
        return instance.delete(`${REQUESTS.widgets}${widgetId}/`);
    },
    async getWidgets() {
        const {data} = await instance.get(REQUESTS.widgets);
        
        return data;
    },
}