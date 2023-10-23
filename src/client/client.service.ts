import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from '../schemas/client.schema';
import { Document } from 'mongoose';


type ClientDocument = Client & Document;

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) { }

  async create(client: CreateClientDto): Promise<Client> {
    const createdClient = new this.clientModel(client);

    // Remove _id to let MongoDB generate one
    createdClient._id = undefined;

    return await createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find().exec();
  }

  async findOne(id: number): Promise<Client> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid client ID: ${id}`);
    }

    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client | null> {
    const updatedClient = await this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true }).exec();
    return updatedClient;
  }


  async remove(id: number): Promise<Client | null> {
    const deletedClient = await this.clientModel.findByIdAndRemove(id).exec();
    return deletedClient;
  }
}