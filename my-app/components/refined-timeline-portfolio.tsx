'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, GraduationCapIcon, GithubIcon, ExternalLinkIcon, LinkedinIcon, ChevronDownIcon } from "lucide-react"

type TimelineItem = {
  type: 'work' | 'education' | 'github' | 'huggingface'
  title: string
  organization: string
  date: string
  description: string
  skills?: string[]
  link?: string
}

const timelineData: TimelineItem[] = [
  {
    type: 'work',
    title: 'Data Engineer',
    organization: 'CI Financial',
    date: '2022 - Present',
    description: 'Leading the development of cloud-native applications using microservices architecture. Responsible for designing and implementing scalable solutions, mentoring junior developers, and driving the adoption of best practices in software development.',
    skills: ['Python', 'SQL', 'AWS', 'Snowflake', 'dbt']
  },
  {
    type: 'huggingface',
    title: 'Portfolio Optimization App',
    organization: 'Personal Project',
    date: '2024',
    description: 'Developed a comprehensive investment analysis platform incorporating fundamental and sentiment analysis, as well as portfolio optimization. Integrated prebuilt strategies for portfolio construction, live news sentiment analysis using FinBERT, and risk optimization tools. Additionally, supports live portfolio tracking with IBKR integration for paper trading.',
    skills: ['OpenBB','Python','Pandas','Riskfolio','Transformers','Streamlit','AsyncIO'],
    link: 'https://huggingface.co/spaces/RobertCastagna/Fin_Research'
  },
  {
    type: 'github',
    title: 'Quant Trading App',
    organization: 'Personal Project',
    date: '2024',
    description: 'Developed a web app for an options trading competition using Streamlit, pulling market data from online API\'s. Integrated backtested strategies to signal entry points and included Black-Scholes and Binomial options pricing models. Expanded features over an 8-week period, with full project details available on GitHub.',
    skills: ['Backtesting','Python','Pandas','Ta-lib','Scipy','Streamlit'],
    link: 'https://quanttrading.streamlit.app/'
  },
  {
    type: 'education',
    title: 'MSc in Financial Mathematics',
    organization: 'The Johns Hopkins University',
    date: '2023 - Present',
    description: 'Completing a Master\'s degree in Financial Mathematics with a focus on Machine Learning and Time Series Analysis. Conducting research with classifier-based machine learning algorithms to determine predictive signals.',
    skills: ['Statsmodels', 'Ta-lib', 'Python', 'sklearn', 'XGB']
  },
  {
    type: 'work',
    title: 'Data Analyst',
    organization: 'C2P Inc',
    date: '2020 - 2022',
    description: 'Worked alongside management to create data flows and published process stability reports. Responsibilities included writing core MS SQL procedures and triggers, and collaborating with designers and product managers to deliver high-quality solutions.',
    skills: ['VBA', 'Python', 'SQL', 'Git']
  },
  {
    type: 'education',
    title: 'BSc in Applied Mathematics and Engineering',
    organization: 'Queen\'s University',
    date: '2021',
    description: 'Specialized in control systems and robotics. I gained skills in advanced mathematics principles, software development methodologies, and stochastic control systems. Completed a 1 year internship.',
    skills: ['Stochastic Processes', 'Data Structures', 'Information Theory']
  }
]


