import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma.service';


@Injectable()
export class GroupService {
  constructor(public readonly prisma: PrismaService) {}
  
  async findAll() {
    return this.prisma.group.findMany({
      include: { courators: { include: { courator: true } } },
    });
  }
  
  async findGroupById(id: number) {
    try {
      const group = await this.prisma.group.findUnique({
        where: {
          id: id
        },
        include: { courators: { include: { courator: true } } } // have to check this line 
      })
      return group;
    } catch (error) {
      throw new HttpException('Failed to update group', HttpStatus.BAD_REQUEST);
    }
  }

}

export class GroupServiceAdmin extends GroupService{

  async create(body: CreateGroupDto) {
    try {
      const group = await this.prisma.group.create({
        data: {
          name: body.name,
          description: body.description,
          courators: {
            create: body.couratorIds.map((id) => ({
              courator: { connect: { id } },
            })),
          },
        },
      });
      return group;
    } catch (error) {
      throw new Error(`Failed to create group: ${error.message}`);
    }
  }

  async updateGroup(id: number, body: UpdateGroupDto) {
    try {
      const group = await this.prisma.group.update({
        where: {
          id: id
        },
        data: {
          ...body
        }
      })
      return group;
    } catch (error) {
      throw new HttpException('Failed to update group', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const group = await this.prisma.group.delete({
        where: {
          id: id
        }
      })
      return group;
    } catch (error) {
      throw new HttpException('Failed to delete group', HttpStatus.BAD_REQUEST);
    }
  }
}
  