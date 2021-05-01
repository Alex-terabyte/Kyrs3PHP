import { EntityRepository, Repository } from 'typeorm';
import { ICreateGpuBody } from './gpu.controller';
import { Gpu } from './gpu.entity';

@EntityRepository(Gpu)
export class GpuRepository extends Repository<Gpu> {
    getAllGpu() {
        return this.find();
    }
    async createGpu({ name, options }: ICreateGpuBody) {
        const gpu = new Gpu();
        gpu.name = name;
        gpu.options = {
            ...options,
            coef:
                (+options.frequency +
                    +options.memorySize +
                    +options.tireWidth) /
                3,
        };
        await gpu.save();
    }

    async updateGpu(id: number, { name, options }: ICreateGpuBody) {
        const updatingGpu = await this.findOne(id);
        updatingGpu.name = name;
        updatingGpu.options = {
            ...options,
            coef:
                (+options.frequency +
                    +options.memorySize +
                    +options.tireWidth) /
                3,
        };
        await updatingGpu.save();
    }

    async deleteGpu(id: number) {
        const deletingGpu = await this.findOne(id);
        await deletingGpu.remove();
    }
}
