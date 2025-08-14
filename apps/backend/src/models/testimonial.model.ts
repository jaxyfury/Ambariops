
import mongoose, { Schema } from 'mongoose';
import type { Testimonial as ITestimonial } from '@amberops/lib';

const TestimonialSchema = new Schema<ITestimonial>({}, { strict: false });

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
