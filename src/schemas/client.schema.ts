import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



export type ClientDocument = Client & Document;


@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, })
export class Client {

    @Prop()
    _id: Types.ObjectId;
    @Prop()
    startDate: Date;
    @Prop()
    endDate: Date;
    @Prop()
    numberOfDays: number;
    @Prop()
    reason: string;
    @Prop()
    approve:string;


}

export const ClientSchema = SchemaFactory.createForClass(Client);