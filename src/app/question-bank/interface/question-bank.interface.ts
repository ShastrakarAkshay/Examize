
export interface IQuestionBank{
    id: any;
    question: string;
    questionType: number;
    options: IQuestionOptions[];
    answerKey: any,
    points: number;
    required: boolean;
    readonly: boolean;
}

export interface IQuestionOptions {
    id: any;
    name: string;
}