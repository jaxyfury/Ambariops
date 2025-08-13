
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@amberops/lib';
import { Zap, BarChart, Server, HardDrive } from 'lucide-react';
import { Button } from '@amberops/ui/components/ui/button';

const features = [
  {
    icon: Zap,
    title: 'Blazing Fast UI',
    description: 'A modern, responsive interface built with Next.js for a seamless user experience that leaves legacy systems behind.',
    details: [
        '98% faster page loads',
        'Real-time updates'
    ],
    buttonText: 'Experience the Speed',
  },
  {
    icon: BarChart,
    title: 'AI-Powered Insights',
    description: 'Leverage generative AI to get health summaries and actionable troubleshooting steps in plain English.',
    details: [
        'Automated health summaries',
        'Step-by-step repair guides'
    ],
    buttonText: 'Explore AI Features',
  },
  {
    icon: Server,
    title: 'Unified Cluster View',
    description: 'Manage all your clusters from a single, intuitive dashboard. No more context switching.',
    details: [
        'Multi-cluster support',
        'Global search functionality'
    ],
    buttonText: 'Unify Your View',
  },
  {
    icon: HardDrive,
    title: 'Simplified Service Mgmt',
    description: 'Start, stop, and configure services across all hosts with just a few clicks. Track operations in real-time.',
     details: [
        'One-click service actions',
        'Live task tracking'
    ],
    buttonText: 'Manage Services',
  },
];

export function FeatureCarousel() {
  const [activeCardId, setActiveCardId] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigateToCard = (cardId: number) => {
    setActiveCardId(cardId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveCardId(prev => (prev % features.length) + 1);
    }, 5000); // Auto-cycle every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">
        <div className="flex-1 max-w-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="uppercase text-xs font-medium tracking-wide">Core AmberOps Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl mb-6">
                Powerful Tools, Simplified.
            </h2>
            <p className="text-base text-muted-foreground mb-8">
                Drag the cards to explore our technology solutions and discover how we're building innovative platforms for modern data operations.
            </p>
            
            <div className="flex gap-3 mb-8">
                {features.map((_, index) => (
                    <button 
                        key={index}
                        id={`dot-${index + 1}`} 
                        onClick={() => navigateToCard(index + 1)}
                        className={cn(
                            'w-2 h-2 rounded-full bg-muted-foreground/50 hover:bg-foreground/80 transition-all',
                            activeCardId === index + 1 && 'scale-150 bg-primary'
                        )}
                        aria-label={`Go to feature ${index + 1}`}
                    />
                ))}
            </div>
            
            <div className="space-y-4 text-sm text-muted-foreground">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className={cn(
                            "flex items-center gap-3 transition-opacity",
                            activeCardId === index + 1 ? "opacity-100" : "opacity-50"
                        )}
                    >
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full transition-colors",
                            activeCardId === index + 1 ? "bg-primary" : "bg-muted-foreground/50"
                        )}></div>
                        <span className={cn(activeCardId === index + 1 && "text-foreground")}>{feature.title}</span>
                    </div>
                ))}
            </div>
        </div>

        <section id="cards-container" ref={containerRef} className={`card-${activeCardId}-active`}>
            {features.map((feature, index) => (
                <article key={index} className="glass rounded-2xl shadow-2xl">
                     <div className="h-full flex flex-col p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-full bg-primary/10 border border-primary/20">
                                <feature.icon className="w-5 h-5 text-primary"/>
                            </div>
                            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{feature.title}</span>
                        </div>
                        
                        <p className="text-foreground/80 mb-6 flex-1">
                            {feature.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm mb-6">
                             {feature.details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
                                    <span className="text-muted-foreground">{detail}</span>
                                </div>
                            ))}
                        </div>
                        
                        <Button className="w-full glass-button">
                           {feature.buttonText}
                        </Button>
                    </div>
                </article>
            ))}
        </section>
    </div>
  );
}


    