
'use client';

import { Button } from '@amberops/ui/components/ui/button'
import { AmberOpsLogo } from '@amberops/ui/components/icons'
import Link from 'next/link'
import Image from 'next/image';
import { CheckCircle, Shield, Zap, BarChart, HardDrive, Server, Users, ArrowRight, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@amberops/ui/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amberops/ui/components/ui/accordion';
import { AnimatedGlobe } from '@/components/animated-globe';
import { FooterAnimation } from '@/components/footer-animation';
import { AnimatedThemeToggle } from '@/components/animated-theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Blazing Fast UI',
    description: 'A modern, responsive interface built with Next.js for a seamless user experience that leaves legacy systems behind.',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security features to keep your cluster data safe, with robust authentication and authorization.',
  },
    {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Insights',
    description: 'Leverage generative AI to get health summaries and actionable troubleshooting steps in plain English.',
  },
   {
    icon: <Server className="h-8 w-8 text-primary" />,
    title: 'Unified Cluster View',
    description: 'Manage all your clusters from a single, intuitive dashboard. No more context switching.',
  },
   {
    icon: <HardDrive className="h-8 w-8 text-primary" />,
    title: 'Simplified Service Mgmt',
    description: 'Start, stop, and configure services across all hosts with just a few clicks. Track operations in real-time.',
  },
   {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'User & Access Control',
    description: 'Fine-grained user management with roles and permissions to ensure secure access for your entire team.',
  },
];

const testimonials = [
  {
    quote: "AmberOps has revolutionized how we manage our data clusters. The AI-powered troubleshooting is like having another senior engineer on the team. We've reduced downtime by over 30%.",
    name: 'Sarah L.',
    role: 'Lead DevOps Engineer',
    avatar: 'https://avatar.vercel.sh/sarah',
  },
  {
    quote: "The interface is just... better. It's fast, intuitive, and I can find what I need in seconds. I can't imagine going back to the old Ambari UI.",
    name: 'Mike R.',
    role: 'Platform Engineering Manager',
    avatar: 'https://avatar.vercel.sh/mike',
  },
   {
    quote: "As a data analyst, I don't want to fight with the tooling. AmberOps gives me the quick insights I need on service health without having to dive into complex configs. It just works.",
    name: 'Chen W.',
    role: 'Senior Data Analyst',
    avatar: 'https://avatar.vercel.sh/chen',
  },
];

