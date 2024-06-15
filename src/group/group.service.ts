import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma.service';


@Injectable()
export class GroupService {
  constructor(public readonly prisma: PrismaService) {}
  
  findAll() {
    const group = this.prisma.group.findMany({
      select:{
        id: true,
        name: true,
        description: true,
        couratorId: true,
        students:{
          select:{
            id: true,
            name: true,
            age: true,
            login: true,
            password: true,
            isActive: true,
            _count:{
              select:{
                kiberones: true
              }
            }
          }
        
        }
      }
    })
    return group;
  }
  
  async findGroupById(id: number) {
    try {
      const group = await this.prisma.group.findUnique({
        where: {
          id: id
        },
        select:{
          id: true,
          name: true,
          description: true,
          couratorId: true,
          students:{
            select:{
              id: true,
              name: true,
              age: true,
              login: true,
              password: true,
              isActive: true,
              _count:{
                select:{
                  kiberones: true
                }
              }
            }
          
          }
        }
      })
      return group;
    } catch (error) {
      throw new HttpException('Failed to update group', HttpStatus.BAD_REQUEST);
    }
  }

}

export class GroupServiceAdmin extends GroupService{

  async create(body: CreateGroupDto) {
    const group = await this.prisma.group.create({
      data: {
        ...body
      }
    })
    return group;
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
  