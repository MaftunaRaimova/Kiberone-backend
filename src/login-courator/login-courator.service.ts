import { Injectable } from '@nestjs/common';
import { CreateLoginCouratorDto } from './dto/create-login-courator.dto';
import { UpdateLoginCouratorDto } from './dto/update-login-courator.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoginCouratorService {
  constructor(private readonly prisma: PrismaService) {}

  async search(body: CreateLoginCouratorDto) {
    const courator = await this.prisma.courator.findUnique({
      where: { login: body.login },
    });

    if (courator) {
      return { role: 'courator', courator };
    } else {
      return "This user is not a courator";
    }
  }
}
