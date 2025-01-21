import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaSearch, FaSort } from "react-icons/fa";
import { Formik, Form as FormikForm, Field } from "formik";
import { taskSchema } from "../../utils/validationSchemas";
import { dummyTasks } from "../../utils/common";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    setTasks(dummyTasks);
  }, []);

  const handleAddTask = (values, { resetForm }) => {
    const task = {
      id: Date.now(),
      ...values,
    };
    setTasks([...tasks, task]);
    resetForm();
  };

  const handleEditTask = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredAndSortedTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compareValue = sortDirection === "asc" ? 1 : -1;
      return a.title > b.title ? compareValue : -compareValue;
    });

  return (
    <Container className="py-4">
      <Card className="mb-4">
        <Card.Body>
          <Formik
            initialValues={{ title: "", description: "" }}
            validationSchema={taskSchema}
            onSubmit={handleAddTask}
          >
            {({ errors, touched }) => (
              <FormikForm>
                <Form.Group className="mb-3">
                  <Field
                    name="title"
                    type="text"
                    placeholder="Task title"
                    as={Form.Control}
                  />
                  {errors.title && touched.title && (
                    <div className="text-danger">{errors.title}</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Field
                    name="description"
                    type="text"
                    placeholder="Task description"
                    as={Form.Control}
                  />
                  {errors.description && touched.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </Form.Group>
                <Button type="submit" variant="primary">
                  Add Task
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Card.Body>
      </Card>

      <Row className="mb-4">
        <Col md={10}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={2}>
          <Button
            variant="outline-secondary"
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            <FaSort /> {sortDirection.toUpperCase()}
          </Button>
        </Col>
      </Row>

      <div className="task-list">
        {filteredAndSortedTasks.map((task) => (
          <Card key={task.id} className="mb-3">
            <Card.Body>
              {editingTask?.id === task.id ? (
                <Formik
                  initialValues={editingTask}
                  validationSchema={taskSchema}
                  onSubmit={(values) => handleEditTask(values)}
                >
                  {({ errors, touched }) => (
                    <FormikForm>
                      <Form.Group className="mb-3">
                        <Field name="title" type="text" as={Form.Control} />
                        {errors.title && touched.title && (
                          <div className="text-danger">{errors.title}</div>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Field
                          name="description"
                          type="text"
                          as={Form.Control}
                        />
                        {errors.description && touched.description && (
                          <div className="text-danger">
                            {errors.description}
                          </div>
                        )}
                      </Form.Group>
                      <Button type="submit" variant="primary" className="me-2">
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditingTask(null)}
                      >
                        Cancel
                      </Button>
                    </FormikForm>
                  )}
                </Formik>
              ) : (
                <>
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text text-muted">{task.description}</p>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      onClick={() => setEditingTask(task)}
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default TaskList;
