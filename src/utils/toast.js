import { toast } from 'react-toastify';

const showToast = (type, message) => {
  const config = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  switch (type) {
    case 'success':
      toast.success(message, config);
      break;
    case 'error':
      toast.error(message, config);
      break;
    case 'info':
      toast.info(message, config);
      break;
    case 'warn':
      toast.warn(message, config);
      break;
    default:
      toast(message, config);
  }
};

export default showToast;
