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
import { Cpu } from './cpu.entity';
import { CpuRepository } from './cpu.repository';

export interface ICreateCpuBody {
    name: string;
    options: {
        cores: number;
        flows: number;
        frequency: number;
    };
}

@Controller('cpu')
export class CpuController {
    constructor(@InjectRepository(Cpu) private cpuRepository: CpuRepository) {}
    @Get('/')
    getAllCpu() {
        return this.cpuRepository.getAllCpu();
    }

    @Post('/')
    createCpu(@Body() body: ICreateCpuBody) {
        this.cpuRepository.createCpu(body);
    }

    @Put('/:id')
    updateCpu(@Param('id') id: number, @Body() body: ICreateCpuBody) {
        this.cpuRepository.updateCpu(id, body);
    }

    @Delete('/:id')
    deleteCpu(@Param('id') id: number) {
        this.cpuRepository.deleteCpu(id);
    }
}
