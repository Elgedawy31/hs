import { AxiosError } from 'axios';
import toast from 'react-hot-toast';



export const showErrorToast = (error) => {
  if (error instanceof AxiosError) {
    const response = error.response?.data;
    
    // Handle error details array if present
    if (response?.data?.errorDetails?.length) {
      response.data.errorDetails.forEach((detail) => {
        toast.error(detail.message);
      });
      return;
    }

    // Handle error or message property
    if (response?.error || response?.message) {
      toast.error(response.error || response.message || 'An error occurred');
      return;
    }
  }
  
  // Fallback error message
  toast.error('An unexpected error occurred. Please try again.');
};
