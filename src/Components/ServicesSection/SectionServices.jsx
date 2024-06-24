import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SectionServices = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/Data/Services-Section-Data.json')
      .then(response => {
        setData(response.data.services);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const displayedCards = data.slice(0, 4);

  return (
    <section id="services" className="services section-bg">
      <div className="container">
        <div className="section-title">
          <h2 data-aos="fade-in">Services</h2>
          <p data-aos="fade-in">Here is a brief view of our services.</p>
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
          <Link to="/services-details"><button className="btn btn-warning">View All</button></Link>
        </div>
      </div>
    </section>
  );
};

export default SectionServices;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SectionServices = () => {
//   const [data, setData] = useState([]);
//   const [viewAll, setViewAll] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 4;

//   useEffect(() => {
//     // Fetch data using Axios
//     axios.get('/Data/Services-Section-Data.json')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleViewAllToggle = () => {
//     setViewAll(!viewAll);
//     setCurrentPage(1); // Reset to first page when toggling view mode
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Calculate the cards to display based on view mode and pagination
//   const startIndex = (currentPage - 1) * cardsPerPage;
//   const endIndex = startIndex + cardsPerPage;
//   const displayedCards = viewAll ? data?.services?.slice(startIndex, endIndex) : data?.services?.slice(0, 4);

//   // Calculate total pages for pagination
//   const totalPages = Math.ceil(data?.services?.length / cardsPerPage);

//   return (
//     <section id="services" className="services section-bg">
//       <div className="container">
//         <div className="section-title">
//           <h2 data-aos="fade-in">{data.sectionTitle}</h2>
//           <p data-aos="fade-in">{data.sectionDescription}</p>
//         </div>
//         <div className="row">
//           {displayedCards?.map((service) => (
//             <div key={service.id} className="col-md-6 d-flex" data-aos="fade-right">
//               <div className="card">
//                 <div className="card-img">
//                   <img src={service.image} alt={service.title} />
//                 </div>
//                 <div className="card-body">
//                   <h5 className="card-title"><a href="#">{service.title}</a></h5>
//                   <p className="card-text">{service.description}</p>
//                   <div className="read-more"><a href="#"><i className="bi bi-arrow-right"></i> Read More</a></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="text-center mt-4">
//           {viewAll ? (
//             <>
//               <nav>
//                 <ul className="pagination justify-content-center">
//                   {[...Array(totalPages).keys()].map((page) => (
//                     <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
//                       <button className="page-link" onClick={() => handlePageChange(page + 1)}>
//                         {page + 1}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//               <button className="btn btn-primary" onClick={handleViewAllToggle}>View Less</button>
//             </>
//           ) : (
//             <button className="btn btn-primary" onClick={handleViewAllToggle}>View All</button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SectionServices;
