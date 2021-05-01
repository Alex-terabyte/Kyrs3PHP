import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ram extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'character varying', length: 256 })
    name: string;
    @Column({ type: 'jsonb' })
    options: {
        memorySize: number;
        throughput: number;
        frequency: number;
        coef: number;
    };
}
