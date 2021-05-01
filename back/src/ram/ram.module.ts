import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RamController } from './ram.controller';
import { RamRepository } from './ram.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RamRepository])],
    controllers: [RamController],
})
export class RamModule {}
