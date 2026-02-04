import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { OptimizedImage } from '../ui/optimized-image'
import { useAnimationsEnabled } from '../../contexts/AnimationsContext'
import { getSectionVariants } from '../../lib/animation-variants'
import { Download, MapPin, Calendar, Code, Users, Award, Target, GraduationCap, Rocket, Briefcase } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AboutProps {
  className?: string;
  fullPage?: boolean;
}

export function About({ className, fullPage }: AboutProps) {
  const animationsEnabled = useAnimationsEnabled()
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabled)

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
          {fullPage ? (
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
              About <span className="text-gradient">Me</span>
            </h1>
          ) : (
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
              About <span className="text-gradient">Me</span>
            </h2>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left Column: Profile & Philosophy */}
          <div className="space-y-8">
            {/* Profile Card */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
                <div className="relative w-full flex-shrink-0 h-80 sm:h-96 overflow-hidden rounded-t-lg">
                  <OptimizedImage
                    src="/assets/profile_photo.jpg"
                    alt="Ancel Ajanga"
                    width={400}
                    height={400}
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full"
                    imgClassName="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white pointer-events-none">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Ancel Ajanga</h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/90">Fullstack Software Engineer &amp; Systems Architect</p>
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
                      <span>Software Engineer (Independent Consultant) | 2024– Present</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <a href="/assets/Resume%20(1).pdf" download>
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
                      Hi, I'm Ancel Ajanga (also known as Duke), a Fullstack Software Engineer focused on building resilient, production-grade systems. I specialize in designing software that balances strong backend architecture with clean, intuitive user experiences. While I enjoy crafting polished interfaces, my primary focus is on reliability, scalability, and long-term maintainability.
                    </p>
                    <p>
                      Based in Nairobi, Kenya, I work across the full software lifecycle—from system design to deployment—turning complex ideas into robust, real-world applications. My approach is grounded in three core areas:
                    </p>
                    <p>
                      <strong className="text-foreground">Resilient Fullstack Systems:</strong> I build end-to-end platforms like Fits by Aliv, combining Flutter frontends with NestJS backends and leading complex migrations from BaaS solutions to self-hosted PostgreSQL infrastructures.
                    </p>
                    <p>
                      <strong className="text-foreground">Infrastructure &amp; Intelligent Operations:</strong> I design self-healing systems such as Aegis, where machine learning is used to detect anomalies and automate Kubernetes remediation, helping maintain high availability in production environments.
                    </p>
                    <p>
                      <strong className="text-foreground">Data &amp; Financial Integrity:</strong> In projects like LedgerX, I implement double-entry accounting engines secured with append-only cryptographic hash chains to ensure strong auditability and data correctness.
                    </p>
                    <p>
                      From real-time WebSocket-driven platforms (SignFlow) to multi-tenant SaaS architectures (EduManage), I focus on service isolation, containerization, and fault-tolerant design patterns. I don't just build features—I design the systems that keep products stable, secure, and scalable as they grow.
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

        {/* Professional Experience & Education */}
        <motion.div variants={itemVariants} className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Briefcase className="h-6 w-6 mr-2 text-primary" /> Professional Experience &amp; Education
              </h3>
              <div className="space-y-8">
                {/* Lead Systems Engineer */}
                <div>
                  <h4 className="font-semibold text-lg text-foreground">Lead Systems Engineer (Independent Consultant)</h4>
                  <p className="text-sm text-primary font-medium mb-2">March 2024 – Present</p>
                  <p className="text-muted-foreground mb-4">
                    Architecting resilient, production-grade infrastructure and financial systems for private clients and enterprise-level scale.
                  </p>
                  <ul className="space-y-3 text-muted-foreground text-sm pl-4 border-l-2 border-primary/30">
                    <li><strong className="text-foreground">NestFi (Fintech):</strong> Engineered a resilient financial coordination platform using a PostgreSQL/MongoDB hybrid architecture to ensure ACID compliance for transactions while maintaining high-throughput event logging for asynchronous mobile money payments.</li>
                    <li><strong className="text-foreground">Aegis (AI-Driven Security):</strong> Developed an autonomous infrastructure monitoring system that uses AI to detect behavioral anomalies and execute controlled remediation actions within strict isolation boundaries.</li>
                    <li><strong className="text-foreground">LedgerX (Enterprise Finance):</strong> Built a multi-tenant finance engine featuring a SHA-256 Cryptographic Hash Layer, creating an immutable, tamper-evident audit trail for every financial record.</li>
                  </ul>
                </div>
                {/* Software Engineer Contract & Project Lead */}
                <div>
                  <h4 className="font-semibold text-lg text-foreground">Software Engineer (Contract &amp; Project Lead)</h4>
                  <p className="text-muted-foreground mb-4">
                    Focused on scaling operational platforms and complex multi-tenant SaaS architectures.
                  </p>
                  <ul className="space-y-3 text-muted-foreground text-sm pl-4 border-l-2 border-accent/30">
                    <li><strong className="text-foreground">OpsFlow (Operations Management):</strong> Designed a real-time incident response platform using WebSockets for sub-second synchronization and a dual-database strategy to separate transactional workflows from analytical reporting.</li>
                    <li><strong className="text-foreground">EduManage (Multi-tenant SaaS):</strong> Architected a school management system with Hierarchical RBAC and strict tenant isolation, ensuring secure data boundaries for multiple institutions on a single shared infrastructure.</li>
                    <li><strong className="text-foreground">Full-Stack Development:</strong> Delivered various production-ready solutions (RoadRescue, HeartSync) focusing on React performance and clean code standards.</li>
                  </ul>
                </div>
                {/* Education */}
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" /> Education
                  </h4>
                  <ul className="space-y-2 text-muted-foreground text-sm pl-4 border-l-2 border-muted">
                    <li><strong className="text-foreground">B.S. in Computer Science</strong> — Currently Enrolled (Part-time)</li>
                    <li><strong className="text-foreground">Diploma in Software Engineering</strong> — Completed</li>
                    <li><strong className="text-foreground">Full Stack Development Certificate</strong> — Moringa School (2022)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}