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
import { Ram } from './ram.entity';
import { RamRepository } from './ram.repository';

export interface ICreateRamBody {
    name: string;
    options: {
        memorySize: number;
        throughput: number;
        frequency: number;
    };
}

@Controller('ram')
export class RamController {
    constructor(@InjectRepository(Ram) private ramRepository: RamRepository) {}
    @Get('/')
    getAllRam() {
        return this.ramRepository.getAllRam();
    }

    @Post('/')
    createRam(@Body() body: ICreateRamBody) {
        this.ramRepository.createRam(body);
    }

    @Put('/:id')
    updateRam(@Param('id') id: number, @Body() body: ICreateRamBody) {
        this.ramRepository.updateRam(id, body);
    }

    @Delete('/:id')
    deleteRam(@Param('id') id: number) {
        this.ramRepository.deleteRam(id);
    }
}
