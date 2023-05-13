import { Body, Controller, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  // @ApiParam({
  //   name: 'email',
  //   type: String,
  //   required: true,
  // })
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }

  @Post('signin')
  signin(@Body() body: AuthDto) {
    return this.authService.signin(body);
  }
}
