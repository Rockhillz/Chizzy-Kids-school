import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Spinner,
  Toast,
  ToastContainer,
  ListGroup,
  Form,
} from "react-bootstrap";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  // Loading states for buttons
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");

  const fetchNews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/news`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setNews(data.news || data);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async () => {
    if (!selectedNews) return;
    setIsDeleting(true);
    try {
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/deleteNews/${selectedNews._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchNews();
      setToastMessage("News Deleted successfully!");
      setToastVariant("success");
      setShowDeleteModal(false);
      setShowToast(true);
      setSelectedNews(null);
    } catch (err) {
      console.error("Error deleting news:", err);
      setToastMessage("Failed to delete news!");
      setToastVariant("danger");
      setShowDeleteModal(false);
      setShowToast(true);
      setSelectedNews(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedNews) return;
    setIsUpdating(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/updateNews/${selectedNews._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newTitle !== selectedNews.title ? newTitle : undefined,
            content:
              newContent !== selectedNews.content ? newContent : undefined,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update news");

      await fetchNews(); // Refresh news list

      setToastMessage("News updated successfully!");
      setToastVariant("success");
      setShowEditModal(false);
      setShowToast(true);
      setSelectedNews(null);
      setNewTitle("");
      setNewContent("");
    } catch (err) {
      console.error("Error updating news:", err);
      setToastMessage("Failed to update news. Please try again.");
      setToastVariant("danger");
      setShowEditModal(false);
      setShowToast(true);
      setSelectedNews(null);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateNews = async () => {
    if (!newTitle || !newContent) {
      setToastMessage("Title and content are required");
      setToastVariant("danger");
      setShowCreateModal(false);
      setShowToast(true);
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/createNews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTitle, content: newContent }),
        }
      );

      if (!response.ok) throw new Error("Failed to create news");

      await fetchNews(); // Refresh the news list

      setToastMessage("News created successfully!");
      setToastVariant("success");
      setShowCreateModal(false);
      setNewTitle("");
      setNewContent("");
      setShowToast(true);
    } catch (err) {
      console.error("Error creating news:", err);
      setToastMessage("Failed to create news. Please try again.");
      setToastVariant("danger");
      setShowCreateModal(false);
      setShowToast(true);
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="d-block mx-auto mt-3"
      />
    );
  }

  const toastContainerStyles = {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translate(-50%)",
    zIndex: 1050,
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer style={toastContainerStyles} className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="container">
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h3 className="fs-5">News</h3>
          <Button onClick={() => setShowCreateModal(true)}>Create News</Button>
        </div>

        <ListGroup className="w-100">
          {news.map((item) => (
            <ListGroup.Item
              key={item._id}
              className="d-flex justify-content-between align-items-center"
            >
              <h6 className="mb-1">{item.title}</h6>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedNews(item);
                    setNewTitle(item.title);
                    setNewContent(item.content);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => {
                    setSelectedNews(item);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Create News Modal */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create News</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateNews}
              disabled={isCreating}
            >
              {isCreating ? <Spinner animation="border" size="sm" /> : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit News Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit News</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>News Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)} // Now it's editable
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEdit}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete News Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete News</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this news?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner animation="border" size="sm" /> : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default News;
