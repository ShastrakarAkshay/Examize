import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { IQuizModal } from 'src/app/question-bank/interface/question-bank.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {

  questionData = new Subject();
  questionBank$ = this.questionData.asObservable();

  COLLECTION = 'QuestionBank';

  constructor(private _firestore: AngularFirestore) { }

  setQuestionBankData(data: IQuizModal) {
    this.questionData.next(data);
  }

  saveQuestionBank(data: IQuizModal): Promise<any> {
    return this._firestore.collection(this.COLLECTION).add(data);
  }

  getAllQuestionBank(): Observable<any> {
    return this._firestore.collection(this.COLLECTION).snapshotChanges();
  }

  deleteQuestionBank(id: any): Promise<any> {
    return this._firestore.collection(this.COLLECTION).doc(id).delete();
  }

  getQuestionBankById(id: any): Observable<any>{
    return this._firestore.collection(this.COLLECTION).doc(id).snapshotChanges();
  }

  updateQuestionBank(id: any, data: IQuizModal): Promise<any> {
    return this._firestore.collection(this.COLLECTION).doc(id).update(data);
  }
}
