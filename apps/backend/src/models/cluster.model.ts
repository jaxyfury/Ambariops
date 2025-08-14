
import mongoose, { Schema } from 'mongoose';
import type { Cluster as ICluster } from '@amberops/lib';

// Use strict: false to allow for any structure, as per original design.
const ClusterSchema = new Schema<ICluster>({}, { strict: false,
  // Ensure `id` is returned when converting to JSON
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const Cluster = mongoose.models.Cluster || mongoose.model<ICluster>('Cluster', ClusterSchema);
