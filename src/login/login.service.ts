import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}

  async search(body: CreateLoginDto) {
    const student = await this.prisma.student.findUnique({
      where: { login: body.login, password: body.password },
    });
    const parent = await this.prisma.parent.findUnique({
      where: { login: body.login, password: body.password },
    });

    if (student) {
      return { role: 'student', student };
    } else if (parent) {
      return { role: 'parent', parent };
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
