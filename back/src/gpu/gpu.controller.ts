import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gpu } from './gpu.entity';
import { GpuRepository } from './gpu.repository';

export interface ICreateGpuBody {
    name: string;
    options: {
        frequency: number;
        memorySize: number;
        tireWidth: number;
    };
}

@Controller('gpu')
export class GpuController {
    constructor(@InjectRepository(Gpu) private gpuRepository: GpuRepository) {}
    @Get('/')
    getAllGpu() {
        return this.gpuRepository.getAllGpu();
    }

    @Post('/')
    createGpu(@Body() body: ICreateGpuBody) {
        this.gpuRepository.createGpu(body);
    }

    @Put('/:id')
    updateGpu(@Param('id') id: number, @Body() body: ICreateGpuBody) {
        this.gpuRepository.updateGpu(id, body);
    }

    @Delete('/:id')
    deleteGpu(@Param('id') id: number) {
        this.gpuRepository.deleteGpu(id);
    }
}
