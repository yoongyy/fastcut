import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  email: string;
  phone: string;
  videoUrl: string;
  editingStyle: string;
  captionPreferences?: string;
  extraInstructions?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  outputPreviewUrl?: string | null;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone / WhatsApp number is required'],
    trim: true,
  },
  videoUrl: {
    type: String,
    required: [true, 'Video input link is required'],
    trim: true,
  },
  editingStyle: {
    type: String,
    required: [true, 'Editing style selection is required'],
  },
  captionPreferences: {
    type: String,
    default: '',
  },
  extraInstructions: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  },
  outputPreviewUrl: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
