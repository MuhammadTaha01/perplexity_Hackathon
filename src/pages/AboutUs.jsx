import { motion } from 'framer-motion'
import TextReveal from '../components/TextReveal'
import FadeIn from '../components/FadeIn'
import Planet from '../components/Planet'

function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Elara Vex",
      role: "Chief Scientific Officer",
      bio: "Pioneering researcher in quantum communications and interstellar signal processing. Led the team that developed SONAR's core algorithms."
    },
    {
      name: "Commander Orion Shaw",
      role: "Mission Director",
      bio: "Former astronaut with over 2000 days in space. Expert in deep space exploration and first contact protocols."
    },
    {
      name: "Nova Reeves",
      role: "Lead Engineer",
      bio: "Brilliant engineer responsible for designing our gravitational manipulation technology and stellar propulsion systems."
    },
    {
      name: "Altair Chen",
      role: "AI Development Lead",
      bio: "Cutting-edge AI specialist who integrated quantum computing with neural networks to create SONAR's advanced capabilities."
    }
  ]
  
  const milestones = [
    {
      year: "2031",
      title: "Foundation",
      description: "Cosmic Frontier established as a research initiative focused on advancing space communication technology."
    },
    {
      year: "2033",
      title: "Quantum Breakthrough",
      description: "First successful demonstration of long-distance quantum entanglement communication."
    },
    {
      year: "2035",
      title: "SONAR v1.0",
      description: "Initial deployment of the Stellar Operational Navigation and Research AI system."
    },
    {
      year: "2037",
      title: "Expansion",
      description: "Opening of our orbital research facility and deployment of deep space relay network."
    },
    {
      year: "2040",
      title: "Galactic Network",
      description: "Establishment of the first interplanetary communication grid using quantum relay technology."
    }
  ]
  
  return (
    <div className="relative min-h-screen pt-20">
      <div className="absolute top-1/2 -left-32 opacity-30">
        <Planet size="2xl" color="white" ring={true} duration={60} />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <TextReveal className="mb-12 text-center">
          <h1 className="section-title">ABOUT THE MISSION</h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-space-accent"></div>
        </TextReveal>
        
        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid gap-10 md:grid-cols-2">
            <FadeIn direction="left">
              <div className="aspect-video overflow-hidden rounded-lg">
                <div className="flex h-full items-center justify-center bg-space-gray-900">
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: 360,
                      }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        ease: "linear" 
                      }}
                      className="h-48 w-48 rounded-full border-2 border-dashed border-space-accent/30 opacity-70"
                    ></motion.div>
                    <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-space-accent/20"></div>
                    <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-space-accent/40"></div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="right" delay={0.3}>
              <h2 className="mb-6 text-3xl font-bold">Our Vision</h2>
              <div className="mb-6 h-1 w-16 bg-space-accent"></div>
              <p className="mb-4 text-space-gray-300">
                At Cosmic Frontier, we envision a future where humanity extends its reach beyond the confines of our solar system. We believe that advanced communication technology is the key to unlocking the mysteries of the cosmos and establishing humanity's place among the stars.
              </p>
              <p className="text-space-gray-300">
                Our team of visionary scientists, engineers, and explorers are dedicated to pushing the boundaries of what's possible, developing technology that will serve as the foundation for humanity's greatest journey—to become an interstellar species.
              </p>
            </FadeIn>
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="mb-20">
          <TextReveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <div className="mx-auto mt-4 h-1 w-16 bg-space-accent"></div>
          </TextReveal>
          
          <div className="relative mx-auto max-w-3xl">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 -ml-px h-full w-0.5 bg-space-gray-700"></div>
            
            {milestones.map((milestone, index) => (
              <FadeIn 
                key={index} 
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 0.2}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:text-right md:mr-[50%] md:pr-10' : 'md:ml-[50%] md:pl-10'}`}
              >
                <div className={`absolute top-0 h-6 w-6 rounded-full border-4 border-space-accent bg-space-dark ${index % 2 === 0 ? 'md:right-0 md:mr-[-14px]' : 'md:left-0 md:ml-[-14px]'}`}></div>
                
                <div className="space-card">
                  <div className="inline-block mb-2 rounded bg-space-gray-800 px-3 py-1 text-sm font-semibold">
                    {milestone.year}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{milestone.title}</h3>
                  <p className="text-space-gray-300">{milestone.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div>
          <TextReveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Team</h2>
            <div className="mx-auto mt-4 h-1 w-16 bg-space-accent"></div>
          </TextReveal>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <FadeIn 
                key={index} 
                direction="up" 
                delay={index * 0.2}
                className="space-card"
              >
                <div className="mb-4 h-48 rounded bg-space-gray-800">
                  <div className="flex h-full items-center justify-center">
                    <div className="h-24 w-24 rounded-full border border-space-accent/30 bg-space-accent/10"></div>
                  </div>
                </div>
                <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                <p className="mb-3 text-sm text-space-accent">{member.role}</p>
                <p className="text-space-gray-300">{member.bio}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs