import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback((props: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, props]);
  }, []);

  return { toast };
}