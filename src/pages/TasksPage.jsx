import TaskList from "../components/task/TaskList";
import { Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Row className="align-items-center mb-6">
        <Col>
          <h1 className="text-2xl font-bold text-gray-800">Task List</h1>
        </Col>
        <Col className="text-end">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </Col>
      </Row>

      <div className="bg-white rounded-lg shadow-md p-6">
        <TaskList />
      </div>
    </div>
  );
};

export default TasksPage;
