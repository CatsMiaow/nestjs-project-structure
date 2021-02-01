import { Module } from '@nestjs/common';

import { UserService } from '.';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
