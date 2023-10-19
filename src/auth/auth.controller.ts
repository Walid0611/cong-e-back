import {Body , Controller, Post , HttpCode ,HttpStatus, Res} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(private authService:AuthService ){}


@Post('login')
 async signIn(@Res() res: any){
 
 return res.status(HttpStatus.OK).json({
      success: true,
      message: 'User has been created successfully',
      
     
    });
  }
}
