
'use client';

import { useRef, useLayoutEffect } from 'react';
import { Button } from '@amberops/ui/components/ui/button'
import { AmberOpsLogo } from '@amberops/ui/components/icons'
import Link from 'next/link'
import Image from 'next/image';
import { CheckCircle, Shield, Zap, BarChart, HardDrive, Server, Users, ArrowRight, Mail, GitBranch, Terminal, Blocks, Package, Search, Star, MessageSquare, Cpu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@amberops/ui/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amberops/ui/components/ui/accordion';
import { AnimatedGlobe } from '@/components/animated-globe';
import { FooterAnimation } from '@/components/footer-animation';
import { AnimatedThemeToggle } from '@/components/animated-theme-toggle';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { PricingCard } from '@/components/pricing-card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TestimonialsMarquee } from '@/components/testimonials-marquee';
import { cn } from '@amberops/lib';
import { FeatureCarousel } from '@/components/feature-carousel';

gsap.registerPlugin(ScrollTrigger);


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
  {
    quote: "The performance monitoring is top-notch. The historical data charts helped us spot a memory leak we'd been chasing for weeks.",
    name: 'Isabella F.',
    role: 'Site Reliability Engineer',
    avatar: 'https://avatar.vercel.sh/isabella',
  },
    {
    quote: "Onboarding a new cluster used to be a day-long affair. With AmberOps' wizard, I had our new staging environment up and running in under an hour.",
    name: 'David K.',
    role: 'Infrastructure Lead',
    avatar: 'https://avatar.vercel.sh/david',
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

const pricingTiers = {
    hobby: {
        title: "Hobby",
        price: "0",
        period: "/month",
        description: "For personal projects & small teams.",
        features: ["1 Cluster", "Up to 5 Hosts", "Community Support", "Core Features"],
        buttonText: "Get Started"
    },
    pro: {
        title: "Pro Tier Access",
        price: "99",
        period: "/month",
        description: "For growing businesses and production use. Unlock powerful features to scale your operations.",
        features: ["Up to 5 Clusters", "Up to 50 Hosts", "Priority Email Support", "Advanced AI Features", "Weekly Health Reports"],
        buttonText: "Choose Pro"
    },
    enterprise: {
        title: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large-scale, critical deployments.",
        features: ["Unlimited Clusters", "Unlimited Hosts", "Dedicated SLA & Support", "On-premise Deployment"],
        buttonText: "Contact Sales"
    }
}

const integrationIcons = [
    GitBranch, Terminal, Blocks, Package, Search, HardDrive, Cpu, Users, BarChart, Shield, Zap, Server
];


export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
      
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: "#faq-accordion",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.from(".cta-element", {
        scrollTrigger: {
            trigger: "#final-cta",
            start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });
      
      gsap.from(".integration-section-element", {
        scrollTrigger: {
            trigger: "#integrations-section",
            start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col min-h-dvh bg-background text-foreground">
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
                   <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground hero-element">The Ambari UI. Reimagined.</div>
                  <h1 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl xl:text-6xl/none hero-element">
                    Unified Cluster Management, Supercharged by AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0 hero-element">
                    AmberOps provides a modern, fast, and intuitive frontend for Apache Ambari, supercharged with AI-powered insights to streamline your operations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start hero-element">
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

        <section id="features" className="w-full py-20 md:py-28 lg:py-32 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                  <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl mt-2">
                      Everything you need. Nothing you don’t.
                  </h2>
                  <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4 text-muted-foreground">
                      AmberOps is packed with features designed to make cluster management faster, easier, and more intelligent. Stop fighting with your tools and start managing your stack.
                  </p>
              </div>

              <FeatureCarousel />
          </div>
        </section>
        
        <section id="integrations-section" className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <p className="text-muted-foreground integration-section-element">Trusted by the world&apos;s most innovative technical teams</p>
            <div className="flex justify-center items-center gap-8 md:gap-12 mt-4 mb-12 text-muted-foreground integration-section-element">
                <p className="font-semibold text-lg">Deda.tech</p>
                <p className="font-semibold text-lg">Unbabel</p>
                <p className="font-semibold text-lg">Microsoft</p>
                <p className="font-semibold text-lg">Vodafone</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 integration-section-element">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 text-left flex items-start gap-4">
                        <GitBranch className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold">Top 50 on GitHub</h3>
                            <p className="text-sm text-muted-foreground">Our 129.1k stars place us among the most popular open-source projects.</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 text-left flex items-start gap-4">
                        <Star className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                         <div>
                            <h3 className="font-semibold">4.9/5 stars on G2</h3>
                            <p className="text-sm text-muted-foreground">To quote ‘A solid automation tool that just works.’</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 text-left flex items-start gap-4">
                        <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold">200k+ community members</h3>
                            <p className="text-sm text-muted-foreground">This wouldn&apos;t be possible without you.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl mt-2 integration-section-element">
                Plug AI into your own data & <span className="text-primary">over 500 integrations</span>
            </h2>

            <div className="integrations-grid mt-12 integration-section-element">
                {Array.from({ length: 48 }).map((_, i) => {
                    const Icon = integrationIcons[i % integrationIcons.length];
                    return (
                        <div key={i} className="integration-icon-container">
                            <div className="integration-icon">
                                <Icon className="h-6 w-6" />
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-20 md:py-28 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center pb-16">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Pricing</div>
                    <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl">
                        Find the perfect plan
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Start for free and scale as you grow. We have plans for every team size.
                    </p>
                </div>
            </div>
             <div id="pricing-grid" className="mx-auto grid max-w-6xl items-start gap-32 lg:grid-cols-3 justify-items-center">
                <div className="pricing-card-wrapper">
                    <PricingCard {...pricingTiers.hobby} />
                </div>
                <div className="pricing-card-wrapper">
                    <PricingCard {...pricingTiers.pro} isFeatured />
                </div>
                <div className="pricing-card-wrapper">
                    <PricingCard {...pricingTiers.enterprise} />
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
            </div>
            <TestimonialsMarquee testimonials={testimonials} />
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
                     <Accordion id="faq-accordion" type="single" collapsible className="w-full">
                        {faqItems.map((faq, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={index} className="faq-item">
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


        <section id="final-cta" className="w-full py-20 md:py-24 lg:py-32 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-primary/10 rounded-full blur-3xl" />
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 relative z-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline cta-element">
                Ready to Modernize Your Stack?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed cta-element">
                Sign up today and experience the future of cluster management. Go from zero to hero in minutes.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2 cta-element">
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
        <div className="absolute right-0 bottom-0 z-0">
            <FooterAnimation />
        </div>
      </footer>
    </div>
  )
}