export default function RefinedTimelinePortfolio() {
  const [filter, setFilter] = useState<'all' | 'work' | 'education' | 'github' | 'huggingface'>('all')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [showTimeline, setShowTimeline] = useState(false)
  const [largeCard, setLargeCard] = useState(true)
  const timelineRef = useRef<HTMLDivElement>(null)

  const filteredData = timelineData.filter(item => filter === 'all' || item.type === filter)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeline(true)
      setLargeCard(false)
    }, 5000)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowTimeline(true)
        setLargeCard(false)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ease-in-out ${largeCard ? 'h-screen flex items-center justify-center' : ''}`}>
        <Card className={`w-full transition-all duration-1000 ease-in-out ${largeCard ? 'bg-white shadow-2xl' : 'bg-transparent shadow-none'}`}>
          <CardContent className={`flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${largeCard ? 'p-12' : 'p-6'}`}>
            <div className={`flex ${largeCard ? 'flex-col items-center' : 'flex-row items-start'} w-full transition-all duration-1000 ease-in-out`}>
              <Avatar className={`transition-all duration-1000 ${largeCard ? 'w-48 h-48 mb-8' : 'w-24 h-24 mr-6'}`}>
                <AvatarImage src="/placeholder.svg?height=192&width=192" alt="John Doe" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
              <div className={`flex-grow ${largeCard ? 'text-center' : 'text-left'}`}>
                <h1 className={`font-bold mb-4 transition-all duration-1000 ${largeCard ? 'text-5xl' : 'text-3xl'}`}>John Doe</h1>
                <p className={`text-gray-600 mb-6 transition-all duration-1000 ${largeCard ? 'text-xl max-w-2xl mx-auto' : 'text-base'}`}>
                  Passionate software engineer with 4+ years of experience in a data specialized role.
                  Mostly work on maintaining distributed compute systems, large scale data processesing and advanced monitoring tools.
                </p>
                <div className={`flex justify-center space-x-4 mb-8 transition-all duration-1000 ${largeCard ? 'scale-150' : ''}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-gray-800 hover:bg-gray-900 text-white"
                    asChild
                  >
                    <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                    asChild
                  >
                    <a href="https://huggingface.co/johndoe" target="_blank" rel="noopener noreferrer" aria-label="Hugging Face Profile">
                      <svg viewBox="0 0 40 40" fill="currentColor" className="h-5 w-5">
                        <path d="M11.403 15.463c-.73-.773-1.527-1.487-2.404-2.101-.208-.146-.405-.293-.62-.425 1.609.244 2.786.802 3.941 1.627.32.229.658.435.989.652l1.978 1.297c1.298.858 2.62 1.681 4.012 2.344-.042-.71-.07-1.423-.07-2.139 0-2.915.566-5.742 1.668-8.385.8-1.913 1.883-3.718 3.336-5.217.331-.342.687-.66 1.053-.964.33-.274.675-.536 1.028-.777.283-.193.571-.385.869-.556-1.487 2.842-2.193 6.026-2.193 9.24 0 1.903.262 3.781.776 5.579-.354-.363-.745-.697-1.143-1.019-1.313-1.053-2.715-1.981-4.13-2.893l-3.524-2.311c-.289-.19-.578-.38-.878-.563-1.257-.77-2.574-1.392-3.987-1.839-.038-.013-.077-.024-.115-.037-.497-.161-.997-.311-1.504-.448.023-.022.042-.048.066-.069.789-.696 1.621-1.339 2.508-1.906 1.417-.907 2.96-1.579 4.551-2.097-.654.586-1.276 1.205-1.836 1.883-.533.647-.983 1.358-1.371 2.124z"/>
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            {largeCard && (
              <div className="mt-12 text-center animate-bounce">
                <p className="text-gray-500 mb-2">Scroll down to view my journey</p>
                <ChevronDownIcon className="mx-auto h-8 w-8 text-gray-400" />
              </div>
            )}
          </CardContent>
        </Card>

        <div
          ref={timelineRef}
          className={`transition-all duration-1000 ease-in-out ${
            showTimeline ? 'opacity-100 max-h-full mt-8' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-8">My Software Engineering Journey</h2>

          <div className="flex justify-center space-x-2 mb-8 bg-gray-200 p-2 rounded-lg">
            <Badge 
              onClick={() => setFilter('all')} 
              className={`cursor-pointer ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              All
            </Badge>
            <Badge 
              onClick={() => setFilter('work')} 
              className={`cursor-pointer ${filter === 'work' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              Work
            </Badge>
            <Badge 
              onClick={() => setFilter('education')} 
              className={`cursor-pointer ${filter === 'education' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              Education
            </Badge>
            <Badge 
              onClick={() => setFilter('github')} 
              className={`cursor-pointer ${filter === 'github' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              GitHub
            </Badge>
            <Badge 
              onClick={() => setFilter('huggingface')} 
              className={`cursor-pointer ${filter === 'huggingface' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            >
              Hugging Face
            </Badge>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>

            <div className="space-y-4">
              {filteredData.map((item, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card 
                      className={`inline-block transition-all duration-300 ease-in-out rounded-xl ${expandedIndex === index ? 'shadow-lg' : 'hover:shadow-md'}`}
                      onMouseEnter={() => setExpandedIndex(index)}
                      onMouseLeave={() => setExpandedIndex(null)}
                    >
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.organization} | {item.date}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          {expandedIndex === index ? item.description : item.description.split('.')[0] + '.'}
                        </p>
                        {item.skills && (
                          <div className="flex flex-wrap gap-2 justify-end mt-2">
                            {item.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        )}
                        {expandedIndex === index && item.link && (
                          <div className="mt-4 text-right">
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                            >
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center"
                              >
                                View Project
                                <ExternalLinkIcon className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full mt-4"></div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
