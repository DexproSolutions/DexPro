import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X, Info } from 'lucide-react';

const MessageAlert = ({ 
  type = 'info', 
  message, 
  title, 
  onClose, 
  autoClose = true, 
  duration = 5000,
  show = true 
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, isVisible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const alertStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: 'text-green-500',
      iconComponent: CheckCircle,
      title: 'Success!'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: 'text-red-500',
      iconComponent: XCircle,
      title: 'Error!'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-500',
      iconComponent: AlertCircle,
      title: 'Warning!'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-500',
      iconComponent: Info,
      title: 'Info'
    }
  };

  const style = alertStyles[type];
  const IconComponent = style.iconComponent;

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md w-full animate-slide-in`}>
      <div className={`${style.bg} border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent className={`h-6 w-6 ${style.icon}`} />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium ${style.text}`}>
                {title || style.title}
              </h3>
              <button
                onClick={handleClose}
                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className={`mt-1 text-sm ${style.text}`}>
              {message}
            </div>
          </div>
        </div>
        
        {/* Progress bar for auto-close */}
        {autoClose && (
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-300 ease-linear ${
                type === 'success' ? 'bg-green-500' :
                type === 'error' ? 'bg-red-500' :
                type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              style={{ 
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageAlert; 