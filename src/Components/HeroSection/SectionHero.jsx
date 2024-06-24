// SectionHero.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

const SectionHero = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/Data/Hero-Section-Data.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
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
    <>
      <Carousel>
        {data.map((item, index) => (
          <Carousel.Item interval={3000} key={index}>
            <section id="hero">
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div
                    className="col-lg-6 py-5 py-lg-0 order-2 order-lg-1"
                    data-aos="fade-right"
                  >
                    <h1>{item.heading}</h1>
                    <h2>{item.subheading}</h2>
                    <a
                      href={item.buttonHref}
                      className="btn-get-started scrollto"
                    >
                      {item.buttonText}
                    </a>
                  </div>
                  <div
                    className="col-lg-6 order-1 order-lg-2 hero-media-container"
                    data-aos="fade-left"
                  >
                    {item.type === "image" && (
                      <img
                        src={item.Src}
                        className="img-fluid"
                        alt={item.imgAlt}
                      />
                    )}
                    {item.type === "video" && (
                      <video
                        className="hero-video"
                        controls
                        autoPlay
                        loop
                        muted
                      >
                        <source src={item.Src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default SectionHero;
