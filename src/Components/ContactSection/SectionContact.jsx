import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

const SectionContact = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState(() => {
    const savedContacts = localStorage.getItem("contactInfo");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [toggleCard, setToggleCard] = useState(false);

  useEffect(() => {
    axios
      .get("/Data/Contact-Section-Data.json")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
  }, [contactInfo]);

  const formik = useFormik({
    initialValues: {
      name: "",
      subject: "",
      email: "",
      gender: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      subject: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      gender: Yup.string().required("Required"),
      message: Yup.string().required("Your post should have a description"),
    }),
    onSubmit: (values) => {
      setContactInfo([values, ...contactInfo]);
      setToggleCard(true);
      // Show success toast notification
      toast.success("Message sent successfully!");
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer /> {/* Toast Container to show the toast messages */}
      <section id="contact" className="contact section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>{data.sectionTitle}</h2>
            <p>{data.sectionDescription}</p>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-12">
                  <div className="info-box" data-aos="fade-up">
                    <i className="bx bx-map"></i>
                    <h3>{data.addressHeading}</h3>
                    <p>{data.addressDescription}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="info-box mt-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="bx bx-envelope"></i>
                    <h3>{data.emailHeading}</h3>
                    <p>
                      {data.emailDescription1}
                      <br />
                      {data.emailDescription2}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="info-box mt-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="bx bx-phone-call"></i>
                    <h3>{data.callHeading}</h3>
                    <p>
                      {data.callDescription1}
                      <br />
                      {data.callDescription2}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              {toggleCard ? (
                <div
                  className="card text-center mb-3"
                  style={{ width: "45rem" }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title">Your Details</h5>
                    <p className="card-text">Name : {formik.values.name}</p>
                    <p className="card-text">Email : {formik.values.email}</p>
                    <p className="card-text">
                      Subject : {formik.values.subject}
                    </p>
                    <p className="card-text">
                      gender : {formik.values.gender}
                    </p>
                    <p className="card-text">
                      Message : {formik.values.message}
                    </p>

                    <h4>Thank You</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        `${setToggleCard(false)} ${formik.resetForm()}`
                      }
                    >
                      Another Inquiry ??
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={formik.handleSubmit}
                  className="php-email-form w-100"
                  data-aos="fade-up"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                      ) : null}
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <div className="text-danger">{formik.errors.subject}</div>
                    ) : null}
                  </div>
                  <div className="form-group mt-3">
                    <select
                      className="form-control"
                      name="gender"
                      id="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="" label="Select gender" />
                      <option value="male" label="Male" />
                      <option value="female" label="Female" />
                      <option value="other" label="Other" />
                    </select>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="text-danger">{formik.errors.gender}</div>
                    ) : null}
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      placeholder="Message"
                      id="message"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.message && formik.errors.message ? (
                      <div className="text-danger">{formik.errors.message}</div>
                    ) : null}
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionContact;
