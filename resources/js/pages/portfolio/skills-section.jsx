import React, { useState } from 'react';


const skills = [
    {name: "HTML", level: 90, category: "frontend"},
    {name: "Javascript", level: 90, category: "frontend"},
    {name: "CSS", level: 95, category: "frontend"},
    {name: "React", level: 75, category: "frontend"},
    {name: "TypeScript", level: 60, category: "frontend"},
    {name: "Tailwind CSS", level: 50, category: "frontend"},
    {name: "Next.js", level: 80, category: "frontend"},

    //Backend

    {name: "Node.js", level: 80, category: "backend"},
    {name: "Laravel", level: 75, category: "backend"},
    {name: "PHP", level: 90, category: "backend"},
    {name: "MsSql", level: 70, category: "backend"},
    {name: "MySql", level: 80, category: "backend"},

    // Tools

    {name: "Git/Github", level: 70, category: "tools"},
    {name: "Docker", level: 85, category: "tools"},
    {name: "Linux (Ubuntu)", level: 60, category: "tools"},
    {name: "Windows", level: 60, category: "tools"},
    {name: "MacOS", level: 60, category: "tools"},
    {name: "VSCode", level: 60, category: "tools"},
    {name: "AWS", level: 50, category: "tools"},
    {name: "SQLServer", level: 50, category: "tools"},
];

const categories = [
    {name: "All", value: "all"},
    {name: "Frontend", value: "frontend"},
    {name: "Backend", value: "backend"},
    {name: "Tools", value: "tools"},
    
];

export const SkillsSection = () => {

    const [activeCategory, setActiveCategory] = useState("all");
    const filteredSkills = activeCategory === "all" 
        ? skills 
        : skills.filter(skill => skill.category === activeCategory);

    return ( 
        <section id="skills" className="py-24 px-4 relative bg-secomdary/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                My <span className="text-primary">Skills</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <button
                        key={category.value}
                        className={`px-4 py-2 rounded-full  transition-colors duration-300 capitalize
                            ${
                                activeCategory === category.value
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-800 hover:bg-primary hover:text-white'
                            }`}
                        onClick={() => setActiveCategory(category.value)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                    <div key={index} className="bg-card/40 p-6 rounded-lg shadow-xs card-hover">
                        <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-xs text-right">{skill.level}% proficiency</p>
                    </div>
                ))}
            </div>
        </section>
    )
}