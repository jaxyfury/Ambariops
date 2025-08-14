
import mongoose, { Schema } from 'mongoose';
import type { AlertDefinition as IAlertDefinition } from '@amberops/lib';

const AlertDefinitionSchema = new Schema<IAlertDefinition>({}, { strict: false });

export const AlertDefinition = mongoose.models.AlertDefinition || mongoose.model<IAlertDefinition>('AlertDefinition', AlertDefinitionSchema);
