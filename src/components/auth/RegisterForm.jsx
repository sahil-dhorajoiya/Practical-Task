import { Formik, Form } from "formik";
import { registerSchema } from "../../utils/validationSchemas";
import FormikInput from "../common/FormikInput";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userData = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      password: values.password,
    };

    existingUsers.push(userData);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Create Account</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="d-flex flex-column gap-3">
              <FormikInput
                label="Name"
                name="name"
                placeholder="Enter your name"
              />

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

              <FormikInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
              />

              <button type="submit" className="btn btn-primary w-100 py-2 mt-2">
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
              <div className="text-center mt-3">
                <p className="mb-0">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-primary text-decoration-none"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
