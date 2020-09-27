
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
    settings: IQuizSettings,
    createdOn: any,
    modifiedOn: any
}

export interface IQuizSettings {
    shuffleQuestions: boolean;
    negativeMarking: any;
    showResult: boolean;
    timer: IQuizTimer;
}

export interface IQuizTimer {
    status: boolean;
    duration: number; // minutes
}