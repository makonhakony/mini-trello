// Card.js
import React, { useState } from 'react';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

const Card = ({ show, handleClose, cardData }) => {

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete the project' },
    { id: 2, text: 'Review the code' },
    { id: 3, text: 'Submit the report' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, text: newTask }]);
      setNewTask('');
    }
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.text);
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map(task => task.id === currentTask.id ? { ...task, text: newTask } : task));
    setIsEditing(false);
    setNewTask('');
    setCurrentTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Show Tasks
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{cardData}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task.id}>
                {task.text}
                <FaRegEdit style={{ float: 'right', cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleEditTask(task)} />
                <FaTrashAlt style={{ float: 'right', cursor: 'pointer' }} onClick={() => handleDeleteTask(task.id)} />
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form.Control
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{ marginTop: '10px' }}
          />
          <Button variant="primary" onClick={isEditing ? handleUpdateTask : handleAddTask} style={{ marginTop: '10px' }}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Card;