const faqItems = [
    {
        question: "What is AmberOps?",
        answer: "AmberOps is a modern, fast, and intuitive frontend replacement for the standard Apache Ambari web UI. It's designed to streamline cluster management with a better user experience and powerful AI-driven features."
    },
    {
        question: "Can I connect my existing Ambari-managed cluster?",
        answer: "Yes! AmberOps is designed to work with your existing Ambari backend. You can add your cluster by providing your Ambari server URL and credentials, and AmberOps will act as a new, more powerful interface for it."
    },
    {
        question: "Is there a free plan?",
        answer: "Absolutely. Our 'Hobby' plan is free forever and is perfect for individuals and small teams to manage a single cluster with up to 5 hosts. You can explore all the core features without any cost."
    },
    {
        question: "How does the AI assistance work?",
        answer: "We use state-of-the-art large language models (LLMs) from Google (Gemini) to analyze your cluster's metrics and alert data. The AI can then generate a natural-language summaries of cluster health and provide step-by-step troubleshooting guides for specific alerts, helping you resolve issues faster."
    }
]


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center border-b bg-background/80 backdrop-blur-lg">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <AmberOpsLogo className="h-8 w-8" />
          <span className="text-xl font-semibold font-headline">AmberOps</span>
        </Link>
        <nav className="ml-auto items-center hidden md:flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
           <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="/documentation"
            className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
            prefetch={false}
          >
            Docs
          </Link>
           <Link
            href="#faq"
            className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
            prefetch={false}
          >
            FAQ
          </Link>
           <Link
            href="#contact"
            className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
           <AnimatedThemeToggle />
           <Button asChild variant="ghost">
            <Link href="/auth">Admin Login</Link>
          </Button>
           <Button asChild>
            <Link href="/auth?action=signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </nav>
        <Button asChild variant="outline" className="ml-auto md:hidden">
            <Link href="/auth">Login</Link>
        </Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-32 xl:py-40 relative overflow-hidden">
             <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
             <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-4">
                   <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">The Ambari UI. Reimagined.</div>
                  <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl xl:text-6xl/none">
                    Unified Cluster Management, Supercharged by AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                    AmberOps provides a modern, fast, and intuitive frontend for Apache Ambari, supercharged with AI-powered insights to streamline your operations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button asChild size="lg">
                    <Link href="/auth?action=signup">Get Started for Free</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="w-full lg:order-last flex items-center justify-center">
                  <AnimatedGlobe />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">
                  Everything you need. Nothing you don’t.
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AmberOps is packed with features designed to make cluster management faster, easier, and more intelligent. Stop fighting with your tools and start managing your stack.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3 md:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="grid gap-4 text-center p-6 rounded-lg hover:bg-muted/50 transition-all duration-300">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full">{feature.icon}</div>
                    <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="pricing" className="w-full py-20 md:py-28 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Pricing Plans</div>
                <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">
                  Find the Right Plan for Your Team
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start for free and scale as you grow. All plans include our core features and AI-powered insights.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative flex flex-col rounded-lg border bg-card shadow-sm p-6">
                <h3 className="text-2xl font-bold font-headline">Hobby</h3>
                <p className="mt-2 text-muted-foreground">For personal projects and small teams.</p>
                <div className="my-6">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <ul className="flex-1 space-y-3">
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />1 Cluster</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Up to 5 Hosts</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Community Support</li>
                </ul>
                <Button className="w-full mt-6" variant="outline" asChild><Link href="/auth?action=signup" prefetch={false}>Get Started</Link></Button>
              </div>
              <div className="relative flex flex-col rounded-lg border-2 border-primary bg-card shadow-lg p-6">
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <div className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">Most Popular</div>
                </div>
                <h3 className="text-2xl font-bold font-headline">Pro</h3>
                <p className="mt-2 text-muted-foreground">For growing businesses and production use.</p>
                <div className="my-6">
                  <span className="text-5xl font-bold">$99</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <ul className="flex-1 space-y-3">
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Up to 5 Clusters</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Up to 50 Hosts</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Priority Email Support</li>
                </ul>
                <Button className="w-full mt-6" asChild><Link href="/auth?action=signup" prefetch={false}>Choose Pro</Link></Button>
              </div>
              <div className="relative flex flex-col rounded-lg border bg-card shadow-sm p-6">
                <h3 className="text-2xl font-bold font-headline">Enterprise</h3>
                <p className="mt-2 text-muted-foreground">For large-scale, mission-critical deployments.</p>
                <div className="my-6">
                  <span className="text-5xl font-bold">Custom</span>
                </div>
                <ul className="flex-1 space-y-3">
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Unlimited Clusters & Hosts</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />Dedicated Support & SLA</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" />On-premise Deployment Options</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-20 md:py-28 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">What Our Users Say</div>
                        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">
                        Trusted by Teams Who Demand a Better Way
                        </h2>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-3 md:grid-cols-1">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.name} className="flex flex-col justify-between p-6 rounded-lg border bg-card shadow-sm">
                            <blockquote className="text-lg text-muted-foreground italic mb-4">"{testimonial.quote}"</blockquote>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="faq" className="w-full py-20 md:py-28 lg:py-32 bg-muted/20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">FAQ</div>
                        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">
                            Frequently Asked Questions
                        </h2>
                         <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
                         </p>
                    </div>
                </div>
                <div className="mx-auto max-w-3xl py-12">
                     <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((faq, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={index}>
                            <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>

        <section id="contact" className="w-full py-20 md:py-28 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Contact Us</div>
                        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">
                            Get in Touch
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            We're here to help. Reach out to us for sales inquiries, support, or any other questions.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-lg py-12">
                    <Card>
                        <CardContent className="p-6 text-center">
                             <Mail className="h-12 w-12 mx-auto text-primary mb-4" />
                            <h3 className="text-xl font-semibold font-headline">Email Us</h3>
                            <p className="text-muted-foreground mt-2 mb-4">
                                The best way to get in touch is by email. Send your questions to our support team and we'll get back to you as soon as possible.
                            </p>
                            <Button asChild>
                                <a href="mailto:support@amberops.app">support@amberops.app</a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>


        <section className="w-full py-20 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to Modernize Your Stack?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and experience the future of cluster management. Go from zero to hero in minutes.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full">
                    <Link href="/auth?action=signup">Sign Up Now</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                Get started for free. No credit card required.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative flex flex-col gap-2 sm:flex-row py-12 w-full shrink-0 items-center px-4 md:px-6 border-t overflow-hidden min-h-[350px]">
        <div className="flex-grow z-10">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} AmberOps Inc. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6 mt-2">
            <Link href="/legal/terms-of-service" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="/legal/privacy-policy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </div>
        <div className="absolute right-0 bottom-0 z-20">
            <FooterAnimation />
        </div>
      </footer>
    </div>
  )
}
