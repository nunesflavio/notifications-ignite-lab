import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/prisma/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  //controllers: [HttpModule, DatabaseModule],
})
export class AppModule {}
