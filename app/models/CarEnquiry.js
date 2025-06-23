import mongoose from 'mongoose';

const carEnquirySchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

carEnquirySchema.index({ carId: 1, createdAt: -1 });
carEnquirySchema.index({ email: 1 });

export default mongoose.models.CarEnquiry || mongoose.model('CarEnquiry', carEnquirySchema);
