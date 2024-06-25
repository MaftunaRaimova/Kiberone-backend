export class CreateCouratorDto {
  name: string;
  login: string;
  phone?: string;
  password: string;
  groupIds: number[];
}
