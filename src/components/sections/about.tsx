import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Download, MapPin, Calendar, Code, Users, Award, Target, GraduationCap, Lightbulb, Rocket } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AboutProps {
  className?: string;
  fullPage?: boolean;
}

export function About({ className }: AboutProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const skills = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'JavaScript', level: 95, category: 'Language' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Python', level: 80, category: 'Language' },
    { name: 'Django', level: 85, category: 'Backend' },
    { name: 'Flutter', level: 75, category: 'Mobile' },
    { name: 'Dart', level: 75, category: 'Language' },
    { name: 'Vue.js', level: 80, category: 'Frontend' },
    { name: 'Angular', level: 75, category: 'Frontend' },
    { name: 'MongoDB', level: 75, category: 'Database' },
    { name: 'PostgreSQL', level: 80, category: 'Database' },
    { name: 'MySQL', level: 70, category: 'Database' },
    { name: 'Solidity', level: 70, category: 'Blockchain' },
    { name: 'AWS', level: 70, category: 'Cloud' },
    { name: 'Git', level: 85, category: 'Tools' },
    { name: 'Docker', level: 65, category: 'DevOps' },
    { name: 'Tailwind CSS', level: 90, category: 'Styling' },
    { name: 'CSS3', level: 90, category: 'Styling' },
    { name: 'HTML5', level: 95, category: 'Frontend' }
  ]

  const technologies = {
    'Frontend': ['React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js'],
    'Backend': ['Node.js', 'Python', 'Django', 'Express.js', 'NestJS'],
    'Mobile': ['Flutter', 'Dart', 'React Native'],
    'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Prisma'],
    'Blockchain & Web3': ['Solidity', 'Hardhat', 'OpenZeppelin', 'RainbowKit', 'Wagmi', 'ethers.js', 'IPFS'],
    'Cloud & DevOps': ['AWS', 'Docker', 'Git', 'CI/CD'],
    'Tools': ['VS Code', 'Figma', 'Postman', 'GitHub']
  }

  const achievements = [
    {
      icon: Users,
      title: '50+ Happy Clients',
      description: 'Satisfied customers across various industries'
    },
    {
      icon: Award,
      title: '30+ Projects Built & Completed',
      description: 'Spanning fintech, edtech, fitness, travel, and productivity apps'
    },
    {
      icon: Calendar,
      title: '4+ Years Experience',
      description: 'Continuous learning and growth since 2021'
    }
  ]

  const careerGoals = [
    {
      icon: Rocket,
      title: 'Lead Technical Teams',
      description: 'Aspire to lead development teams and mentor junior developers in creating innovative solutions.'
    },
    {
      icon: Target,
      title: 'Build Scalable Products',
      description: 'Create applications that can handle millions of users and make a significant impact in the tech industry.'
    },
    {
      icon: Code,
      title: 'Contribute to Open Source',
      description: 'Give back to the developer community by contributing to meaningful open-source projects.'
    },
    {
      icon: Award,
      title: 'Start a Tech Company',
      description: 'Eventually launch my own technology company focused on solving real-world problems in Africa.'
    }
  ]

  return (
    <section id="about" className={cn('section-padding', className)}>
      <motion.div
        className="container-custom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code and the passion that drives my work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Profile & Philosophy */}
          <div className="space-y-8">
            {/* Profile Card */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src="/assets/profile_photo.jpg"
                    alt="Ancel Ajanga"
                    className="w-full h-80 sm:h-96 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-3xl font-bold">Ancel Ajanga</h3>
                    <p className="text-lg text-muted-foreground">Fullstack Software Engineer/Developer & App Developer</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-5 w-5 mr-3 text-primary" /> Nairobi, Kenya (from Narok)
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-5 w-5 mr-3 text-primary" /> Started coding in 2021
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-5 w-5 mr-3 text-primary" /> Freelancing since March 2024
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <a href="/assets/resume.pdf" download>
                      <Download className="mr-2 h-4 w-4" /> Download Resume
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Philosophy */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Lightbulb className="h-6 w-6 mr-2 text-primary" /> My Philosophy
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      I believe in creating technology that serves people, not the other way around. 
                      Every line of code should have a purpose, every feature should solve a real problem.
                    </p>
                    <p>
                      My approach combines technical excellence with user-centered design, ensuring that 
                      the applications I build are not only powerful but also intuitive and accessible.
                    </p>
                    <p>
                      I'm passionate about continuous learning and staying at the forefront of technology 
                      to deliver the best solutions for my clients.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: About Me, Skills & Achievements */}
          <div className="space-y-8">
            {/* About Me */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">About Me</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Hi, I'm Ancel (also known as Duke). I'm a Fullstack Software Engineer/Developer specializing in web development, app development, AI integration, and SEO optimization. 
                      I love building apps that solve real-world problems while also expressing my creativity through code. 
                      Beyond tech, I enjoy connecting with people, sharing ideas, and expressing myself through writing poems.
                    </p>
                    <p>
                      Based in Nairobi, Kenya (originally from Narok), I specialize in React, TypeScript, Node.js, Python, Flutter, AI integration, and SEO optimization. 
                      I'm currently creating a Flutter app that will be available on Android, iOS, and web platforms. 
                      I love creating scalable, user-friendly applications that solve real-world problems 
                      and make a positive impact.
                    </p>
                    <p>
                      When I'm not coding, you'll find me exploring new technologies, contributing to 
                      open-source projects, or sharing my knowledge with the developer community.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6">Key Achievements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="text-center">
                        <div className="flex justify-center mb-2">
                          <achievement.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold text-lg">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Technologies & Career Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Technologies */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Code className="h-6 w-6 mr-2 text-primary" /> Technologies & Tools
                </h3>
                <div className="space-y-6">
                  {Object.entries(technologies).map(([category, techs], index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-lg mb-3 text-primary">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Career Goals */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-primary" /> Career Goals
                </h3>
                <div className="space-y-6">
                  {careerGoals.map((goal, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <goal.icon className="h-6 w-6 text-primary mt-1" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{goal.title}</h4>
                        <p className="text-muted-foreground">{goal.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div variants={itemVariants} className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <GraduationCap className="h-6 w-6 mr-2 text-primary" /> Education & Learning Journey
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h4 className="font-semibold text-lg">Full Stack Developer — Freelance / Personal Projects</h4>
                  <p className="text-sm text-primary font-medium mb-2">March 2024 - Present</p>
                  <p className="text-muted-foreground">
                    Started freelancing and building impactful solutions including RoadRescue service app and HeartSync relationship platform. 
                    Specializing in React, clean code, and beautiful UI design.
                  </p>
                </div>
                <div className="border-l-4 border-accent pl-6 py-2">
                  <h4 className="font-semibold text-lg">Full Stack Development Certificate — Moringa School</h4>
                  <p className="text-sm text-accent font-medium mb-2">Completed 2022</p>
                  <p className="text-muted-foreground">
                    Comprehensive full-stack development program covering modern web technologies and best practices.
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-6 py-2">
                  <h4 className="font-semibold text-lg">Coding Journey Begins — Student Projects</h4>
                  <p className="text-sm text-muted-foreground mb-2">2021 - March 2024</p>
                  <p className="text-muted-foreground">
                    Started learning to code as a student, building personal projects and developing foundational skills 
                    in web development and programming.
                  </p>
                </div>
                <div className="border-l-4 border-secondary pl-6 py-2">
                  <h4 className="font-semibold text-lg">Computer Science Degree</h4>
                  <p className="text-sm text-secondary-foreground font-medium mb-2">Currently Enrolled (Part-time)</p>
                  <p className="text-muted-foreground">
                    Pursuing a part-time computer science degree while actively building real-world applications.
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-6 py-2">
                  <h4 className="font-semibold text-lg">Diploma in Software Engineering</h4>
                  <p className="text-sm text-muted-foreground mb-2">Completed</p>
                  <p className="text-muted-foreground">
                    Mastered core software engineering principles, development methodologies, and hands-on practical skills including system design, agile practices, and modern development workflows.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}