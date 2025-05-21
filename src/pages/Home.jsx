import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Alert } from 'react-bootstrap';
import { PencilSquare, Trash, PlusCircle } from 'react-bootstrap-icons';
import { getNotes, createNote, updateNote, deleteNote } from '../services/noteService';

const Home = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      setError('');
      const notesData = await getNotes(user.token);
      setNotes(notesData);
    } catch (error) {
      setError(error.toString());
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        setError('');
        await deleteNote(id, user.token);
        fetchNotes(); // Refresh the notes list after deletion
      } catch (error) {
        setError(error.toString());
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateNote(currentNote._id, currentNote, user.token);
      } else {
        await createNote(currentNote, user.token);
      }
      setShowModal(false);
      setCurrentNote({ title: "", content: "" });
      fetchNotes();
    } catch (error) {
      alert("Error saving note");
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
      <Row className="mb-4">
        <Col>
          <Button
            variant="primary"
            onClick={() => {
              setIsEditing(false);
              setCurrentNote({ title: '', content: '' });
              setShowModal(true);
            }}
            className="d-flex align-items-center"
          >
            <PlusCircle size={20} className="me-2" /> Create New Note
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Card>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEdit(note)}
                    className="d-flex align-items-center"
                  >
                    <PencilSquare size={16} className="me-1" /> Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(note._id)}
                    className="d-flex align-items-center"
                  >
                    <Trash size={16} className="me-1" /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? (
              <span className="d-flex align-items-center">
                <PencilSquare size={20} className="me-2" /> Edit Note
              </span>
            ) : (
              <span className="d-flex align-items-center">
                <PlusCircle size={20} className="me-2" /> Create Note
              </span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="d-flex align-items-center">
              {isEditing ? (
                <>
                  <PencilSquare size={16} className="me-2" /> Save Changes
                </>
              ) : (
                <>
                  <PlusCircle size={16} className="me-2" /> Create Note
                </>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Home;
