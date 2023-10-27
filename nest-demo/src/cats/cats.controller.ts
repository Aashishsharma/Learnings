import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  Query,
  Headers,
  Request,
  Response,
  Header,
  Param,
  ParseIntPipe,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';

import { CreateCatDto, createCatSchema } from './dto/cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import {
  InputTextValidator,
  ZodValidationPipe,
} from './pipes/input-text.validator';

import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  //localhost:3000/cats
  // using pipes - this ensures that the data passed in the post body exactly matches the catdto object
  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async createCat(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto as Cat);
  }

  //localhost:3000/cats
  @Get()
  async findAllCats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('api-handler-example')
  apiHandlerExample(
    @Query() query: any, // @Query('param1') queryParam1: string = 'default1', // to extract param1 queryparam
    @Body() body: any,
    @Headers() headers: any, // @Headers('custom-header') customHeader: string = 'default-header', to extract only specific header
    @Request() request: any,
    @Response() response: any,
  ) {
    const result = {
      queryParameters: query,
      requestBody: body,
      requestHeaders: headers,
      requestObject: request.headers,
      customResponse: 'This is a custom response message',
    };

    response.status(201).json(result);
  }

  @Get('ab*cd')
  findAll() {
    return 'This route uses a wildcard';
  }

  @Post('pqr')
  @HttpCode(204)
  create() {
    return 'This action adds a new cat';
  }

  //Add header to the response
  @Post('lmn')
  @Header('Cache-Control', 'none')
  createNew() {
    return 'This action adds a new cat';
  }

  //localhost:3000/cats/22
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) age: number) {
    return this.catsService.findOne(age);
  }

  //custom validator
  @Get('validate/:text')
  getText(@Param('text', InputTextValidator) text: string) {
    return `Valid input: ${text}`;
  }
}
