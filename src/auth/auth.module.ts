import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './Jwt.Service'; 
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';



@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret', 
      signOptions: { expiresIn: '1h' }, 
    }),
    
    
  ],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}