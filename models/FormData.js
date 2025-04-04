// models/FormData.js
import mongoose from 'mongoose';

const FormDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  workDescription: { type: String },
  paymentStatus: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  dateTime: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.FormData || mongoose.model('FormData', FormDataSchema);
