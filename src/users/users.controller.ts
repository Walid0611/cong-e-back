import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/schemas/user.schema";

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {}

  
    @Post('')
    async createUser(@Res() res: any, @Body() user: User) {
        try {
            const userPost = await this.userService.create(user);
            return res.status(HttpStatus.OK).json({
                success: true,
                message: 'User has been created successfully',
                user: userPost,
            });
        } catch (error) {
            if (error.code === 11000) {
                
                return res.status(HttpStatus.CONFLICT).json({
                    success: false,
                    message: 'User with this email already exists',
                });
            }
            
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'An error occurred while creating the user',
                error: error.message,
            });
        }
    }
    @Get()
  async getAllUsers(@Res() res: any) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      success: true,
      users: users,
    });
  }

  @Get(':id')
  async getUserById(@Res() res: any, @Param('id') id: string) {
    const user = await this.userService.findOneBy(id);
      {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(HttpStatus.OK).json({
      success: true,
      user: user,
    });
  }

    @Put(':id')
    async updateUser(@Res() res: any, @Param('id') id: string, @Body() user: User) {
        const updatedUser = await this.userService.update(id, user);
        if (!updatedUser) {
            return res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'User has been updated successfully',
            user: updatedUser,
        });
    }

  @Delete(':id')
  async deleteUser(@Res() res: any, @Param('id') id: string) {
    const deletedUser = await this.userService.removeBy(id);
      {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: true,
        message: 'User was delete',
      });
    }
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'User has been deleted successfully',
      user: deletedUser,
    });
  }
}