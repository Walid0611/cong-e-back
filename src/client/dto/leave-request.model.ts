

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LeaveRequest extends Document {
    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    numberOfDays: number;

    @Prop()
    reason: string;
}

export const LeaveRequestSchema = SchemaFactory.createForClass(LeaveRequest);
