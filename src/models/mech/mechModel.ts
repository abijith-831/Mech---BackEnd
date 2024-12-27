import mongoose, { Document, Schema } from "mongoose";

export interface IMech extends Document {
  workshopname: string;
  username: string;
  email: string;
  password: string;
  phone: number;
  shopno: number;
  floor: string;
  area: string;
  city: string;
  landmark: string;
  isVerified: boolean;
}

const mechSchema: Schema = new Schema({
  workshopname: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  shopno: {
    type: Number,
    required: true,
  },

  floor: {
    type: String,
    required: true,
  },

  area: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  
  landmark: {
    type: String,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  
});

export default mongoose.model<IMech>("Mechanic", mechSchema);
