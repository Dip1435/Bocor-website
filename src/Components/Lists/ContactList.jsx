import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ContactList = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const savedContacts = localStorage.getItem("contactInfo");
    if (savedContacts) {
      setContactInfo(JSON.parse(savedContacts));
    }
  }, []);

  const handleView = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="container mt-5">
      <h2>Contact List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Gender</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactInfo.length > 0 ? (
            contactInfo.map((contact, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>{contact.gender}</td>
                <td>{contact.message}</td>
                <td>
                  <Button variant="primary" onClick={() => handleView(contact)}>
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {selectedContact && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Subject:</strong> {selectedContact.subject}</p>
            <p><strong>Gender:</strong> {selectedContact.gender}</p>
            <p><strong>Message:</strong> {selectedContact.message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ContactList;
