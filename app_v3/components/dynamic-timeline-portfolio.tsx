'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
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
    type: 'github',
    title: 'Technical Analysis - ML',
    organization: 'Personal Project',
    date: '2024',
    description: 'Built a classifier model to predict weekly gains and losses for a given stock price using various technical analysis indicators. Evaluation techniques explored included using a random forest vs. SVM vs. Gradient boosting trees (XGBoost). Prediction accuracy was further refined using both PCA and Nonnegative matrix factorization.',
    skills: ['Python', 'ta-lib', 'XGB']
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
    title: 'Internet Shopping Cart',
    organization: 'Personal Project',
    date: '2024',
    description: 'I developed a server-based application to track eCommerce products, display recent saves in a Chrome plugin UI, and notify users of price drops over time. Leveraging AI tools like "Magic Patterns" for UI templating and Claude 3.5 Sonnet for debugging network issues, I built the tool in just two weeks. This project highlights my ability to integrate cutting-edge technologies for efficient development, particularly in areas where I sought to improve, such as rapid deployment and network communication. It showcases technical problem-solving and adaptability with AI-driven solutions.',
    skills: ['Python', 'Django', 'Selectolax', 'JS', 'Tailwind'],
    link: 'https://github.com/RobertCastagna/Shopping_Cart_Plugin'
  },
  {
    type: 'education',
    title: 'MSc in Computer Science',
    organization: 'Georgia Institute of Technology',
    date: '2024 - Present',
    description: 'Completing a Master\'s degree in Computer Science with a focus on Machine Learning Part-Time, while having a Full-Time occupation. Conducting research with classifier-based machine learning algorithms to determine predictive equity signals.',
    skills: ['Statsmodels', 'Ta-lib', 'Python', 'sklearn', 'XGB']
  },
  {
    type: 'github',
    title: 'Quant Trading App',
    organization: 'Personal Project',
    date: '2023',
    description: 'Developed a web app for an options trading competition using Streamlit, pulling market data from online API\'s. Integrated backtested strategies to signal entry points and included Black-Scholes and Binomial options pricing models. Expanded features over an 8-week period, with full project details available on GitHub.',
    skills: ['Backtesting','Python','Pandas','Ta-lib','Scipy','Streamlit'],
    link: 'https://quanttrading.streamlit.app/'
  },
  {
    type: 'github',
    title: 'First Website',
    organization: 'Personal Project',
    date: '2023',
    description: 'Built my first personal portfolio project website. We have obviously learned some new things since then; I made this one using GitHub Pages. It has a cool blog.',
    skills: ['HTML','CSS','GitHub Pages'],
    link: 'https://robertcastagna.github.io/My_Portfolio/'
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

export function DynamicTimelinePortfolio() {
  const [filter, setFilter] = useState<'all' | 'work' | 'education' | 'github' | 'huggingface'>('all')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [largeCard, setLargeCard] = useState(true)
  const timelineRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const filteredData = timelineData.filter(item => filter === 'all' || item.type === filter)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Only shrink the card if there is enough scrollable content
      if (scrollableHeight > 100) {
        setLargeCard(scrollPosition < 1);  // Shrink card after scrolling 100px down, grow back at the top
      } else {
        setLargeCard(false);  // No scrollable content, keep it small
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-[#D8BFD8] py-12 px-4 sm:px-6 lg:px-8">
      <div 
        ref={cardRef}
        className={`transition-all duration-500 ease-in-out ${
          largeCard ? 'h-screen' : 'h-auto'
        }`}
      >
        <div className={`h-full flex items-center justify-center transition-all duration-500 ease-in-out ${largeCard ? 'py-12' : 'py-6'} px-4 sm:px-6 lg:px-8`}>
          <Card className={`w-full max-w-4xl transition-all duration-500 ease-in-out ${largeCard ? 'bg-white shadow-2xl' : 'bg-white shadow-md'}`}>
            <CardContent className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${largeCard ? 'p-16' : 'p-6'}`}>
              <div className={`flex flex-col items-center w-full transition-all duration-500 ease-in-out ${largeCard ? 'space-y-8' : 'space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6'}`}>
                <Avatar className={`transition-all duration-500 ${largeCard ? 'w-64 h-64' : 'w-24 h-24'}`}>
                  <AvatarImage src="/mypicture.JPG?height=256&width=150" alt="RC" />
                  <AvatarFallback>RC</AvatarFallback>
                </Avatar>
                <div className={`flex-grow ${largeCard ? 'text-center' : 'text-left'}`}>
                  <h1 className={`font-bold mb-4 transition-all duration-500 ${largeCard ? 'text-6xl' : 'text-3xl'}`}>Robert Castagna</h1>
                  <p className={`text-gray-600 mb-6 transition-all duration-500 ${largeCard ? 'text-2xl max-w-3xl mx-auto' : 'text-base'}`}>
                    Passionate software engineer with 4+ years of experience in a data specialized role.
                    Mostly work on maintaining distributed compute systems, large scale data processesing and advanced monitoring tools.
                  </p>
                  <div className={`flex justify-center space-x-6 mb-8 transition-all duration-500 ${largeCard ? 'scale-150' : ''}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                      asChild
                    >
                      <a href="https://www.linkedin.com/in/castagnarobert/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                        <LinkedinIcon className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-gray-800 hover:bg-gray-900 text-white"
                      asChild
                    >
                      <a href="https://github.com/RobertCastagna/" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                        <GithubIcon className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                      asChild
                    >
                      <a href="https://huggingface.co/RobertCastagna" target="_blank" rel="noopener noreferrer" aria-label="Hugging Face Profile">
                      <span role="img" aria-label="Hugging Face" style={{ fontSize: '1.5rem' }}>🤗</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              {largeCard && (
                <div className="mt-12 text-center animate-bounce">
                  <p className="text-gray-500 mb-2 text-xl">Scroll down to view my journey</p>
                  <ChevronDownIcon className="mx-auto h-12 w-12 text-gray-400" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div
        ref={timelineRef}
        className="transition-all duration-500 ease-in-out"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Hover any event to view more.</h2>

          <div className="flex flex-wrap justify-center gap-2 mb-8 bg-gradient-to-r from-purple-500 via-blue-500 to-black p-2 rounded-lg">
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
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300 hidden md:block"></div>

            <div className="space-y-8">
              {filteredData.map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center md:items-start`}>
                  <div className="w-full md:w-5/12 mb-4 md:mb-0">
                    <Card 
                      className={`transition-all duration-300 ease-in-out rounded-xl ${expandedIndex === index ? 'shadow-lg' : 'hover:shadow-md'}`}
                      onMouseEnter={() => setExpandedIndex(index)}
                      onMouseLeave={() => setExpandedIndex(null)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          {item.type === 'work' && <BriefcaseIcon className="w-5 h-5 text-blue-500" />}
                          {item.type === 'education' && <GraduationCapIcon className="w-5 h-5 text-green-500" />}
                          {item.type === 'github' && <GithubIcon className="w-5 h-5 text-purple-500" />}
                          {item.type === 'huggingface' && <span role="img" aria-label="Hugging Face" style={{ fontSize: '1.5rem' }}>🤗</span>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.organization} | {item.date}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          {expandedIndex === index ? item.description : item.description.split('.')[0] + '.'}
                        </p>
                        {item.skills && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        )}
                        {expandedIndex === index && item.link && (
                          <div className="mt-4">
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
                  <div className="w-4 h-4 bg-primary rounded-full my-2 md:mx-auto"></div>
                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
