import toast from 'react-hot-toast';

// Toast notification utility with consistent styling
export const showToast = {
  success: (message: string, options?: any) => {
    return toast.success(message, {
      duration: 4000,
      icon: '✅',
      style: {
        background: '#0A0A0A',
        color: '#10B981',
        border: '1px solid #10B981',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
      ...options,
    });
  },

  error: (message: string, options?: any) => {
    return toast.error(message, {
      duration: 5000,
      icon: '❌',
      style: {
        background: '#0A0A0A',
        color: '#EF4444',
        border: '1px solid #EF4444',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
      ...options,
    });
  },

  info: (message: string, options?: any) => {
    return toast(message, {
      duration: 3000,
      icon: 'ℹ️',
      style: {
        background: '#0A0A0A',
        color: '#3B82F6',
        border: '1px solid #3B82F6',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
      ...options,
    });
  },

  warning: (message: string, options?: any) => {
    return toast(message, {
      duration: 4000,
      icon: '⚠️',
      style: {
        background: '#0A0A0A',
        color: '#F59E0B',
        border: '1px solid #F59E0B',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
      ...options,
    });
  },

  loading: (message: string, options?: any) => {
    return toast.loading(message, {
      style: {
        background: '#0A0A0A',
        color: '#FFFFFF',
        border: '1px solid #333',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
      ...options,
    });
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: any
  ) => {
    return toast.promise(promise, messages, {
      style: {
        background: '#0A0A0A',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
      success: {
        style: {
          color: '#10B981',
          border: '1px solid #10B981',
        },
        icon: '✅',
      },
      error: {
        style: {
          color: '#EF4444',
          border: '1px solid #EF4444',
        },
        icon: '❌',
      },
      loading: {
        style: {
          color: '#FFFFFF',
          border: '1px solid #333',
        },
      },
      ...options,
    });
  },

  custom: (message: string, options?: any) => {
    return toast(message, {
      style: {
        background: '#0A0A0A',
        color: '#CBACF9',
        border: '1px solid #CBACF9',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
      ...options,
    });
  },

  // Dismiss all toasts
  dismiss: () => {
    toast.dismiss();
  },

  // Dismiss specific toast
  dismissById: (id: string) => {
    toast.dismiss(id);
  },
};

// Predefined toast messages for common actions
export const toastMessages = {
  // Form actions
  form: {
    submitting: 'Submitting form...',
    submitted: 'Form submitted successfully!',
    error: 'Failed to submit form. Please try again.',
    validation: 'Please check your input and try again.',
  },

  // Copy actions
  copy: {
    success: 'Copied to clipboard!',
    error: 'Failed to copy to clipboard.',
  },

  // Navigation
  navigation: {
    loading: 'Loading...',
    error: 'Failed to load page.',
  },

  // API actions
  api: {
    loading: 'Processing request...',
    success: 'Request completed successfully!',
    error: 'Request failed. Please try again.',
    timeout: 'Request timed out. Please try again.',
  },

  // File operations
  file: {
    uploading: 'Uploading file...',
    uploaded: 'File uploaded successfully!',
    error: 'Failed to upload file.',
    invalidType: 'Invalid file type.',
    tooLarge: 'File size too large.',
  },

  // Authentication
  auth: {
    signingIn: 'Signing in...',
    signedIn: 'Signed in successfully!',
    signedOut: 'Signed out successfully!',
    error: 'Authentication failed.',
  },

  // Email
  email: {
    sending: 'Sending email...',
    sent: 'Email sent successfully!',
    error: 'Failed to send email.',
  },

  // General
  general: {
    saving: 'Saving...',
    saved: 'Saved successfully!',
    loading: 'Loading...',
    error: 'Something went wrong.',
    success: 'Operation completed successfully!',
  },
};

// Utility function to show toast with predefined messages
export const showPredefinedToast = (
  type: 'success' | 'error' | 'info' | 'warning' | 'loading',
  category: keyof typeof toastMessages,
  action: string,
  customMessage?: string
) => {
  const message = customMessage || toastMessages[category]?.[action as keyof typeof toastMessages[typeof category]] || 'Operation completed';
  return showToast[type](message);
}; 