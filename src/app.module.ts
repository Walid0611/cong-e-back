import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ClientModule } from './client/client.module';
// import { CamundaModule } from './camunda/camunda.module';
import { EmailModule } from './email/email.module';
// import { FileUploadModule } from './file-upload/file-upload.module';
import { uploadFile } from './uploadFile';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';






@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({ dest: '../public' }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://walid:TCk7ukfLddxztDXY@cluster0.9jk2ljc.mongodb.net/test_auth',
        
      }),
    }),
   
 
    AuthModule,
    UsersModule,
    ClientModule,
    EmailModule,
    // FileUploadModule,
    // CamundaModule, 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

