'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, GraduationCapIcon, GithubIcon, ExternalLinkIcon } from "lucide-react"

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
    title: 'Portfolio Optimization',
    organization: 'Personal Project',
    date: '2024',
    description: 'Developed a comprehensive investment analysis platform incorporating fundamental and sentiment analysis, as well as portfolio optimization. Integrated prebuilt strategies for portfolio construction, live news sentiment analysis using FinBERT, and risk optimization tools. Additionally, supports live portfolio tracking with IBKR integration for paper trading.',
    skills: ['OpenBB','Python','Pandas','Riskfolio','Transformers','Streamlit','AsyncIO'],
    link: 'https://huggingface.co/spaces/RobertCastagna/Fin_Research'
  },
  {
    type: 'education',
    title: 'MSc in Computer Science',
    organization: 'Tech University',
    date: '2018 - 2020',
    description: 'Completed a Master\'s degree in Computer Science with a focus on Machine Learning and Distributed Systems. Conducted research on optimizing distributed machine learning algorithms and published a paper on the findings.',
    skills: ['Machine Learning', 'Distributed Systems', 'Python']
  },
  {
    type: 'work',
    title: 'Software Developer',
    organization: 'Startup Inc',
    date: '2017 - 2021',
    description: 'Worked in an agile team to develop and maintain web applications for a diverse client base. Responsibilities included full-stack development, code reviews, and collaborating with designers and product managers to deliver high-quality software solutions.',
    skills: ['JavaScript', 'Python', 'SQL', 'Git']
  },
  {
    type: 'huggingface',
    title: 'NLP Model for Sentiment Analysis',
    organization: 'Open Source Contribution',
    date: '2019',
    description: 'Created and fine-tuned a BERT-based model for sentiment analysis on product reviews. The model achieves state-of-the-art performance on several benchmark datasets and is publicly available for use and further development by the community.',
    skills: ['PyTorch', 'Transformers', 'NLP'],
    link: 'https://huggingface.co/yourusername/sentiment-analysis-bert'
  },
  {
    type: 'education',
    title: 'BSc in Software Engineering',
    organization: 'State University',
    date: '2013 - 2017',
    description: 'Completed a Bachelor\'s degree in Software Engineering, gaining a strong foundation in computer science principles, software development methodologies, algorithms, and data structures. Participated in various hackathons and coding competitions.',
    skills: ['Java', 'Data Structures', 'Algorithms']
  }
]

export function RefinedTimelinePortfolio() {
  const [filter, setFilter] = useState<'all' | 'work' | 'github' | 'huggingface'>('all')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const filteredData = timelineData.filter(item => filter === 'all' || item.type === filter)

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">My Software Engineering Journey</h1>
        
        <Card className="mb-8 rounded-xl">
          <CardContent className="flex items-center space-x-4 pt-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-600 mt-2">
                Passionate software engineer with 5+ years of experience in full-stack development.
                Specialized in building scalable web applications and machine learning models.
              </p>
            </div>
          </CardContent>
        </Card>

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

          <div className="space-y-2">
            {filteredData.map((item, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <Card 
                    className={`inline-block transition-all duration-300 ease-in-out rounded-xl ${expandedIndex === index ? 'shadow-lg' : 'hover:shadow-md'}`}
                    onMouseEnter={() => setExpandedIndex(index)}
                    onMouseLeave={() => setExpandedIndex(null)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-end space-x-2">
                        <span>{item.title}</span>
                        {item.type === 'work' && <BriefcaseIcon className="w-5 h-5 text-blue-500" />}
                        {item.type === 'education' && <GraduationCapIcon className="w-5 h-5 text-green-500" />}
                        {item.type === 'github' && <GithubIcon className="w-5 h-5 text-purple-500" />}
                        {item.type === 'huggingface' && <ExternalLinkIcon className="w-5 h-5 text-red-500" />}
                      </CardTitle>
                      <CardDescription>{item.organization} | {item.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
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
  )
}