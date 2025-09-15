import React from 'react'
import ToolCard from './ToolCard'

const aiTools = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Advanced conversational AI that can help with writing, research, coding, and answering questions across various subjects.",
    category: "General AI",
    pricing: "Freemium",
    link: "https://chat.openai.com"
  },
  {
    id: 2,
    name: "Grammarly",
    description: "AI-powered writing assistant that helps improve grammar, spelling, clarity, and style in academic and professional writing.",
    category: "Writing",
    pricing: "Freemium",
    link: "https://grammarly.com"
  },
  {
    id: 3,
    name: "Khan Academy",
    description: "Personalized learning platform with AI-driven recommendations for math, science, and other subjects.",
    category: "Learning Platform",
    pricing: "Free",
    link: "https://khanacademy.org"
  },
  {
    id: 4,
    name: "Coursera",
    description: "Online learning platform offering AI-powered course recommendations and adaptive learning paths.",
    category: "Learning Platform",
    pricing: "Freemium",
    link: "https://coursera.org"
  },
  {
    id: 5,
    name: "Socratic by Google",
    description: "AI homework helper that provides step-by-step explanations for math, science, and other subjects.",
    category: "Homework Help",
    pricing: "Free",
    link: "https://socratic.org"
  },
  {
    id: 6,
    name: "Quillbot",
    description: "AI paraphrasing tool that helps students and writers rephrase content while maintaining original meaning.",
    category: "Writing",
    pricing: "Freemium",
    link: "https://quillbot.com"
  },
  {
    id: 7,
    name: "Wolfram Alpha",
    description: "Computational knowledge engine that solves mathematical problems and provides detailed explanations.",
    category: "Mathematics",
    pricing: "Freemium",
    link: "https://wolframalpha.com"
  },
  {
    id: 8,
    name: "Duolingo",
    description: "AI-powered language learning app with personalized lessons and adaptive difficulty adjustment.",
    category: "Language Learning",
    pricing: "Freemium",
    link: "https://duolingo.com"
  },
  {
    id: 9,
    name: "Photomath",
    description: "Camera calculator app that solves math problems using AI and provides step-by-step solutions.",
    category: "Mathematics",
    pricing: "Freemium",
    link: "https://photomath.com"
  }
]

function ToolsSection() {
  return (
    <section id="tools">
      <h2 className="section-title">AI Tools Collection</h2>
      <div className="tools-grid">
        {aiTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  )
}

export default ToolsSection