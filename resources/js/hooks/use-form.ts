import { useState } from 'react';
import { router } from '@inertiajs/react';

interface UseFormProps<T> {
  initialData: T;
  onSuccess?: () => void;
  onError?: (errors: Record<string, string>) => void;
  onFinish?: () => void;
}

export function useForm<T>(props: UseFormProps<T>) {
  const { initialData, onSuccess, onError, onFinish } = props;
  const [data, setData] = useState<T>(initialData);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const reset = (fields?: (keyof T)[]) => {
    if (fields) {
      const resetData = { ...data };
      fields.forEach(field => {
        resetData[field] = initialData[field];
      });
      setData(resetData);
    } else {
      setData(initialData);
    }
    setErrors({});
  };

  const clearErrors = () => {
    setErrors({});
  };

  const patch = (url: string, options: any = {}) => {
    setProcessing(true);
    setRecentlySuccessful(false);
    
    router.patch(url, data as any, {
      ...options,
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page: any) => {
        setProcessing(false);
        setRecentlySuccessful(true);
        onSuccess?.();
        setTimeout(() => setRecentlySuccessful(false), 2000);
      },
      onError: (errors: any) => {
        setProcessing(false);
        setErrors(errors);
        onError?.(errors);
      },
      onFinish: () => {
        setProcessing(false);
        onFinish?.();
      },
    });
  };

  const post = (url: string, options: any = {}) => {
    setProcessing(true);
    setRecentlySuccessful(false);
    
    router.post(url, data as any, {
      ...options,
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page: any) => {
        setProcessing(false);
        setRecentlySuccessful(true);
        onSuccess?.();
        setTimeout(() => setRecentlySuccessful(false), 2000);
      },
      onError: (errors: any) => {
        setProcessing(false);
        setErrors(errors);
        onError?.(errors);
      },
      onFinish: () => {
        setProcessing(false);
        onFinish?.();
      },
    });
  };

  const put = (url: string, options: any = {}) => {
    setProcessing(true);
    setRecentlySuccessful(false);
    
    router.put(url, data as any, {
      ...options,
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page: any) => {
        setProcessing(false);
        setRecentlySuccessful(true);
        onSuccess?.();
        setTimeout(() => setRecentlySuccessful(false), 2000);
      },
      onError: (errors: any) => {
        setProcessing(false);
        setErrors(errors);
        onError?.(errors);
      },
      onFinish: () => {
        setProcessing(false);
        onFinish?.();
      },
    });
  };

  const destroy = (url: string, options: any = {}) => {
    setProcessing(true);
    setRecentlySuccessful(false);
    
    router.delete(url, {
      ...options,
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page: any) => {
        setProcessing(false);
        setRecentlySuccessful(true);
        onSuccess?.();
        setTimeout(() => setRecentlySuccessful(false), 2000);
      },
      onError: (errors: any) => {
        setProcessing(false);
        setErrors(errors);
        onError?.(errors);
      },
      onFinish: () => {
        setProcessing(false);
        onFinish?.();
      },
    });
  };

  return {
    data,
    setData: (field: keyof T | Partial<T>, value?: any) => {
      if (typeof field === 'string') {
        setData(prev => ({ ...prev, [field]: value }));
      } else {
        setData(prev => ({ ...prev, ...(field as Partial<T>) }));
      }
    },
    processing,
    errors,
    recentlySuccessful,
    reset,
    clearErrors,
    patch,
    post,
    put,
    delete: destroy,
  };
}