import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { name: string; age: number } {
    return { name: 'ganeshkanna', age: 30 };
  }
}
