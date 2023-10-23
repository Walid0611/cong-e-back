import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientService } from './client.service';
import { Client } from 'src/schemas/client.schema';
import { Types } from 'mongoose';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) { }

  @Post('')
  async createUser(@Res() res: any, @Body() client: CreateClientDto) {
    try {
      const clientPost = await this.clientService.create(client);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Client has been created successfully',
        client: clientPost,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(HttpStatus.CONFLICT).json({
          success: false,
          message: 'Client with this leave already exists',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An error occurred while creating the client',
        error: error.message,
      });
    }
  }

  @Get()
  async getAllClients(@Res() res: any) {
    try {
      const clients = await this.clientService.findAll();
      return res.status(HttpStatus.OK).json({
        success: true,
        clients: clients,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An error occurred while fetching clients',
        error: error.message,
      });
    }
  }

  @Get(':id')
  async getClientById(@Res() res: any, @Param('id') id: string) {
    try {
      const client = await this.clientService.findOne(parseInt(id, 10));
      if (client === null) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: `Client with ID ${id} not found`,
        });
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        client: client,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An error occurred while fetching the client',
        error: error.message,
      });
    }
  }

  @Put(':id')
  async updateClient(@Res() res: any, @Param('id') id: number, @Body() clientData: UpdateClientDto) {
    const updatedClient = await this.clientService.update(id, clientData);

    if (updatedClient) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Client has been updated successfully',
        client: updatedClient,
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Client not found',
      });
    }
  }

  @Delete(':id')
  async deleteClient(@Res() res: any, @Param('id') id: number) {
    try {
      // Delete the client with the specified ID
      const deletedClient = await this.clientService.remove(id);

      if (deletedClient) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: 'Client has been deleted successfully',
          client: deletedClient,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Client not found',
        });
      }
    } catch (error) {
      console.error(`Error deleting client: ${error}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'An error occurred while deleting the client',
        error: error.message,
      });
    }
  }}