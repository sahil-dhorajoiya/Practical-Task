import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage"; // Ensure this component exists
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/route/protectedRoute";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
