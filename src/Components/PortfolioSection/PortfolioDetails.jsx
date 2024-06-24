import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PortfolioDetail = () => {
  const [data, setData] = useState({ filters: [], portfolioItems: [] });
  const [visibleItems, setVisibleItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(6);

  useEffect(() => {
    axios.get('/Data/Portfolio-Section-Data.json')
      .then(response => {
        setData(response.data);
        setVisibleItems(response.data.portfolioItems.slice(0, itemsToShow));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const loadMore = () => {
    setVisibleItems(data.portfolioItems.slice(0, visibleItems.length + 6));
  };

  return (
    <section id="portfolio" className="portfolio section-bg">
      <div className="container">

        <div className="section-title">
          <h2 data-aos="fade-in">{data.sectionTitle}</h2>
          <p data-aos="fade-in">{data.sectionDescription}</p>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <ul id="portfolio-flters">
              {data.filters.map((filter, index) => (
                <li key={index} data-filter={filter.filter} className={index === 0 ? 'filter-active' : ''}>
                  {filter.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row portfolio-container" data-aos="fade-up">
          {visibleItems.map((item, index) => (
            <div key={index} className={`col-lg-4 col-md-6 portfolio-item filter-${item.category.toLowerCase()}`}>
              <div className="portfolio-wrap">
                <img src={item.imageSrc} className="img-fluid" alt={item.title} />
                <div className="portfolio-links">
                  <a href={item.lightboxHref} data-gallery="portfolioGallery" className="portfolio-lightbox" title={item.lightboxTitle}>
                    <i className="bi bi-plus"></i>
                  </a>
                  <a href={item.detailsHref} title="More Details">
                    <i className="bi bi-link"></i>
                  </a>
                </div>
                <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-lg-12 text-center">
            {visibleItems.length < data.portfolioItems.length && (
              <button onClick={loadMore} className="btn btn-primary">Load More</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioDetail;
