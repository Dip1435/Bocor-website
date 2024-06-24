
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SectionTeam = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedItems, setDisplayedItems] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    axios
      .get('/Data/Team-Section-Data.json')
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setDisplayedItems(response.data.Team.slice(0, itemsPerPage));
      })
      .catch((error) => {
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
      <section id="team" className="team section-bg">
        <div className="container">
          <div className="section-title">
            <h2 data-aos="fade-in">{data.sectionTitle}</h2>
            <p data-aos="fade-in">{data.sectionDescription}</p>
          </div>

          <div className="row">
            {displayedItems.map((team) => (
              <div key={team.id} className="col-xl-3 col-lg-4 col-md-6">
                <div className="member" data-aos="fade-up" data-aos-delay={team.dataAosDelay}>
                  <div className="pic">
                    <img src={team.image} alt="" />
                  </div>
                  <h4>{team.name}</h4>
                  <span>{team.role}</span>
                  <div className="social">
                    <a href={team.social.twitter}><i className={team.social.twitterIcon}></i></a>
                    <a href={team.social.facebook}><i className={team.social.facebookIcon}></i></a>
                    <a href={team.social.instagram}><i className={team.social.instagramIcon}></i></a>
                    <a href={team.social.linkedin}><i className={team.social.linkedinIcon}></i></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="team-detail"><button className="btn btn-warning">View All</button></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionTeam;










// import axios from 'axios';
// import React, { useEffect, useState, useCallback } from 'react';

// const SectionTeam = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [displayedItems, setDisplayedItems] = useState([]);
//   const [currentOffset, setCurrentOffset] = useState(0);
//   const itemsPerPage = 4;

//   useEffect(() => {
//     axios
//       .get('/Data/Team-Section-Data.json')
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//         setDisplayedItems(response.data.Team.slice(0, itemsPerPage));
//         setCurrentOffset(itemsPerPage);
//       })
//       .catch((error) => {
//         console.error('Error fetching the data:', error);
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   const loadMoreItems = useCallback(() => {
//     if (data) {
//       const nextItems = data.Team.slice(currentOffset, currentOffset + itemsPerPage);
//       setDisplayedItems((prevItems) => [...prevItems, ...nextItems]);
//       setCurrentOffset((prevOffset) => prevOffset + itemsPerPage);
//     }
//   }, [data, currentOffset]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
//         loadMoreItems();
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [loadMoreItems]);

//   const handleViewAll = () => {
//     if (data) {
//       setDisplayedItems(data.Team);
//       setCurrentOffset(data.Team.length);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading data</div>;
//   }

//   return (
//     <>
//       <section id="team" className="team section-bg">
//         <div className="container">
//           <div className="section-title">
//             <h2 data-aos="fade-in">{data.sectionTitle}</h2>
//             <p data-aos="fade-in">{data.sectionDescription}</p>
//           </div>

//           <div className="row">
//             {displayedItems.map((team) => (
//               <div key={team.id} className="col-xl-3 col-lg-4 col-md-6">
//                 <div className="member" data-aos="fade-up" data-aos-delay={team.dataAosDelay}>
//                   <div className="pic">
//                     <img src={team.image} alt="" />
//                   </div>
//                   <h4>{team.name}</h4>
//                   <span>{team.role}</span>
//                   <div className="social">
//                     <a href={team.social.twitter}><i className={team.social.twitterIcon}></i></a>
//                     <a href={team.social.facebook}><i className={team.social.facebookIcon}></i></a>
//                     <a href={team.social.instagram}><i className={team.social.instagramIcon}></i></a>
//                     <a href={team.social.linkedin}><i className={team.social.linkedinIcon}></i></a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-4">
//             <button className="btn btn-primary" onClick={handleViewAll}>View All</button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SectionTeam;
