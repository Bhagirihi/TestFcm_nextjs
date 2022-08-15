import React from 'react';
import { toast, ToastContent } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

/* Start Toast Component From HERE */
interface Props {
  position: string;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: boolean;
  messageprops: string;
}

export const Success: React.FC<ToastContent, Props> = (messageprops) => {
  toast.success(messageprops, {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const Error: React.FC<ToastContent, Props> = (messageprops) => {
  toast.error(messageprops, {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
