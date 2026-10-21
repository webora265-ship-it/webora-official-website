import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Smartphone, MonitorPlay } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    title: 'Web Design & UI/UX',
    description: 'We craft stunning, user-centric interfaces that captivate and convert visitors.',
    icon: <Palette size={40} className="service-icon" />
  },
  {
    title: 'Custom Web Development',
    description: 'High-performance, scalable web applications built with the latest modern frameworks.',
    icon: <Code size={40} className="service-icon" />
  },
  {
    title: 'Mobile App Design',
    description: 'Seamless mobile experiences that look and feel premium across all devices.',
    icon: <Smartphone size={40} className="service-icon" />
  },
  {
    title: '3D & Motion Graphics',
    description: 'Interactive 3D elements and smooth animations that bring your brand to life.',
    icon: <MonitorPlay size={40} className="service-icon" />
  }
];

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What We <span className="text-gradient">Do</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Delivering premium digital solutions for brands that refuse to blend in.
        </motion.p>
      </div>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <motion.div 
            className="service-card glass"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="icon-wrapper">
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
