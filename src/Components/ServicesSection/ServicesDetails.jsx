import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ServiceDetail = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  useEffect(() => {
    // Fetch data using Axios
    axios.get('/Data/Services-Section-Data.json')
      .then(response => {
        setData(response.data.services);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the cards to display based on pagination
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedCards = data.slice(startIndex, endIndex);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(data.length / cardsPerPage);

  return (
    <section id="services" className="services section-bg">
      <div className="container">
        <div className="section-title">
          <h2 data-aos="fade-in">Services</h2>
          <p data-aos="fade-in">Here is a detailed view of our services.</p>
        </div>
        <div className="row">
          {displayedCards.map((service) => (
            <div key={service.id} className="col-md-6 d-flex" data-aos="fade-right">
              <div className="card">
                <div className="card-img">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="card-body">
                  <h5 className="card-title"><a href="#">{service.title}</a></h5>
                  <p className="card-text">{service.description}</p>
                  <div className="read-more"><a href="#"><i className="bi bi-arrow-right"></i> Read More</a></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <nav>
            <ul className="pagination justify-content-center">
              {[...Array(totalPages).keys()].map((page) => (
                <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/"><button className="btn btn-primary">Back</button></Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
