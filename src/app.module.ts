import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ClientModule } from './client/client.module';
// import { CamundaModule } from './camunda/camunda.module';






@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://walid:TCk7ukfLddxztDXY@cluster0.9jk2ljc.mongodb.net/test_auth',
        
      }),
    }),
   
 
    AuthModule,
    UsersModule,
    ClientModule,
    // CamundaModule, 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

