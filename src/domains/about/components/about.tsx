import React from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { OptimizedImage } from '@/shared/components/ui/optimized-image'
import { useAnimationsEnabled } from '@/contexts/AnimationsContext'
import { getSectionVariants } from '@/shared/utils/animation-variants'
import { Download, MapPin, Calendar, Code, Users, Award, Target, GraduationCap, Rocket, Briefcase, Github, Linkedin, Globe } from 'lucide-react'
import { cn } from '@/shared/utils'
import { SITE } from '@/shared/constants/site'

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
    <LazyMotion features={domAnimation}>
      <section id="about" className={cn('section-padding w-full overflow-x-hidden min-w-0 max-w-full', className)}>
        <m.div
        className="container-custom max-w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.div variants={itemVariants} className="text-center mb-16 px-4 sm:px-0">
          {fullPage ? (
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
              About <span className="text-gradient">Me</span>
            </h1>
          ) : (
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
              About <span className="text-gradient">Me</span>
            </h2>
          )}
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start min-w-0">
          {/* Left Column: Profile & Philosophy */}
          <div className="space-y-8">
            {/* Profile Card */}
            <m.div variants={itemVariants}>
              <Card className="overflow-hidden">
                {/* Hero image: responsive height — 50vw on mobile, 480px fixed on desktop */}
                <div className="relative w-full flex-shrink-0 overflow-hidden rounded-t-lg"
                     style={{ height: 'clamp(280px, 45vw, 480px)' }}>
                  <OptimizedImage
                    src={SITE.profileImage}
                    alt="Ancel Ajanga"
                    width={800}
                    height={960}
                    quality={90}
                    priority
                    skipNetlifyCDN
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full"
                    objectFit="cover"
                    objectPosition="top center"
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
                      <span>{SITE.company.role}, {SITE.company.name} · {SITE.company.type}</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <a href="/assets/Resume%20(1).pdf" download>
                      <Download className="mr-2 h-4 w-4" /> Download Resume
                    </a>
                  </Button>

                  {/* External profile links — entity graph anchors */}
                  <div className="flex gap-3 mt-3">
                    <a
                      href={SITE.github}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label="Ancel Ajanga on GitHub"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                    <a
                      href={SITE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label="Ancel Ajanga on LinkedIn"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a
                      href="/ai-index"
                      aria-label="AI / machine-readable index"
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                      title="Machine-readable entity index"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </m.div>

          </div>

          {/* Right Column: About Me, Skills & Achievements */}
          <div className="space-y-8">
            {/* Current Role */}
            <m.div variants={itemVariants}>
              <Card>
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Current Role</h3>
                  <div className="space-y-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    <p>{SITE.copy.currentRoleLead}</p>
                    <p>{SITE.copy.aboutPortfolioIndependence}</p>
                  </div>
                </CardContent>
              </Card>
            </m.div>

            {/* About Me */}
            <m.div variants={itemVariants}>
              <Card>
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">About Me</h3>
                  <div className="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    <p>
                      Hi, I'm Ancel Ajanga (also known as Duke), a <strong className="text-foreground">Staff Software Engineer &amp; Lead Systems Architect</strong> specializing in distributed systems and high-performance engineering. I build production-grade backbones — from meticulously crafted UIs to resilient distributed backends — with a relentless focus on performance, reliability, and transactional integrity.
                    </p>
                    <p>
                      Based in Nairobi, Kenya, I specialize in architecting systems that bridge the gap between AI-driven automation and production safety. My expertise spans four key domains:
                    </p>
                    <div className="grid grid-cols-2 gap-4 my-6">
                      <Link href="/expertise/system-architecture" className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-blue-500/50 transition-all text-sm font-medium text-slate-300">
                        System Architecture
                      </Link>
                      <Link href="/expertise/backend-engineering" className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-all text-sm font-medium text-slate-300">
                        Backend Engineering
                      </Link>
                      <Link href="/expertise/frontend-engineering" className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-purple-500/50 transition-all text-sm font-medium text-slate-300">
                        Frontend Engineering
                      </Link>
                      <Link href="/expertise/distributed-systems" className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-orange-500/50 transition-all text-sm font-medium text-slate-300">
                        Distributed Systems
                      </Link>
                    </div>
                    <p>
                      <strong className="text-foreground">Resilient Fullstack Systems:</strong> I build end-to-end platforms like <Link href="/projects/nestfi" className="text-primary hover:underline">NestFi</Link>, combining hybrid storage with strict ledger integrity to solve the 'Blind Trust' problem in financial engineering.
                    </p>
                    <p>
                      <strong className="text-foreground">Infrastructure &amp; Intelligent Operations:</strong> I design self-healing systems such as <Link href="/projects/aegis" className="text-primary hover:underline">Aegis</Link>, where machine learning is gated by OPA policies and cryptographically signed intents.
                    </p>
                    <p>
                      <strong className="text-foreground">Data &amp; Privacy Architecture:</strong> In projects like <Link href="/projects/inkly" className="text-primary hover:underline">Inkly</Link>, I implement Zero-Knowledge cryptographic lifecycles to ensure data sovereignty in collaborative environments.
                    </p>
                    <p>
                      <strong className="text-foreground">Frontend Engineering &amp; UI Systems:</strong> I engineer robust interactive architectures and fluid interfaces. Discover my <Link href="/#frontend-engineering" className="text-primary hover:underline">UI Experiments &amp; Frontend Labs</Link> to see how I balance rigorous performance metrics with highly creative interaction design.
                    </p>
                    <p>
                      From real-time WebSocket-driven platforms (SignFlow) to multi-tenant SaaS architectures (EduManage), I focus on service isolation, containerization, and fault-tolerant design patterns. I don't just build features—I design the systems that keep products stable, secure, and scalable as they grow.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </m.div>

            {/* Skills */}
            <m.div variants={itemVariants}>
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
            </m.div>

            {/* Achievements */}
            <m.div variants={itemVariants}>
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
            </m.div>
          </div>
        </div>

        {/* Technical Arsenal */}
        <m.div variants={itemVariants} className="mt-12">
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
        </m.div>

        {/* Technologies & Career Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Technologies */}
          <m.div variants={itemVariants}>
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
          </m.div>

          {/* Career Goals */}
          <m.div variants={itemVariants}>
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
          </m.div>
        </div>

        {/* Professional Experience & Education */}
        <m.div variants={itemVariants} className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Briefcase className="h-6 w-6 mr-2 text-primary" /> Professional Experience &amp; Education
              </h3>
              <div className="space-y-8">
                {/* Lead Systems Engineer — independent portfolio & consulting */}
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
        </m.div>
      </m.div>
      </section>
    </LazyMotion>
  )
}

