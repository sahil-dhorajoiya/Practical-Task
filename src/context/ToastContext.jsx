import { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
    title: "",
  });

  const showToast = (message, type = "", title) => {
    setToast({ show: true, message, type, title });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={toast.show}
          onClose={hideToast}
          delay={3000}
          autohide
          bg={toast.type}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
