import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
