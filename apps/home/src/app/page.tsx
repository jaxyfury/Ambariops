
import { Button } from '@amberops/ui/components/ui/button'
import { AmberOpsLogo } from '@amberops/ui/components/icons'
import Link from 'next/link'
import { CheckCircle, Shield, Zap, BarChart, HardDrive, Server, Users, ArrowRight, Mail, GitBranch, Terminal, Blocks, Package, Search, Star, MessageSquare, Cpu, Database } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amberops/ui/components/ui/accordion';
import { AnimatedGlobe } from '@/components/animated-globe';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { cn } from '@amberops/lib';
import type { PricingTier, Testimonial, FAQ } from '@amberops/lib';
import { fetchPricingTiers, fetchTestimonials, fetchFaqs } from '@amberops/api/client';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FeatureCarousel } from '@/components/feature-carousel';
import { TestimonialsMarquee } from '@/components/testimonials-marquee';
import { PricingCard } from '@/components/pricing-card';

const integrationIcons = [
    { icon: Database, name: 'HDFS' },
    { icon: Users, name: 'YARN' },
    { icon: GitBranch, name: 'MapReduce' },
    { icon: Cpu, name: 'Tez' },
    { icon: Server, name: 'Hive' },
    { icon: HardDrive, name: 'HBase' },
    { icon: Shield, name: 'Ranger' },
    { icon: Zap, name: 'Spark' },
    { icon: Package, name: 'Zookeeper' },
    { icon: Search, name: 'Solr' },
    { icon: BarChart, name: 'Grafana' },
    { icon: Terminal, name: 'Ambari' },
];

async function getPageData() {
    try {
        const [pricingTiers, testimonials, faqItems] = await Promise.all([
            fetchPricingTiers(),
            fetchTestimonials(),
            fetchFaqs()
        ]);
        return { pricingTiers, testimonials, faqItems, error: null };
    } catch (error) {
        console.error("Failed to fetch landing page data:", error);
        // In a real app, you might want to return a more specific error or fallback data
        return { pricingTiers: [], testimonials: [], faqItems: [], error: "Could not load page data." };
    }
}


export default async function HomePage() {
  const { pricingTiers, testimonials, faqItems, error } = await getPageData();

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error loading page data. Please try again later.</div>
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
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
            <p className="text-muted-foreground integration-section-element">Trusted by the world's most innovative technical teams</p>
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
                            <p className="text-sm text-muted-foreground">This wouldn't be possible without you.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-5xl mt-2 integration-section-element">
                Plug AI into your own data & <span className="text-primary">over 500 integrations</span>
            </h2>

            <div className="integrations-grid mt-12 integration-section-element">
              <div className="integrations-marquee">
                {[...integrationIcons, ...integrationIcons].map((item, i) => (
                  <div key={`marquee1-${i}`} className="integration-icon-container">
                    <div className="integration-icon">
                      <item.icon className="h-8 w-8" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="integrations-marquee" aria-hidden="true" style={{ animationDelay: '20s' }}>
                {[...integrationIcons, ...integrationIcons].map((item, i) => (
                  <div key={`marquee2-${i}`} className="integration-icon-container">
                    <div className="integration-icon">
                      <item.icon className="h-8 w-8" />
                    </div>
                  </div>
                ))}
              </div>
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
                {pricingTiers && pricingTiers.length > 0 ? (
                    pricingTiers.map((tier) => (
                        <div key={tier.id} className="pricing-card-wrapper">
                            <PricingCard {...tier} buttonText={tier.title === 'Enterprise' ? 'Contact Sales' : 'Get Started'} />
                        </div>
                    ))
                ) : (
                     Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-full">
                            <Skeleton className="h-[450px] w-full rounded-2xl" />
                        </div>
                    ))
                )}
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
             {testimonials && testimonials.length > 0 ? (
                <TestimonialsMarquee testimonials={testimonials} />
            ) : (
                <div className="flex gap-6 overflow-hidden p-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-96 rounded-xl" />
                    ))}
                </div>
            )}
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
                        {faqItems && faqItems.length > 0 ? (
                            faqItems.map((faq, index) => (
                                <AccordionItem value={`item-${index + 1}`} key={faq.id} className="faq-item">
                                    <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        ) : (
                             Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-2 py-4 border-b">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-4/5" />
                                </div>
                            ))
                        )}
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
      <Footer />
    </div>
  )
}
