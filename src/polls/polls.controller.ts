import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PollsService } from './polls.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreatePollDto, SubmitPollDto } from './dto/create-poll.dto';
import { AdminGuard } from 'src/admin/admin.guard';

@UseGuards(AdminGuard)
@ApiBearerAuth()
@ApiTags('Polls')
@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        answers: { type: 'array', items: { type: 'string' } },
        deadline: { type: 'string', format: 'date-time' },
      },
    },
  })
  @Post()
  createPoll(@Body() body: CreatePollDto) {
    return this.pollsService.createPoll(body);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        parentId: { type: 'number' },
        pollId: { type: 'number' },
        answersIndex: { type: 'number' },
      },
    },
  })
  @Post('submit')
  submitPoll(@Body() body: SubmitPollDto) {
    return this.pollsService.submitPoll(body);
  }

  // GET /polls
  @Get()
  getAllPolls() {
    return this.pollsService.getAllPolls();
  }

  // GET /polls/:id
  @Get('byId/:id')
  getPollById(@Param('id', ParseIntPipe) id: number) {
    return this.pollsService.getPollById(id);
  }
  
  // GET /polls/results
  @Get('results')
  getAllPollResults() {
    return this.pollsService.getAllPollResults();
  }

  // GET /polls/:id/results
  @Get('results/:id')
  getPollResults(@Param('id', ParseIntPipe) id: number) {
    return this.pollsService.getPollResults(+id);
  }
}
