import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Games extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'character varying', length: 256 })
    name: string;
    @Column({ type: 'jsonb' })
    options: Array<{ koef: number; fps: number }>;
}
