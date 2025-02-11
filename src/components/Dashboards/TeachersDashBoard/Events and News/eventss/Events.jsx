import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import Box from "./Box";

const Events = () => {
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // 'success' or 'danger'

  // Loading states for buttons
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/events`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setEvents(data.events || data);
    } catch (err) {
      console.error("Error fetching events:", err);
      showToastMessage("Failed to fetch events", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Show toast message
  const showToastMessage = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  // Handle delete event
  const handleDelete = async (eventId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/deleteEvent/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        await fetchEvents()
        // setEvents(events.filter((event) => event._id !== eventId));
        setShowDeleteModal(false);
        showToastMessage("Event deleted successfully");
      } else {
        showToastMessage("Failed to delete event", "danger");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      showToastMessage("Failed to delete event", "danger");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle edit event
  const handleEdit = async (updatedEvent) => {
    setIsUpdating(true);
    console.log(updatedEvent);
    console.log(updatedEvent._id);
    console.log("Update Payload:", { title, description, date, selectedImage });

    try {
      const formData = new FormData();
      formData.append("title", updatedEvent.title);
      formData.append("description", updatedEvent.description);
      formData.append("date", updatedEvent.date);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/updateEvent/${updatedEvent._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        await fetchEvents();
        setSelectedImage(null);
        setShowEditModal(false);
        showToastMessage("Event updated successfully");
      } else {
        showToastMessage("Failed to update event", "danger");
      }
    } catch (err) {
      console.error("Error updating event:", err);
      showToastMessage("Failed to update event", "danger");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle create event
  const handleCreateEvent = async (newEvent) => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      formData.append("date", newEvent.date);
      formData.append("image", newEvent.image);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/createEvent`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const createdEvent = await response.json();
        // setEvents([...events, createdEvent]);
        await fetchEvents();
        setShowCreateModal(false);
        showToastMessage("Event created successfully");
      } else {
        showToastMessage("Failed to create event", "danger");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      showToastMessage("Failed to create event", "danger");
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

      <div className="events-container">
        <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <h3 className="fs-5 fs-md-3 mb-2 mb-md-0">Events</h3>
          <Button
            className="bg-t btn-sm btn-md"
            onClick={() => setShowCreateModal(true)}
          >
            Create Event
          </Button>
        </div>

        {/* Events List */}
        <div style={containerStyle}>
          {events.map((event) => (
            <Box
              key={event._id}
              image={event.image}
              title={event.title}
              date={event.date}
              description={event.description}
              onEdit={() => {
                setSelectedEvent(event);
                setShowEditModal(true);
              }}
              onDelete={() => {
                setSelectedEvent(event);
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
            <Modal.Title>Delete Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the event:{" "}
            <strong>{selectedEvent?.title}</strong>?
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
              onClick={() => handleDelete(selectedEvent?._id)}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner animation="border" size="sm" /> : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Event Modal */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedEvent = {
                  ...selectedEvent,
                  title: e.target.title.value,
                  description: e.target.description.value,
                  date: e.target.date.value,
                };
                handleEdit(updatedEvent);
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
                  defaultValue={selectedEvent?.title}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  defaultValue={selectedEvent?.description}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  defaultValue={selectedEvent?.date.split("T")[0]}
                  required
                />
              </div>
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

        {/* Create Event Modal */}
        <Modal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newEvent = {
                  title: e.target.title.value,
                  description: e.target.description.value,
                  date: e.target.date.value,
                  image: e.target.image.files[0],
                };
                handleCreateEvent(newEvent);
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

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea className="form-control" id="description" required />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  required
                />
              </div>
              <Button type="submit" variant="primary" disabled={isCreating}>
                {isCreating ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Create Event"
                )}
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Events;
