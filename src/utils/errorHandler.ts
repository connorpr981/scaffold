import { toast } from 'react-toastify';

export const handleError = (error: any) => {
    console.error('Error:', error);
    toast.error(error.message || 'An unknown error occurred'); // Display a toast notification
};