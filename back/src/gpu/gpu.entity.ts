import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gpu extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'character varying', length: 256 })
    name: string;
    @Column({ type: 'jsonb' })
    options: {
        frequency: number;
        memorySize: number;
        tireWidth: number;
        coef: number;
    };
}
