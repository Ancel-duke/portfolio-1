import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Download, MapPin, Calendar, Code, Users, Award, Target, GraduationCap, Rocket } from 'lucide-react'
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

  const technicalArsenal: { domain: string; tools: string[] }[] = [
    { domain: 'Frontend & Mobile', tools: ['Flutter 3.x (Dart)', 'Next.js 14', 'React 18', 'TypeScript', 'TanStack Query', 'Material 3', 'Tailwind CSS'] },
    { domain: 'Backend & APIs', tools: ['NestJS 10', 'Node.js', 'Prisma ORM', 'RESTful APIs', 'WebSockets (Socket.io)', 'Firebase Admin SDK'] },
    { domain: 'Architecture & Reliability', tools: ['Microservices', 'Multi-tenant SaaS', 'Circuit Breakers', 'Event-Driven Design', 'Distributed Systems'] },
    { domain: 'Infrastructure & Cloud', tools: ['Kubernetes (K8s)', 'Docker', 'Terraform', 'Prometheus & Grafana', 'Cloudflare', 'Render', 'Netlify'] },
    { domain: 'Data & Security', tools: ['PostgreSQL (Transactional)', 'MongoDB (Logs)', 'Redis (Caching)', 'HMAC Signature Verification', 'JWT/RBAC'] },
    { domain: 'Specialized Tech', tools: ['AIOps (Anomaly Detection)', 'Double-entry Ledgers', 'Cryptographic Hash Chains', 'Twilio OTP'] }
  ]

  const achievements = [
    {
      icon: Users,
      title: '10K+ Users Supported',
      description: 'Scalable systems handling thousands of concurrent users'
    },
    {
      icon: Award,
      title: '50+ API Endpoints',
      description: 'Enterprise-grade RESTful APIs with comprehensive features'
    },
    {
      icon: Target,
      title: 'Multi-Tenant Architectures',
      description: 'Secure, isolated systems supporting multiple organizations'
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
    <section id="about" className={cn('section-padding w-full overflow-x-hidden', className)}>
      <motion.div
        className="container-custom max-w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16 px-4 sm:px-0">
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code and the passion that drives my work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left Column: Profile & Philosophy */}
          <div className="space-y-8">
            {/* Profile Card */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src="/assets/profile_photo.jpg"
                    alt="Ancel Ajanga"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width="400"
                    height="400"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-80 sm:h-96 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Ancel Ajanga</h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/90">Fullstack Software Engineer & Systems Architect</p>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex items-center text-muted-foreground text-sm sm:text-base">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary flex-shrink-0" /> 
                      <span className="break-words">Nairobi, Kenya (from Narok)</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm sm:text-base">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary flex-shrink-0" /> 
                      <span>Started coding in 2021</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm sm:text-base">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary flex-shrink-0" /> 
                      <span>Freelancing since March 2024</span>
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

          </div>

          {/* Right Column: About Me, Skills & Achievements */}
          <div className="space-y-8">
            {/* About Me */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">About Me</h3>
                  <div className="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    <p>
                      Hi, I'm Ancel Ajanga (also known as Duke). I am a Fullstack Software Engineer specializing in enterprise-grade system architecture. My passion lies at the intersection of robust backend engineering and seamless user experiences. While I love building polished interfaces, I view software through the lens of resilience and governance—ensuring every application is as stable as it is functional.
                    </p>
                    <p>
                      Based in Nairobi, Kenya, I design and deploy full-cycle solutions that bridge the gap between high-level theory and gritty, production-ready execution. My work is defined by three core technical pillars:
                    </p>
                    <p>
                      <strong className="text-foreground">Resilient Fullstack Architecture:</strong> I build end-to-end systems like Fits by Aliv, blending responsive Flutter frontends with NestJS backends and complex migration strategies from BaaS to self-hosted PostgreSQL.
                    </p>
                    <p>
                      <strong className="text-foreground">Infrastructure & AIOps:</strong> I engineer "self-healing" control planes like Aegis that use Machine Learning to detect anomalies and automate Kubernetes remediation, ensuring 99.9% uptime.
                    </p>
                    <p>
                      <strong className="text-foreground">Financial & Data Integrity:</strong> In projects like LedgerX, I implement double-entry accounting engines secured by append-only cryptographic hash chains to guarantee 100% auditability.
                    </p>
                    <p>
                      Whether I'm optimizing WebSocket-powered real-time systems (SignFlow) or architecting multi-tenant enterprise SaaS (EduManage), I focus on service isolation, containerization, and fault-tolerant patterns. I don't just write code; I architect the engines that drive digital transformation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Technical Skills</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Key Achievements</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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

        {/* Technical Arsenal */}
        <motion.div variants={itemVariants} className="mt-12">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                <Code className="h-6 w-6 mr-2 text-primary" /> Technical Arsenal
              </h3>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-[280px]">
                  {technicalArsenal.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-sm text-primary border-b border-border pb-1">{item.domain}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.tools.join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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