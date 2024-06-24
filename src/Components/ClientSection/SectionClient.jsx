import axios from 'axios';
import React, { useEffect, useState } from 'react'


const SectionClient = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios.get('/Data/Client-Section-Data.json')
      .then(response => {
        setData(response.data.clients);
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
      <>
       <section id="clients" className="clients section-bg">
      <div className="container">

          <div className="row no-gutters clients-wrap clearfix wow fadeInUp">
            
            {data.map((image) => 
            <div className="col-lg-2 col-md-4 col-6" key={image.id}>
                <div className="client-logo">
                  <a href={image.link} target='_blank' rel='noopener noreferrer'>
              <img src={image.img} className="img-fluid" alt="" data-aos="flip-right" 
                data-aos-delay={image.dataAosDelay} />
                    
                  </a>
            </div>
          </div>
            
            )}
        </div>

      </div>
    </section>
      </>
  )
}

export default SectionClient