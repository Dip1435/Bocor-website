import React, { useEffect, useState } from "react";

const SubscribeList = () => {
  const [subscribedEmails, setSubscribedEmails] = useState([]);

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    setSubscribedEmails(storedEmails);
  }, []);

  return (
    <div className="container mt-4">
      <h3>Subscribed Emails</h3>
      {subscribedEmails.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {subscribedEmails.map((email, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No subscribed emails found.</p>
      )}
    </div>
  );
};

export default SubscribeList;
