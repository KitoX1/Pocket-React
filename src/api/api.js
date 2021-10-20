import { setAuth } from '../redux/actions/auth';

import axios from 'axios';
import store from '../redux/reduxStore';



const instance = axios.create({
    baseURL: 'http://89.108.102.170/api/',
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    return config;
})

instance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post(`http://89.108.102.170/api/auth/token/refresh/`, {"refresh": localStorage.getItem('refresh')})
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            return instance.request(originalRequest);
        } catch {
            store.dispatch(setAuth(false))
        }
    }

    throw error;
})



export const authAPI = {
    async getUsername() {
        const {data} = await instance.get('users/me/')
        return data;
    },
    async login(values) {
        const {data} = await instance.post('auth/token/obtain/', values)
        return data;
    },
    async register(values) {
        const {data} = await axios.post('http://89.108.102.170/api/auth/register/', values)
        return data;
    }
}



export const categoriesAPI = {
    async addCategory(values) {
        const {data} = await instance.post('pockets/categories/', values)
        return data;
    },
    deleteCategory(categoryId) {
        return instance.delete(`pockets/categories/${categoryId}/`)
    },
    getCategories(dates) {
        return instance.get('pockets/categories/transactions-by-categories/', { params: { start_date: dates.start_date, end_date: dates.end_date } })
    }
}



export const globalAPI = {
    async getGlobal(dates) {
        const {data} = await instance.get('pockets/transactions/global/', { params: { start_date: dates.start_date, end_date: dates.end_date } })
        return data;
    }
}



export const transactionsAPI = {
    async addTransaction(values) {
        const {data} = await instance.post('pockets/transactions/', values)
        return data;
    },
    deleteTransaction(transactionId) {
        return instance.delete(`pockets/transactions/${transactionId}/`)
    },
    async editTransaction(transactionId, values) {
        const {data} = await instance.put(`pockets/transactions/${transactionId}/`, values)
        return data;
    },
    async getTransactions(dates) {
        const {data} = await instance.get('pockets/transactions/', { params: { start_date: dates.start_date, end_date: dates.end_date } })
        return data.results;
    }
}



export const widgetsAPI = {
    async addWidget(values) {
        const {data} = await instance.post('pockets/widgets/', values)
        return data;
    },
    deleteWidget(widgetId) {
        return instance.delete(`pockets/widgets/${widgetId}/`)
    },
    async getWidgets() {
        const {data} = await instance.get('pockets/widgets/')
        return data;
    },
}