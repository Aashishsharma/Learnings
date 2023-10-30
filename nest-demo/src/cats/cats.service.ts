import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService implements OnModuleInit {
  onModuleInit() {
    console.log(`CatService has been initialized.`);
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
