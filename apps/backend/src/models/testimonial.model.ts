
import mongoose, { Schema } from 'mongoose';
import type { Testimonial as ITestimonial } from '@amberops/lib';

const TestimonialSchema = new Schema<ITestimonial>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
