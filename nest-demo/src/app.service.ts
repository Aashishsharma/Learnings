import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log(`Appservice has been initialized.`);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
