import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import Box from "./Box";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setEvents(data.events || data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle delete event
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/deleteEvent/${eventId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents(events.filter((event) => event._id !== eventId));
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Handle edit event
  const handleEdit = async (updatedEvent) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/${updatedEvent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (response.ok) {
        const updatedEvents = events.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        );
        setEvents(updatedEvents);
        setShowEditModal(false);
      }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  // Handle create event
  const handleCreateEvent = async (newEvent) => {
    try {
      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      formData.append("date", newEvent.date);
      formData.append("image", newEvent.image);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/createEvent`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const createdEvent = await response.json();
        setEvents([...events, createdEvent]);
        setShowCreateModal(false);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-3" />;
  }

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
    gap: "1rem",
  };

  return (
    <div className="events-container">
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <h3 className="fs-5 fs-md-3 mb-2 mb-md-0">Events</h3>
        <Button className="bg-t btn-sm btn-md" onClick={() => setShowCreateModal(true)}>
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the event: <strong>{selectedEvent?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedEvent?._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Event Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
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
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Create Event Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
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
              <input type="file" className="form-control" id="image" accept="image/*" required />
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input type="text" className="form-control" id="title" required />
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
              <input type="date" className="form-control" id="date" required />
            </div>
            
            <Button type="submit" variant="primary">
              Create Event
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Events;
