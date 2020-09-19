export interface IQuestionType {
    id: any;
    question: string;
    questionType: any;
    options: any;
    answerKey: any,
    points: number;
    required: boolean;
    readonly: boolean;
}