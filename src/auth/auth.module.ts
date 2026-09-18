import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy, JwtVerifyStrategy } from './strategies';
import { UserModule } from '../shared/user';

@Global()
@Module({
  imports: [
    UserModule,
    // Nest 12 no longer inherits @Optional() from a base class.
    // So every AuthGuard() subclass now needs AuthModuleOptions.
    // register() provides it, and this module is global, so one call covers all guards.
    // Options stay empty: each guard decides about the session by itself.
    // https://docs.nestjs.com/recipes/passport
    PassportModule.register({}),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtSecret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthSerializer, LocalStrategy, JwtStrategy, JwtVerifyStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
