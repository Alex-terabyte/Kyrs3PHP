import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cpu extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'character varying', length: 256 })
    name: string;
    @Column({ type: 'jsonb' })
    options: {
        cores: number;
        flows: number;
        frequency: number;
        coef: number;
    };
}
