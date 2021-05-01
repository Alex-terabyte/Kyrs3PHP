import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpuController } from './cpu.controller';
import { CpuRepository } from './cpu.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CpuRepository])],
    controllers: [CpuController],
})
export class CpuModule {}
