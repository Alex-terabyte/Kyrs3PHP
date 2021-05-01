import { EntityRepository, Repository } from 'typeorm';
import { ICreateRamBody } from './ram.controller';
import { Ram } from './ram.entity';

@EntityRepository(Ram)
export class RamRepository extends Repository<Ram> {
    getAllRam() {
        return this.find();
    }
    async createRam({ name, options }: ICreateRamBody) {
        const ram = new Ram();
        ram.name = name;
        ram.options = {
            ...options,
            coef:
                (+options.frequency +
                    +options.memorySize +
                    +options.throughput) /
                3,
        };
        await ram.save();
    }

    async updateRam(id: number, { name, options }: ICreateRamBody) {
        const updatingRam = await this.findOne(id);
        updatingRam.name = name;
        updatingRam.options = {
            ...options,
            coef:
                (+options.frequency +
                    +options.throughput +
                    +options.memorySize) /
                3,
        };
        await updatingRam.save();
    }

    async deleteRam(id: number) {
        const deletingRam = await this.findOne(id);
        await deletingRam.remove();
    }
}
