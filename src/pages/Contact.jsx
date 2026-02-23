import React, { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { FiMail, FiPhone, FiMessageSquare, FiSend, FiCheck, FiX, FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Hidden field to catch bots
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS (use env so switching services only needs .env + Netlify update)
  useEffect(() => {
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey && typeof window !== 'undefined') emailjs.init(publicKey);
  }, []);

  const contactInfo = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email',
      value: 'ancel.ajanga@yahoo.com',
      link: 'mailto:ancel.ajanga@yahoo.com'
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      value: '+254768901257',
      link: 'tel:+254768901257'
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: 'WhatsApp',
      value: '+254793558755',
      link: 'https://wa.me/254793558755'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Ancel-duke',
      icon: <FiGithub className="w-5 h-5" />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/lema.yian._/#',
      icon: <FiInstagram className="w-5 h-5" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ajanga-ancel',
      icon: <FiLinkedin className="w-5 h-5" />
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData.honeypot) {
      return; // Bot detected
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration - matching your template variables
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        title: 'Portfolio Contact Form',
        time: new Date().toLocaleString(),
        reply_to: formData.email, // Add reply_to for better email handling
      };

      // Send email using EmailJS (service/template from env: use Yahoo service_pedd4uw)
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      if (!serviceId || !templateId) throw new Error('EmailJS service/template not configured');
      await emailjs.send(serviceId, templateId, templateParams);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      console.error('Error details:', {
        serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: 'Portfolio Contact Form',
          time: new Date().toLocaleString(),
        }
      });
      
      // Show more specific error message
      if (error.text) {
        console.error('EmailJS Error Text:', error.text);
      }
      if (error.status) {
        console.error('EmailJS Error Status:', error.status);
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <SEO
        title="Contact - Ancel Ajanga | Fullstack Software Engineer"
        description="Contact Ancel Ajanga, a fullstack software engineer from Kenya, for collaboration opportunities, project inquiries, or development services. Available for freelance and full-time opportunities."
  canonicalUrl="https://ancel.co.ke/contact"
      />

      <section className="section-padding pt-24">
        <div className="container-custom">
          <LazyMotion features={domAnimation}>
            <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <m.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mb-6">
              Get In <span className="text-gradient">Touch</span>
            </m.h1>
            <m.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology and development.
            </m.p>
          </m.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <m.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                {/* Honeypot field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center justify-center space-x-2 w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <FiCheck className="w-5 h-5" />
                    <span>Message sent successfully!</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <FiX className="w-5 h-5" />
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}
              </form>
            </m.div>

            {/* Contact Information */}
            <m.div variants={itemVariants} className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="text-primary-600 dark:text-primary-400">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors duration-200"
                      aria-label={`Visit ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
          </LazyMotion>
        </div>
      </section>
    </>
  );
};

export default Contact;
