import { Formik, Form } from "formik";
import { loginSchema } from "../../utils/validationSchemas";
import FormikInput from "../common/FormikInput";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      showToast("Login successful!", "success");
      navigate("/tasks");
    } else {
      showToast(
        "Invalid credentials. User not found or not registered.",
        "error"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Welcome Back</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="d-flex flex-column gap-3">
            <FormikInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />

            <FormikInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />

            <button type="submit" className="btn btn-primary w-100 py-2 mt-2">
              Login
            </button>
            <div className="text-center mt-3">
              <p className="mb-0">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-primary text-decoration-none"
                >
                  Register here
                </a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
