import { EntityRepository, Repository } from 'typeorm';
import { ICreateCpuBody } from './cpu.controller';
import { Cpu } from './cpu.entity';

@EntityRepository(Cpu)
export class CpuRepository extends Repository<Cpu> {
    getAllCpu() {
        return this.find();
    }
    async createCpu({ name, options }: ICreateCpuBody) {
        const cpu = new Cpu();
        cpu.name = name;
        cpu.options = {
            ...options,
            coef: (+options.frequency + +options.cores + +options.flows) / 3,
        };
        await cpu.save();
    }

    async updateCpu(id: number, { name, options }: ICreateCpuBody) {
        const updatingCpu = await this.findOne(id);
        updatingCpu.name = name;
        updatingCpu.options = {
            ...options,
            coef: (+options.frequency + +options.flows + +options.cores) / 3,
        };
        await updatingCpu.save();
    }

    async deleteCpu(id: number) {
        const deletingCpu = await this.findOne(id);
        await deletingCpu.remove();
    }
}
