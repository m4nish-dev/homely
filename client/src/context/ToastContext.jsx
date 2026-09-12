import { createContext, useContext, useState, useCallback } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaExclamationTriangle, 
  FaTimes 
} from 'react-icons/fa';
import './Toast.css';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
  };

  // Modern confirm modal to replace window.confirm
  const confirm = useCallback(({ 
    title = 'Are you sure?', 
    message = 'Please confirm this action.', 
    confirmText = 'Confirm', 
    cancelText = 'Cancel',
    isDanger = false,
    onConfirm 
  }) => {
    setConfirmDialog({
      title,
      message,
      confirmText,
      cancelText,
      isDanger,
      onConfirm: async () => {
        setConfirmDialog(null);
        if (onConfirm) await onConfirm();
      },
      onCancel: () => setConfirmDialog(null)
    });
  }, []);

  return (
    <ToastContext.Provider value={{ toast, confirm }}>
      {children}

      {/* Floating Toasts Container */}
      <div className="toast-container" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className={`toast-pill toast-${t.type}`}>
            <div className="toast-icon">
              {t.type === 'success' && <FaCheckCircle />}
              {t.type === 'error' && <FaExclamationCircle />}
              {t.type === 'warning' && <FaExclamationTriangle />}
              {t.type === 'info' && <FaInfoCircle />}
            </div>
            <div className="toast-message">{t.message}</div>
            <button 
              className="toast-close" 
              onClick={() => removeToast(t.id)} 
              aria-label="Close notification"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>

      {/* Elegant In-App Confirm Modal */}
      {confirmDialog && (
        <div className="confirm-modal-overlay" onClick={confirmDialog.onCancel}>
          <div className="confirm-modal-box" onClick={e => e.stopPropagation()}>
            <h3>{confirmDialog.title}</h3>
            <p>{confirmDialog.message}</p>
            <div className="confirm-modal-actions">
              <button 
                type="button" 
                className="confirm-btn cancel" 
                onClick={confirmDialog.onCancel}
              >
                {confirmDialog.cancelText}
              </button>
              <button 
                type="button" 
                className={`confirm-btn submit ${confirmDialog.isDanger ? 'danger' : ''}`} 
                onClick={confirmDialog.onConfirm}
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
