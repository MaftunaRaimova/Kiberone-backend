export class CreateHomeworkDto {
  title: string;
  description: string;
  deadline: Date;
  groupId: number;
  files: string[];
}
