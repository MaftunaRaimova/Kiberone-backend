export class CreatePollDto {
  name: string;
  answers: string[];
  deadline: Date;
}

export class SubmitPollDto {
    parentId: number;
    pollId: number;
    answersIndex: number;
  }
