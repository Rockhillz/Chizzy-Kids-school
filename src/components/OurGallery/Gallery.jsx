import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import OurGallery from "./OurGallery";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  // Loading states for buttons
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");

  const fetchGallery = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/gallery`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setGallery(data.gallery || data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      showToastMessage("Failed to fetch gallery", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Show toast message
  const showToastMessage = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  // Handle delete gallery item
  const handleDelete = async (galleryId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/deleteGallery/${galleryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        await fetchGallery();
        setShowDeleteModal(false);
        showToastMessage("Gallery item deleted successfully");
      } else {
        showToastMessage("Failed to delete gallery item", "danger");
      }
    } catch (err) {
      console.error("Error deleting gallery item:", err);
      showToastMessage("Failed to delete gallery item", "danger");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle edit gallery item
  const handleEdit = async (updatedGallery) => {
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("title", updatedGallery.title);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/updateGallery/${updatedGallery._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        await fetchGallery();
        setSelectedImage(null);
        setShowEditModal(false);
        showToastMessage("Gallery item updated successfully");
      } else {
        showToastMessage("Failed to update gallery item", "danger");
      }
    } catch (err) {
      console.error("Error updating gallery item:", err);
      showToastMessage("Failed to update gallery item", "danger");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle create gallery item
  const handleCreateGallery = async (newGallery) => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("title", newGallery.title);
      formData.append("image", newGallery.image);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/createGallery`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchGallery();
        setShowCreateModal(false);
        showToastMessage("Gallery item created successfully");
      } else {
        showToastMessage("Failed to create gallery item", "danger");
      }
    } catch (err) {
      console.error("Error creating gallery item:", err);
      showToastMessage("Failed to create gallery item", "danger");
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

  // Styles
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
    gap: "1rem",
  };

  // Toast Container styles
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

      <div className="gallery-container">
        <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <h3 className="fs-5 fs-md-3 mb-2 mb-md-0">Gallery</h3>
          <Button
            className="bg-t btn-sm btn-md"
            onClick={() => setShowCreateModal(true)}
          >
            Create Gallery Item
          </Button>
        </div>

        {/* Gallery List */}
        <div style={containerStyle}>
          {gallery.map((item) => (
            <OurGallery
              key={item._id}
              image={item.image}
              title={item.title}
              onEdit={() => {
                setSelectedGallery(item);
                setShowEditModal(true);
              }}
              onDelete={() => {
                setSelectedGallery(item);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Gallery Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the gallery item:{" "}
            <strong>{selectedGallery?.title}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(selectedGallery?._id)}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner animation="border" size="sm" /> : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Gallery Modal */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Gallery Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedGallery = {
                  ...selectedGallery,
                  title: e.target.title.value,
                };
                handleEdit(updatedGallery);
              }}
            >
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  defaultValue={selectedGallery?.title}
                  required
                />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  defaultValue={selectedGallery?.description}
                  required
                />
              </div> */}
              <Button type="submit" variant="primary" disabled={isUpdating}>
                {isUpdating ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* Create Gallery Modal */}
        <Modal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Gallery Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newGallery = {
                  title: e.target.title.value,
                  image: e.target.image.files[0],
                };
                handleCreateGallery(newGallery);
              }}
            >
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                />
              </div>

              {/* <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea className="form-control" id="description" required />
              </div> */}

              <Button type="submit" variant="primary" disabled={isCreating}>
                {isCreating ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Create Gallery Item"
                )}
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Gallery;