export class CreateTestDto {
    name : string;
    answer : string[];
    correctAnswer : number;
    deadline : Date;
    groupId : number;
}

export class CreateResultDto {
    testId : number;
    studentId : number;
    testIndex : number;
}
