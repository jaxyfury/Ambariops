
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@amberops/ui/components/ui/avatar';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    avatar: string;
}

interface TestimonialsMarqueeProps {
    testimonials: Testimonial[];
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="testimonial-card">
        <blockquote className="text-lg text-muted-foreground italic mb-4">"{testimonial.quote}"</blockquote>
        <div className="flex items-center gap-3 mt-auto">
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
);


export function TestimonialsMarquee({ testimonials }: TestimonialsMarqueeProps) {
  return (
    <div className="testimonials-marquee-container">
      <div className="testimonials-marquee">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={`${testimonial.name}-${i}-1`} testimonial={testimonial} />
        ))}
      </div>
      <div className="testimonials-marquee" aria-hidden="true">
        {testimonials.map((testimonial, i) => (
            <TestimonialCard key={`${testimonial.name}-${i}-2`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
