import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(name: string, password: string) {
    if (name != process.env.ADMIN_NAME) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!(await bcrypt.compare(password, process.env.ADMIN_PASSWORD))) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    const payload = { sub: 1, name: name };
    return {
      access_token: await this.jwtService.signAsync(payload,{secret: process.env.JWT_SECRET}),
      name: name,
    };
  }

  async getStudentCount() {
    return await this.prisma.student.count();
  }

  async findAll() {
    return await this.prisma.student.findMany();
  }
}