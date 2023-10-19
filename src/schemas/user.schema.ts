import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



export type UserDocument = User & Document;

export enum Role {
  SuperAdmin = 0,
  Admin = 1,
  Client = 2
}

@Schema({timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },})
export class User {
  
  // @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId
  @Prop()
  name: string;
  @Prop({required:true,unique:true})
  email: string;
  @Prop({ enum: Role, default: Role.Client })
  role: Role;
  @Prop({required:true})
  password: string;
  
 
}

export const UserSchema = SchemaFactory.createForClass(User);