import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SectionFAQ = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/Data/FAQ-Section-Data.json')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <section id="faq" className="faq section-bg">
      <div className="container">
        <div className="section-title">
          <h2 data-aos="fade-in">{data.sectionTitle}</h2>
          <p data-aos="fade-in">{data.sectionDescription}</p>
        </div>

        {data.categories.map((category, catIndex) => (
          <div key={catIndex}>
            {category.faqs.map((faq, faqIndex) => (
              <div className="row faq-item d-flex align-items-stretch" data-aos="fade-up" key={`${catIndex}-${faqIndex}`}>
                <div className="col-lg-5">
                  <i className="bx bx-help-circle"></i>
                  <h4>{faq.question}</h4>
                </div>
                <div className="col-lg-7">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="text-center mt-4">
          <Link to="/faq-details">
          <button className="btn btn-warning">
            View All
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionFAQ;
