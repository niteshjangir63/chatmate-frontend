import { createContext, useContext, useRef, useState } from "react";
import "./Toast.css";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timers = useRef({});

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
        clearTimeout(timers.current[id]);
        delete timers.current[id];
    };

    const showToast = (message, type = "success") => {
        const id = Date.now();

        const newToast = {
            id,
            message,
            type,
        };

        setToasts((prev) => [...prev, newToast]);

        timers.current[id] = setTimeout(() => {
            removeToast(id);
        }, 3500);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="toast-container">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast toast-${toast.type}`}
                    >
                        <div className="toast-icon">
                            {toast.type === "success" && (
                                <i className="fa-solid fa-circle-check"></i>
                            )}

                            {toast.type === "error" && (
                                <i className="fa-solid fa-circle-xmark"></i>
                            )}

                            {toast.type === "info" && (
                                <i className="fa-solid fa-circle-info"></i>
                            )}

                            {toast.type === "warning" && (
                                <i className="fa-solid fa-triangle-exclamation"></i>
                            )}
                        </div>

                        <div className="toast-content">
                            <h4>
                                {toast.type === "success" && "Success"}
                                {toast.type === "error" && "Error"}
                                {toast.type === "info" && "Info"}
                                {toast.type === "warning" && "Warning"}
                            </h4>

                            <p>{toast.message}</p>
                        </div>

                        <button
                            className="toast-close"
                            onClick={() => removeToast(toast.id)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <span className="toast-progress"></span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);