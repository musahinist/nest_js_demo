import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /// signup is a helper function that signs up a user and returns an access token
  async signup(body: AuthDto) {
    const hash = await argon.hash(body.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          password: hash,
        },
      });

      return this.accessToken(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw error;
    }
  }

  /// signin is a helper function that signs in a user and returns an access token
  async signin(body: AuthDto) {
    try {
      const user = await this.validateUser(body);
      if (!user) {
        throw new ForbiddenException('Invalid email or password');
      }
      return this.accessToken(user);
    } catch (error) {
      throw error;
    }
  }

  /// validateUser is a helper function that validates a user's email and password
  async validateUser(payload: AuthDto): Promise<User> {
    // get the user from the database by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    console.log(user);
    // if user is found, check if password is correct and return user
    if (user && (await argon.verify(user.password, payload.password))) {
      return user;
    }
    // otherwise, return null
    return null;
  }

  /// accessToken is a helper function that generates an access token for a user
  async accessToken(user: User): Promise<any> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '360d',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
