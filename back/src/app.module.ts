import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { GpuModule } from './gpu/gpu.module';
import { CpuController } from './cpu/cpu.controller';
import { CpuModule } from './cpu/cpu.module';
import { RamModule } from './ram/ram.module';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: true,
};

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        GamesModule,
        GpuModule,
        CpuModule,
        RamModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
