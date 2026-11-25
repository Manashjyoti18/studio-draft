export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  business: string;
  url?: string;
  date?: string;
}

export const testimonials: Testimonial[] = [];
