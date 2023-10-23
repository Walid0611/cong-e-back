import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Client {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    id: object;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    numberOfDays: number;

    @Prop()
    reason: string;

    @Prop()
    approve: string;
}
export const ClientSchema = SchemaFactory.createForClass(Client);
