import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import { Button, Form, Modal } from 'react-bootstrap';
import Styled from 'styled-components';

const Dashboard = () => {
    const [dashboards, setDashboards] = useState([]);
    const [newBoard, setNewBoard] = useState({ title: '', owner: '' });
    const [editBoard, setEditBoard] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const backendUrl = "http://localhost:5000"

    useEffect(() => {
        // Function to fetch data from the backend server
        const fetchData = async () => {
            try {
                const response = await fetch(`${backendUrl}/boards`);
                const result = await response.json();
                setDashboards(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call fetchData when the component mounts
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBoard({ ...newBoard, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/boards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBoard),
            });
            const result = await response.json();
            setDashboards([...dashboards, result]);
            setNewBoard({ title: '', owner: '' });
        } catch (error) {
            console.error('Error creating new board:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://your-backend-server-url/boards/${id}`, {
                method: 'DELETE',
            });
            setDashboards(dashboards.filter((dashboard) => dashboard.id !== id));
        } catch (error) {
            console.error('Error deleting board:', error);
        }
    };

    const handleEdit = (board) => {
        setEditBoard(board);
        setShowEditModal(true);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://your-backend-server-url/boards/${editBoard.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editBoard),
            });
            const result = await response.json();
            setDashboards(dashboards.map((dashboard) => (dashboard.id === result.id ? result : dashboard)));
            setShowEditModal(false);
            setEditBoard(null);
        } catch (error) {
            console.error('Error updating board:', error);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditBoard({ ...editBoard, [name]: value });
    };

    return (
        <div>
            <TopNavBar />
            <Wrapper>
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>Create New Board</Button>
                <div className="container mt-4">
                    <div className="row">
                        {dashboards.map((dashboard) => (
                            <div key={dashboard.id} className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <a href={`/dashboardInfo/${dashboard.id}`}>
                                                {dashboard.title}
                                            </a>
                                        </h5>
                                        <p className="card-text">Owner: {dashboard.owner}</p>
                                        <Button variant="warning" onClick={() => handleEdit(dashboard)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(dashboard.id)}>Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Wrapper>

            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Board</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newBoard.title}
                                onChange={handleInputChange}
                                placeholder="Enter board title"
                            />
                        </Form.Group>
                        <Form.Group controlId="formOwner">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                type="text"
                                name="owner"
                                value={newBoard.owner}
                                onChange={handleInputChange}
                                placeholder="Enter board owner"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Board</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={editBoard?.title || ''}
                                onChange={handleEditInputChange}
                                placeholder="Enter board title"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditOwner">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                type="text"
                                name="owner"
                                value={editBoard?.owner || ''}
                                onChange={handleEditInputChange}
                                placeholder="Enter board owner"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const Wrapper = Styled.section`
    Button {
        margin:0 0 0 50px;
    }
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        font-family: Arial;
    }
    `;

export default Dashboard;
