import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_t6xdj1v",
        "template_2v8fpui",
        formData,
        "W2kJ5sBMyj0h985ib"
      )
      .then(
        () => {
          setSuccess("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setSuccess("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="py-16 ">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-8  dark:text-white">Contact Me</h2>
        <form onSubmit={sendEmail} className=" p-6 shadow-md rounded-lg">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700">
            Send Message
          </button>
          {success && <p className="text-center mt-4 text-green-500">{success}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
