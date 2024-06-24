import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AboutModal from '../Modals/AboutModal';

const SectionAbout = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get('/Data/About-Section-Data.json')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <section id="about" className="about section-bg">
        <div className="container">
          <div className="row gy-4">
            <div className="image col-xl-5"><img src={data.imgSrc} className='img-fluid' alt="" /></div>
            <div className="col-xl-7">
              <div className="content d-flex flex-column justify-content-center ps-0 ps-xl-4">
                <h3 data-aos="fade-in" data-aos-delay="100">{data.title}</h3>
                <p data-aos="fade-in">
                  {data.description.slice(0, 70)}
                  {data.description.length > 70 && (
                    <>
                      ...
                      <a onClick={toggleModal} className='text-primary' style={{ cursor: 'pointer' }}>
                        <i className="bi bi-arrow-right"></i> Read More
                      </a>
                    </>
                  )}
                </p>
                <div className="row gy-4 mt-3">
                  {data.iconBoxes.map((iconBox) => (
                    <div className="col-md-6 icon-box" key={iconBox.id} data-aos="fade-up" data-aos-delay={iconBox.delay}>
                      <i className={iconBox.iconClass}></i>
                      <h4><a href="#">{iconBox.title}</a></h4>
                      <p>{iconBox.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutModal 
        show={showModal} 
        handleClose={toggleModal} 
        title={data.title} 
        description={data.description} 
      />
    </>
  );
};

export default SectionAbout;
