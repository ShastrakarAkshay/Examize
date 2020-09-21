
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

export interface IQuizModal {
    quizName: string;
    quizDescription: string;
    questions: IQuestionBank[],
    settings: IQuizSettings
}

export interface IQuizSettings {
    shuffleQuestions: boolean;
    negativeMarking: any;
    showResultToParticipants: boolean;
}