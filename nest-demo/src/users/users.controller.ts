import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/basicauth/guards/auth.guard';
import { RolesGuard } from 'src/basicauth/guards/roles.guard';
import { Roles } from 'src/basicauth/roles.decorator';
import { Role } from 'src/basicauth/roles.enum';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // only admins can create a new user
  @Post('/create')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UsePipes(ValidationPipe)
  createUser(@Body() user: CreateUserDto) {
    this.userService.createUser(user);
  }
}
