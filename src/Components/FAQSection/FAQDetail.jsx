// FAQDetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQDetailPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/Data/FAQ-Section-Data.json')
      .then(response => {
        setCategories(response.data.categories);
        setSelectedCategory(null); // Select the first category by default
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <ul className="list-group">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`list-group-item ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                style={{ cursor: 'pointer' }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          <div className="accordion" id="faqAccordion">
            {selectedCategory && selectedCategory.faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button
                    className="accordion-button collapsed" // Ensure button starts in collapsed state
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                    aria-expanded="false" // Set aria-expanded to false by default
                    aria-controls={`collapse-${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse-${index}`}
                  className="accordion-collapse collapse" // Ensure the collapse class is set
                  aria-labelledby={`heading-${index}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQDetailPage;
