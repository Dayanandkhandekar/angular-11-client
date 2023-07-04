import { Injectable } from '@angular/core';
import { TranslateService } from '../translate/translate.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor( private _translate: TranslateService,) { }
selectedLanguage:string="English";
changeLanguage(newLang: string){
console.log("language set to"+newLang);
this._translate.use(newLang);
}
}
