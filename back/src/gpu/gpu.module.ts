import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GpuController } from './gpu.controller';
import { GpuRepository } from './gpu.repository';

@Module({
    imports: [TypeOrmModule.forFeature([GpuRepository])],
    controllers: [GpuController],
})
export class GpuModule {}
