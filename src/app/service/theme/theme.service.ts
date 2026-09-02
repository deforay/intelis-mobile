import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class themeService {

  private theme: BehaviorSubject < String > ;
 
  constructor() {
    this.theme = new BehaviorSubject('blue-theme');
  }

  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme() {
   return this.theme.asObservable();
  }

}
