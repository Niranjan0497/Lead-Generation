import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaEnvelope, FaBuilding, FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";

function LeadIntake() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email format";
    }
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setStatus("");

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setStatus("✅ Lead submitted successfully!");
          setFormData({ name: "", email: "", company: "", message: "" });
        } else {
          setStatus("❌ Submission failed. Try again.");
        }
      } catch (err) {
        setStatus("⚠️ An error occurred.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-50 d-flex align-items-center justify-content-center" >
      <div className="row w-100" style={{ maxWidth: "1200px" }}>
        <div className="col-md-6 d-flex align-items-center justify-content-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="fw-bold text-primary">Welcome to Our Platform!</h1>
            <p className="mt-3 text-secondary">
              Fill in your details to get in touch with our team. We'll help you
              find the best solution for your business needs.
            </p>
          </motion.div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <motion.div
            className="card shadow p-5 rounded-4 w-100"
            style={{ backgroundColor: "#ffffff", border: "1px solid #dee2e6" }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center mb-4 fw-bold text-primary">🚀 Lead Generation Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-4 position-relative">
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                />
                <label htmlFor="name">Name *</label>
                <FaUser className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary" />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="form-floating mb-4 position-relative">
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email *</label>
                <FaEnvelope className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary" />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="form-floating mb-4 position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                />
                <label htmlFor="company">Company</label>
                <FaBuilding className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary" />
              </div>

              <div className="form-floating mb-4 position-relative">
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  placeholder="Message"
                  style={{ height: "120px" }}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message">Message</label>
                <FaCommentDots className="position-absolute top-0 end-0 mt-3 me-3 text-primary" />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
                disabled={loading}
              >
                {loading && <div className="spinner-border spinner-border-sm" role="status"></div>}
                Submit
              </motion.button>

              {status && (
                <motion.div
                  className="alert alert-info mt-3 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {status}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LeadIntake;
