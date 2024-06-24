import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Header = () => {
  const [headerData, setHeaderData] = useState("");
  const [contactInfo, setContactInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch header data
  useEffect(() => {
    axios
      .get("/Data/Header-data.json")
      .then((response) => setHeaderData(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  // Fetch the last three newly added contact records
  useEffect(() => {
    const savedContacts = localStorage.getItem("contactInfo");
    if (savedContacts) {
      const contacts = JSON.parse(savedContacts);
      // Assuming each contact has a 'timestamp' field to determine the order
      const sortedContacts = contacts.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      const latestThreeContacts = sortedContacts.slice(0, 3);
      setContactInfo(latestThreeContacts);
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
    <>
      <header id="header">
        <div
          className="container d-flex align-items-center justify-content-between"
          style={{ height: "44px" }}
        >
          <div className="logo">
            <h1>
              <a href="index.html" style={{ fontFamily: "Poppins, sans-serif" }}>
                Bocor<span>.</span>
              </a>
            </h1>
            {/* <!-- Uncomment below if you prefer to use an image logo --> */}
            {/* <a href="index.html">
              <img src="assets/img/logo.png" alt="" className="img-fluid" />
            </a> */}
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#team">
                  Team
                </a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Drop Down</span> <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="/subscribe-list">{headerData?.DropDown?.DropDown1}</a>
                  </li>
                  <li className="dropdown">
                    <a href="/contact-list">
                      <span>{headerData?.DropDown?.DropDown}</span>{" "}
                      <i className="bi bi-chevron-right"></i>
                    </a>
                    <ul>
                      {/* Displaying the last three contact records */}
                      {contactInfo.length > 0 ? (
                        contactInfo.map((contact, index) => (
                          <li key={index}>
                            <a href="#" onClick={() => handleView(contact)}>
                              {contact.name} - {contact.email}
                            </a>
                          </li>
                        ))
                      ) : (
                        <li>
                          <a href="#">No recent contacts</a>
                        </li>
                      )}
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="getstarted scrollto" href="#about">
                  Get Started
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      {/* Modal to display contact details */}
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
    </>
  );
};

export default Header;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// const Header = () => {
//   const [headerData, setHeaderData] = useState("");

//   useEffect(() => {
//     axios
//       .get("/Data/Header-data.json")
//       .then((response) => setHeaderData(response.data.data))
//         .catch((error) => console.log(error));
//   }, []);
//     // console.log(headerData);
//   return (
//     <>
//       <header id="header">
//         <div className="container d-flex align-items-center justify-content-between" style={{height:"44px"}}>
//           <div className="logo">
//             <h1>
//               <a href="index.html" style={{fontFamily: "Poppins,sans-serif"}}>
//                 Bocor<span>.</span>
//               </a>
//             </h1>
//             {/* <!-- Uncomment below if you prefer to use an image logo --> */}
//             {/* <a href="index.html">
//               <img src="assets/img/logo.png" alt="" className="img-fluid" />
//             </a> */}
//           </div>

//           <nav id="navbar" className="navbar">
//             <ul>
//               <li>
//                 <a className="nav-link scrollto active" href="#hero">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a className="nav-link scrollto" href="#about">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a className="nav-link scrollto" href="#services">
//                   Services
//                 </a>
//               </li>
//               <li>
//                 <a className="nav-link scrollto" href="#portfolio">
//                   Portfolio
//                 </a>
//               </li>
//               <li>
//                 <a className="nav-link scrollto" href="#team">
//                   Team
//                 </a>
//               </li>
//               <li className="dropdown">
//                 <a href="#">
//                   <span>Drop Down</span> <i className="bi bi-chevron-down"></i>
//                 </a>
//                 <ul>
//                   <li>
//                     <a href="/subscribe-list">{headerData?.DropDown?.DropDown1}</a>
//                   </li>
//                   <li className="dropdown">
//                     <a href="/contact-list">
//                       <span>{headerData?.DropDown?.DropDown}</span>{" "}
//                       <i className="bi bi-chevron-right"></i>
//                     </a>
//                     <ul>
//                       {headerData?.DeepDropDown?.map((dropDownItem) => (
//                         <li>
//                           <a href="#">{dropDownItem}</a>
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <a className="nav-link scrollto" href="#contact">
//                   Contact
//                 </a>
//               </li>
//               <li>
//                 <a
//                   className="getstarted scrollto"
//                   href="#about"
//                 >
//                   Get Started
//                 </a>
//               </li>
//             </ul>
//             <i className="bi bi-list mobile-nav-toggle"></i>
//           </nav>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;
