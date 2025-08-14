
import mongoose, { Schema } from 'mongoose';
import type { Host as IHost } from '@amberops/lib';

const HostSchema = new Schema<IHost>({}, { strict: false });

export const Host = mongoose.models.Host || mongoose.model<IHost>('Host', HostSchema);
