import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const SectionFooter = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/Data/Footer-Section-Data.json")
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

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Check if email is already in localStorage
    const storedEmails =
      JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    if (storedEmails.includes(values.email)) {
      // alert("Email already subscribed");
      toast.error("Email already subscribed")
    } else {
      // Store email in localStorage
      localStorage.setItem(
        "subscribedEmails",
        JSON.stringify([...storedEmails, values.email])
      );
      // alert("Successfully subscribed");
      toast.success("Successfully subscribed")
    }
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row  justify-content-center">
              <div className="col-lg-6">
                <h3>{data.sectionTitle}</h3>
                <p>{data.sectionDescription}</p>
              </div>
            </div>

            <div className="row footer-newsletter justify-content-center">
              <div className="col-lg-6">
                <form onSubmit={formik.handleSubmit} method="post">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                  <input
                    type="submit"
                    value="Subscribe"
                    disabled={formik.isSubmitting}
                  />
                </form>
              </div>
            </div>

            <div className="social-links">
              <a href="#" className="twitter">
                <i className={data.social.twitterIcon}></i>
              </a>
              <a href="#" className="facebook">
                <i className={data.social.facebookIcon}></i>
              </a>
              <a href="#" className="instagram">
                <i className={data.social.instagramIcon}></i>
              </a>
              <a href="#" className="google-plus">
                <i className={data.social.googleIcon}></i>
              </a>
              <a href="#" className="linkedin">
                <i className={data.social.linkedinIcon}></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom clearfix">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Bocor</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            {/* <!-- All the links in the footer should remain intact. -->
    <!-- You can delete the links only if you purchased the pro version. -->
    <!-- Licensing information: https://bootstrapmade.com/license/ -->
    <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/bocor-bootstrap-template-nice-animation/ --> */}
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SectionFooter;
