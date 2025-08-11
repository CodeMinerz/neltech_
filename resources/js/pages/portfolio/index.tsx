import { StarBackground } from "./star-background"
import {Navbar} from "./nav-bar"
import { HeroSection } from "./hero-section"
import { AboutSection } from "./about-me"
import { ProjectSection } from "./project-section"
import {SkillsSection} from "./skills-section"
import { Footer } from "./footer"
import {ContactSection} from "./contact-section"
import { useEffect } from "react"


export default function Index()  {

    useEffect(() =>{
     
        document.documentElement.classList.add('dark');
    })
    return <div className="main-h-screen bg-background text-foreground overflow-x-hidden">
        <StarBackground/>
        <Navbar/>
        <HeroSection/>
        <AboutSection/>
        <SkillsSection/>
        <ProjectSection/>
        <ContactSection/>
        <Footer/>
    </div>

}