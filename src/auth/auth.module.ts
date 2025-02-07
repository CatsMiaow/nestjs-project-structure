import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthSerializer } from './auth.serializer.js';
import { AuthService } from './auth.service.js';
import { LocalStrategy, JwtStrategy, JwtVerifyStrategy } from './strategies/index.js';
import { UserModule } from '../shared/user/index.js';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthSerializer, LocalStrategy, JwtStrategy, JwtVerifyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
