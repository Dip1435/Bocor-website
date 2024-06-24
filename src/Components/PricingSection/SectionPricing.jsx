import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SectionPricing = () => {
  const [data, setData] = useState({ sectionTitle: '', sectionDescription: '', plans: [] });

  useEffect(() => {
    // Fetch data using Axios
    axios.get('/Data/Pricing-Section-Data.json')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <section id="pricing" className="pricing section-bg">
      <div className="container">

        <div className="section-title">
          <h2 data-aos="fade-in">{data.sectionTitle}</h2>
          <p data-aos="fade-in">{data.sectionDescription}</p>
        </div>

        <div className="row no-gutters">
          {data.plans.map((plan, index) => (
            <div className={`col-lg-4 box ${plan.featured ? 'featured' : ''}`} data-aos="zoom-in" key={index}>
              {plan.featured && <span className="featured-badge">Featured</span>}
              <h3>{plan.name}</h3>
              <h4>{plan.price}<span>{plan.period}</span></h4>
              <ul>
                {plan.features.map((feature, i) => (
                  <li key={i} className={feature.available ? '' : 'na'}>
                    <i className={`bx ${feature.available ? 'bx-check' : 'bx-x'}`}></i>
                    <span>{feature.feature}</span>
                  </li>
                ))}
              </ul>
              <a href={plan.ctaLink} className="get-started-btn">{plan.ctaText}</a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SectionPricing;







// import React from 'react'

// const SectionPricing = () => {
//   return (
//       <>
//        <section id="pricing" className="pricing section-bg">
//       <div className="container">

//         <div className="section-title">
//           <h2 data-aos="fade-in">Pricing</h2>
//           <p data-aos="fade-in">Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum
//             quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias
//             ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
//         </div>

//         <div className="row no-gutters">

//           <div className="col-lg-4 box" data-aos="zoom-in">
//             <h3>Free</h3>
//             <h4>$0<span>per month</span></h4>
//             <ul>
//               <li><i className="bx bx-check"></i> Quam adipiscing vitae proin</li>
//               <li><i className="bx bx-check"></i> Nec feugiat nisl pretium</li>
//               <li><i className="bx bx-check"></i> Nulla at volutpat diam uteera</li>
//               <li className="na"><i className="bx bx-x"></i> <span>Pharetra massa massa ultricies</span></li>
//               <li className="na"><i className="bx bx-x"></i> <span>Massa ultricies mi quis hendrerit</span></li>
//             </ul>
//             <a href="#" className="get-started-btn">Get Started</a>
//           </div>

//           <div className="col-lg-4 box featured" data-aos="zoom-in">
//             <span className="featured-badge">Featured</span>
//             <h3>Business</h3>
//             <h4>$29<span>per month</span></h4>
//             <ul>
//               <li><i className="bx bx-check"></i> Quam adipiscing vitae proin</li>
//               <li><i className="bx bx-check"></i> Nec feugiat nisl pretium</li>
//               <li><i className="bx bx-check"></i> Nulla at volutpat diam uteera</li>
//               <li><i className="bx bx-check"></i> Pharetra massa massa ultricies</li>
//               <li><i className="bx bx-check"></i> Massa ultricies mi quis hendrerit</li>
//             </ul>
//             <a href="#" className="get-started-btn">Get Started</a>
//           </div>

//           <div className="col-lg-4 box" data-aos="zoom-in">
//             <h3>Developer</h3>
//             <h4>$49<span>per month</span></h4>
//             <ul>
//               <li><i className="bx bx-check"></i> Quam adipiscing vitae proin</li>
//               <li><i className="bx bx-check"></i> Nec feugiat nisl pretium</li>
//               <li><i className="bx bx-check"></i> Nulla at volutpat diam uteera</li>
//               <li><i className="bx bx-check"></i> Pharetra massa massa ultricies</li>
//               <li><i className="bx bx-check"></i> Massa ultricies mi quis hendrerit</li>
//             </ul>
//             <a href="#" className="get-started-btn">Get Started</a>
//           </div>

//         </div>

//       </div>
//     </section>
//       </>
//   )
// }

// export default SectionPricing