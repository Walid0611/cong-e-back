import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from '../schemas/client.schema'


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]), // Use the clientSchema here
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
  
})
export class ClientModule {}
