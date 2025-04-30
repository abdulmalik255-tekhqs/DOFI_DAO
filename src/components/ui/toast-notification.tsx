import { toast } from 'react-hot-toast';
type ToastType = 'success' | 'error';

const ToastNotification = (type: ToastType, message: string): void => {
  const id =
    type === 'success'
      ? toast.success(
          <div className="font-sora font-[14px] text-[#344054]">{message}</div>,
        )
      : toast.error(
          <div className="font-sora font-[14px] text-[#344054]">{message}</div>,
        );
  setTimeout(() => toast.dismiss(id), 3000);
};

export default ToastNotification;
