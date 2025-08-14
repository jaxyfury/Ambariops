
import mongoose, { Schema } from 'mongoose';
import type { AlertDefinition as IAlertDefinition } from '@amberops/lib';

const AlertDefinitionSchema = new Schema<IAlertDefinition>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const AlertDefinition = mongoose.models.AlertDefinition || mongoose.model<IAlertDefinition>('AlertDefinition', AlertDefinitionSchema);
