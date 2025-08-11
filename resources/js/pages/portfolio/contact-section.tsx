import { cn } from "@/lib/utils"
import { Facebook, Github, Instagram, Linkedin,  Mail, MapPin, Phone,  SendIcon } from "lucide-react"


export const ContactSection = () => {


	return (
		<section id="contact" className="py-24 px-4 relative bg-secondary/10">
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
					Get In <span className="text-primary">Touch</span>
				</h2>
				<p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
					Have a project in mind or want to collaborate? Feel free to reach out.
					I'm always open to discussing new opportunities.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					<div className="space-y-8 p-3 rounded-lg">
						<h3 className="text-2xl font-semibold mb-6"> Contact Information </h3>
						<div className="space-y-6 justify-center">
							<div className="flex items-start space-x-4">
								<div className="p-3 rounded-full bg-primary/20">
									<Mail className="h-6 w-6 text-primary" />
								</div>
								<div className="">
									<h4 className="font-medium text-center">Email</h4>
									<a href="mailto:nelgieedem.hs@gmail.com" className="text-muted-foreground hover:text-primary transition-colors"> nelgieedem.hs@gmail.com</a>
								</div>
							</div>
							<div className="flex items-start space-x-4">
								<div className="p-3 rounded-full bg-primary/20">
									<Phone className="h-6 w-6 text-primary" />
								</div>
								<div className="">
									<h4 className="font-medium text-center">Phone</h4>
									<a className="text-muted-foreground hover:text-primary transition-colors"> (+63) 976 4645 972</a>
								</div>
							</div>
							<div className="flex items-start space-x-4">
								<div className="p-3 rounded-full bg-primary/20">
									<MapPin className="h-6 w-6 text-primary" />
								</div>
								<div className="">
									<h4 className="font-medium text-center">Address</h4>
									<a className="text-muted-foreground hover:text-primary transition-colors"> Metro Manila, Philippines</a>
								</div>
							</div>

						</div>
						<div className="pt-8">
							<h4 className="font-medium mb-4 text-center"> Connect With Me</h4>
							<div className="flex space-x-4 justify-center">
								<a href="#" target="_blank">
									<Facebook />
								</a>
								<a href="#" target="_blank">
									<Github />
								</a>
								<a href="#" target="_blank">
									<Instagram />
								</a>
								<a href="#" target="_blank">
									<Linkedin />
								</a>
							</div>
						</div>
					</div>
					<div className="bg-card p-8 rounded-lg shadow-xs">
						<h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
						<form action="" className="space-y-6">
							<div className="">
								<label
									htmlFor="name"
									className="block text-sm font-medium mb-2"
								>
									Your Name 
									<input
										type="text"
										className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
										name="name"
										required
										placeholder="Juan..." />
								</label>
							</div>
							<div className="">
								<label
									htmlFor="email"
									className="block text-sm font-medium mb-2"
								>
									Email
									<input
										type="email"
										className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
										name="email"
										required
										placeholder="juan@gmail.com" />
								</label>
							</div>
							<div className="">
								<label
									htmlFor="message"
									className="block text-sm font-medium mb-2"
								>
									Message
									<textarea
										className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
										name="message"
										required
										placeholder="Hello! I want to say ..." />
								</label>
								<button type="submit" className={cn("cosmic-button w-full flex items-center justify-center gap-2 mt-4")}>
									Send Message<SendIcon size={16}/>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}