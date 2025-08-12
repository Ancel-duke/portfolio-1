import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiAward, FiBookOpen, FiHeart, FiMusic, FiCamera, FiCoffee, FiTarget, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi';

const About = () => {
  const skills = [
    'React', 'React Native', 'Flutter', 'Machine Learning', 'Node.js', 'MongoDB', 
    'Express', 'Laravel', 'Axios', 'PHP', 'Python', 'Django', 'Flask', 
    'HTML', 'CSS', 'Tailwind CSS', 'Angular', 'Vue', 'SvelteKit', 'JavaScript',
    'Java', '.NET', 'TypeScript', 'GraphQL', 'Docker', 'AWS', 'Electron'
  ];

  const timeline = [
    {
      icon: <FiBookOpen className="w-5 h-5" />,
      title: 'Full Stack Developer — Freelance / Personal Projects',
      period: 'March 2024 - Present',
      description: 'Started freelancing and building impactful solutions including RoadRescue service app and HeartSync relationship platform. Specializing in React, clean code, and beautiful UI design.'
    },
    {
      icon: <FiAward className="w-5 h-5" />,
      title: 'Full Stack Development Certificate — Moringa School',
      period: 'Completed 2022',
      description: 'Comprehensive full-stack development program covering modern web technologies and best practices.'
    },
    {
      icon: <FiCalendar className="w-5 h-5" />,
      title: 'Coding Journey Begins — Student Projects',
      period: '2021 - March 2024',
      description: 'Started learning to code as a student, building personal projects and developing foundational skills in web development and programming.'
    },
    {
      icon: <FiCalendar className="w-5 h-5" />,
      title: 'Computer Science Degree — University of the People',
      period: 'Currently Enrolled',
      description: 'Pursuing advanced computer science studies while actively building real-world applications.'
    },
    {
      icon: <FiAward className="w-5 h-5" />,
      title: 'Diploma in Software Engineering',
      period: 'Completed',
      description: 'Foundation in software engineering principles and development methodologies.'
    }
  ];

  const hobbies = [
    {
      icon: <FiMusic className="w-5 h-5" />,
      title: 'Music & Travel',
      description: 'I love listening to rap, R&B, pop, afrobeats, and Kenyan fusion. I also enjoy traveling and exploring new places.'
    },
    {
      icon: <FiCamera className="w-5 h-5" />,
      title: 'Photography',
      description: 'I do photography really well - capturing moments and telling stories through visual art.'
    },
    {
      icon: <FiHeart className="w-5 h-5" />,
      title: 'Life Coaching & Therapy',
      description: 'I act as a life coach and therapist on life and relationship matters, helping people grow and communicate better.'
    },
    {
      icon: <FiCoffee className="w-5 h-5" />,
      title: 'Morning Rituals',
      description: 'I start my day by seeing loved ones first, then probably a cup of tea to set the right tone.'
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
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start"
        >
          {/* Left Column - Bio */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate Fullstack Software Engineer from Narok County, Kenya, with a love for creating impactful solutions that solve real-world problems. My journey in tech began in 2021 as a student, and I started freelancing in March 2024. Since then, I've been crafting complete software applications — from mobile apps to web platforms — using diverse tech stacks.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                I hold a diploma in Software Engineering and am currently pursuing a Computer Science degree at the University of the People, complemented by certifications from Moringa School for Fullstack Development. My approach combines clean code principles, beautiful UI design, and optimal performance to deliver solutions that make people smile.
              </p>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                I believe in the power of technology to transform lives and create meaningful connections. Whether it's building user-friendly interfaces, optimizing performance, or architecting scalable solutions, I approach every project with creativity and attention to detail.
              </p>
            </div>

            {/* Current Projects */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Current Projects</h3>
              <div className="space-y-3 sm:space-y-4">
                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FiTarget className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">RoadRescue Service App</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        A real-world problem-solving app that's currently in testing phase. This project demonstrates my ability to create practical solutions.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FiHeart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">HeartSync Platform</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        A relationship platform helping couples grow closer and learn better communication with intention. Currently in development.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Career Goals */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Career Goals</h3>
              <div className="space-y-4">
                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FiTarget className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Short-term Goal</h4>
                                             <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                         Lead Software Engineer at Microsoft, Google, or Oracle within 8-10 years.
                       </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FiUsers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Long-term Vision</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Use my coding expertise to start my own Tech College and empower the next generation of developers.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Personal Philosophy */}
            <div>
              <h3 className="text-xl font-semibold mb-4">My Philosophy</h3>
              <div className="space-y-4">
                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FiTarget className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Problem Solving</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        I love solving problems and helping people. There's nothing better than seeing someone smile because of what I've created.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FiZap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Coding Philosophy</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Clean code, beautiful UI, and optimal performance. React is my number one choice - it's easy and engaging to use.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <FiTrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Continuous Learning</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        I absorb new knowledge quickly and never say I know something completely - tech keeps evolving, so I keep learning.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

                         {/* Hobbies */}
             <div>
               <h3 className="text-xl font-semibold mb-4">Hobbies & Interests</h3>
               <div className="grid sm:grid-cols-2 gap-4">
                 {hobbies.map((hobby, index) => (
                   <motion.div
                     key={index}
                     variants={itemVariants}
                     className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                   >
                     <div className="flex items-start space-x-3">
                       <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
                         {hobby.icon}
                       </div>
                       <div>
                         <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                           {hobby.title}
                         </h4>
                         <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                           {hobby.description}
                         </p>
                       </div>
                     </div>
                   </motion.div>
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
