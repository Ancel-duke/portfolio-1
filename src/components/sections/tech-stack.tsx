import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { cn } from "../../lib/utils"
import { 
  BarChart3, 
  TrendingUp, 
  Code2, 
  Database, 
  Palette,
  Globe,
  Zap,
  Shield,
  TestTube,
  Layers,
  Server
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import stackData from "../../data/stack.json"

interface TechStackProps {
  className?: string;
  fullPage?: boolean;
}

interface Technology {
  name: string
  category: string
  icon: string
  frequency: number
  proficiency: number
  description: string
  projects: string[]
}


const categoryIconMap = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Cache: Database,
  Styling: Palette,
  Language: Globe,
  API: Zap,
  Integration: Zap,
  Edge: Globe,
  DevOps: Layers,
  Deployment: Layers,
  Tools: Code2,
  ORM: Layers,
  ODM: Layers,
  Storage: Database,
  Blockchain: Layers,
  Web3: Layers,
  Visualization: BarChart3,
  Maps: Globe,
  'Real-time': Zap,
  Mobile: Code2,
  'State Management': Layers,
  Authentication: Shield,
  Security: Shield,
  'HTTP Client': Zap,
  Animation: Palette,
  Testing: TestTube
}

const categoryColors = {
  Frontend: '#3b82f6',
  Backend: '#10b981',
  Database: '#8b5cf6',
  Cache: '#6366f1',
  Styling: '#ec4899',
  Language: '#f59e0b',
  API: '#06b6d4',
  Integration: '#4f46e5',
  Edge: '#0ea5e9',
  DevOps: '#64748b',
  Deployment: '#22c55e',
  Tools: '#6b7280',
  ORM: '#06b6d4',
  ODM: '#6366f1',
  Storage: '#14b8a6',
  Blockchain: '#475569',
  Web3: '#3b82f6',
  Visualization: '#ef4444',
  Maps: '#22c55e',
  'Real-time': '#f97316',
  'State Management': '#6366f1',
  Authentication: '#84cc16',
  Security: '#ef4444',
  'HTTP Client': '#14b8a6',
  Animation: '#a855f7',
  Testing: '#eab308'
}

export const TechStack = React.memo(function TechStack({ className }: TechStackProps) {
  const [activeTab, setActiveTab] = React.useState('frequency')

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  // Memoize chart data preparation to prevent unnecessary recalculations
  const { frequencyData, proficiencyData, categoryData } = React.useMemo(() => {
    const rawFrequency = stackData.technologies
      .sort((a, b) => b.frequency - a.frequency)
      .map(tech => ({ name: tech.name, frequency: tech.frequency, proficiency: tech.proficiency }))
    let freqData = rawFrequency.slice(0, 10)
    if (!freqData.find(t => t.name === 'Java')) {
      const javaItem = rawFrequency.find(t => t.name === 'Java')
      if (javaItem) {
        freqData = [...freqData.slice(0, 9), javaItem]
      }
    }

    const rawProficiency = stackData.technologies
      .sort((a, b) => b.proficiency - a.proficiency)
      .map(tech => ({ name: tech.name, frequency: tech.frequency, proficiency: tech.proficiency }))
    let profData = rawProficiency.slice(0, 10)
    if (!profData.find(t => t.name === 'Java')) {
      const javaItem = rawProficiency.find(t => t.name === 'Java')
      if (javaItem) {
        profData = [...profData.slice(0, 9), javaItem]
      }
    }

    const catData = stackData.categories.map(category => ({
      name: category.name,
      value: category.count,
      color: categoryColors[category.name as keyof typeof categoryColors] || '#6b7280'
    }))

    return {
      frequencyData: freqData,
      proficiencyData: profData,
      categoryData: catData
    }
  }, [])

  const getCategoryIcon = (categoryName: string) => {
    const IconComponent = categoryIconMap[categoryName as keyof typeof categoryIconMap] || Code2
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <section className={cn("py-16 w-full overflow-x-hidden", className)}>
      <div className="container-custom max-w-full">
        <div className="text-center mb-12 px-4 sm:px-0">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade technologies for building resilient, scalable systems. From hybrid database architectures to microservices, containerization, and real-time communication.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
            <TabsTrigger value="frequency" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">By Frequency</span>
              <span className="sm:hidden">Frequency</span>
            </TabsTrigger>
            <TabsTrigger value="proficiency" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">By Proficiency</span>
              <span className="sm:hidden">Proficiency</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frequency" className="space-y-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Technology Usage Frequency</CardTitle>
                  <CardDescription>
                    How many of my enterprise projects use each technology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={frequencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={10}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis fontSize={10} />
                        <Tooltip />
                        <Bar dataKey="frequency" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="proficiency" className="space-y-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Technology Proficiency</CardTitle>
                  <CardDescription>
                    My self-rated proficiency level (1-10) for each technology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={proficiencyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={10}
                          tick={{ fontSize: 10 }}
                        />
                        <YAxis domain={[0, 10]} fontSize={10} />
                        <Tooltip />
                        <Bar dataKey="proficiency" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Technology Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-[clamp(0.75rem,2vw,1rem)] mt-8 sm:mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stackData.technologies.map((tech: Technology) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="mb-3">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {getCategoryIcon(tech.category)}
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-1">{tech.name}</h3>
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {tech.frequency} projects
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {tech.proficiency}/10
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Technology Categories</CardTitle>
              <CardDescription>
                Breakdown of technologies by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center" 
                      wrapperStyle={{ fontSize: 10 }} 
                      iconSize={8}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
})
