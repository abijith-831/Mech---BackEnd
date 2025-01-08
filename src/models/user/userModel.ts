import mongoose, { Document, Schema } from "mongoose";


export interface IAddress {
  area: string;
  village: string;
  landmark: string;
  city: string;
  pincode: string;
}


export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  image?: string;  
  phone?:string;
  addresses?: IAddress[];
}

const userSchema: Schema = new Schema(
  {
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
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String, 
      default: "",  
    },
    phone:{
      type:String,
      default:''
    },
    addresses: {
      type: [ 
        {
          area: { type: String, default: "" },
          village: { type: String, default: "" },
          landmark: { type: String, default: "" },
          city: { type: String, default: "" },
          pincode: { type: String, default: "" },
        }
      ],
      default: [], 
    }
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IUser>("User", userSchema);
