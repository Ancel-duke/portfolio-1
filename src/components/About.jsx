import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiAward, FiBookOpen } from 'react-icons/fi';

const About = () => {
  const skills = [
    'React', 'React Native', 'Machine Learning', 'Node.js', 'MongoDB', 
    'Express', 'Laravel', 'Axios', 'PHP', 'Python', 'Django', 'Flask', 
    'HTML', 'CSS', 'Tailwind CSS', 'Angular', 'Vue', 'JavaScript'
  ];

  const timeline = [
    {
      icon: <FiBookOpen className="w-5 h-5" />,
      title: 'Full Stack Developer — Freelance / Personal Projects',
      period: '2022 - Present',
      description: 'Built and shipped multiple full-stack web apps; handled backend APIs, frontend UIs and deployment.'
    },
    {
      icon: <FiAward className="w-5 h-5" />,
      title: 'Certificate — Full Stack Development — Moringa School',
      period: 'Graduated: Feb 2022',
      description: 'Completed comprehensive full-stack development program covering modern web technologies.'
    },
    {
      icon: <FiCalendar className="w-5 h-5" />,
      title: 'Diploma (in progress) — Institute of Software Technologies',
      period: 'Expected Graduation: Nov 2025',
      description: 'Currently pursuing advanced software development studies and practical applications.'
    }
  ];

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
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a self-driven, innovative, and insightful software engineer with a friendly sense of humour. I thrive under pressure, communicate clearly, and solve problems proactively. I work effectively solo or in teams, and I step into leadership when projects need direction. I focus on building reliable, maintainable, and performant solutions.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold mb-6">Experience & Education</h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline line */}
                  {index < timeline.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200 dark:bg-gray-700"></div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                        {item.period}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
