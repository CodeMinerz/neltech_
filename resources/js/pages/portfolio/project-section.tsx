
import { ArrowRight, ExternalLink, Github, GithubIcon } from "lucide-react";

const projects = [
	{
		id: 1,
		title: "Pawnshop Manager",
		description: "A comprehensive pawnshop management system that streamlines operations, tracks inventory, and manages customer interactions.",
		technologies: ["Laravel", "AWS", "MySQL", "Vue.js", "JQuery"],
		Image: "/projects/pawnshop-manager.png",
		demolink: "/login",
		githubLink: "#",
	},
	
];

export const ProjectSection = () => {

	return (
		<section id="projects" className="py-24 px-4 relative">
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
					Featured <span className="text-primary">Projects</span>
				</h2>
				<p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
					Brief description of the project, technologies used, and its purpose.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-start">
					{
						projects.map((project, key) => (
							<div
								key={project.id + '-' + key}
								className="group bg-card/40 rounded-lg overflow-hidden shadow-xs card-hover">
								<div className="h-48 overflow-hidden">
									<img src={project.Image} alt={project.title} className="w-full  h-full transition-transform duration-500 object-cover group-hover:scale-110" />
								</div>
								<div className="gradient-border p-6 card-hover">
									<h3 className="text-xl font-semibold mb-2 ">{project.title}</h3>
									<p className="text-muted-foreground mb-4">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2 mb-4">
										{project.technologies.map((tech, i) => (
											<span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ">{tech}</span>
										))}
									</div>
									<div className="flex gap-2">
										{project.demolink && <a href={project.demolink} className="cosmic-button" target="_blank" rel="noopener noreferrer"> Demo  <ExternalLink size={16} className="relative float-right m-1"/></a>}
										{project.githubLink && <a href={project.githubLink} className="cosmic-button" target="_blank" rel="noopener noreferrer"> <GithubIcon size={16} className="relative float-right m-1"/>GitHub</a>}
									</div>
								</div>
							</div>
						))
					}
					<div className="text-center mt-12">
						<a  className="cosmic-button w-fit flex items-center mx-auto gap-2" 
							target="_blank"
							href="https://github.com/CodeMinerz">
							Check My Github <ArrowRight size={16}/>
						</a>
					</div>
				</div>
			</div>
		</section>
	);

}