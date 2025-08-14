
import mongoose, { Schema } from 'mongoose';

// Re-using the same User model structure as the auth service for consistency
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Viewer' },
  image: { type: String },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

const ClusterSchema = new Schema({}, { strict: false });
const ServiceSchema = new Schema({}, { strict: false });
const HostSchema = new Schema({}, { strict: false });
const AlertSchema = new Schema({}, { strict: false });
const AlertDefinitionSchema = new Schema({}, { strict: false });
const TaskSchema = new Schema({}, { strict: false });
const ActivityLogSchema = new Schema({}, { strict: false });
const LogEntrySchema = new Schema({}, { strict: false });
const DocumentationSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });
const LegalSchema = new Schema({
    type: { type: String, required: true, enum: ['terms', 'privacy'], unique: true },
    content: { type: String, required: true },
}, { timestamps: true });
const PricingTierSchema = new Schema({}, { strict: false });
const TestimonialSchema = new Schema({}, { strict: false });
const FaqSchema = new Schema({}, { strict: false });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Cluster = mongoose.models.Cluster || mongoose.model('Cluster', ClusterSchema);
export const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export const Host = mongoose.models.Host || mongoose.model('Host', HostSchema);
export const Alert = mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
export const AlertDefinition = mongoose.models.AlertDefinition || mongoose.model('AlertDefinition', AlertDefinitionSchema);
export const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
export const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
export const LogEntry = mongoose.models.LogEntry || mongoose.model('LogEntry', LogEntrySchema);
export const Documentation = mongoose.models.Documentation || mongoose.model('Documentation', DocumentationSchema);
export const Legal = mongoose.models.Legal || mongoose.model('Legal', LegalSchema);
export const PricingTier = mongoose.models.PricingTier || mongoose.model('PricingTier', PricingTierSchema);
export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FaqSchema);
