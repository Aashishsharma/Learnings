import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CatsService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    console.log(`CatService has been initialized.`);
    const port = this.configService.get<number>('PORT');
    console.log(' port from env file is ', port);
  }
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(age: number): Cat {
    return this.cats.find((catItem: Cat) => catItem.age === age);
  }
}
