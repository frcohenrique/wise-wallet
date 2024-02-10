import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public userId$: Observable<string> = this.userIdSubject.asObservable();

  constructor() {}

  setCurrentUserId(id: string) {
    this.userIdSubject.next(id);
  }
}
