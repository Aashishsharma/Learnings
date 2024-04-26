// class-validator package provides a convenient approach to enforce validation rules for all incoming client payloads
//, where the specific rules are declared with simple annotations in local class/DTO declarations in each module

import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  userpassword: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsString()
  role: string;
}

//after creating this dto
// add @UsePipes(ValidationPipe) decorator in the method or cotroller
// use this dto as a type in the methiod param like
// @UsePipes(ValidationPipe)
// createUser(@Body() user: CreateUserDto) {
//    this.userService.createUser(user);
//  }

// With these rules in place,
// if a request hits our endpoint with an invalid username property in the request body, the application will automatically respond with a 400 Bad Request code

// Bad request -
// {
//     "username": "user4",
//     "userpassword": "user4",
//     "role": 123
// }
// Response
// {
//     "message": [
//         "isActive must be a boolean value",
//         "isActive should not be empty",
//         "role must be a string value"
//     ],
//     "error": "Bad Request",
//     "statusCode": 400
// }
