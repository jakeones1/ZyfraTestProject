import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Language } from './models/language.model';
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private httpClient: HttpClient) {
  }

  getLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(environment.REST.LANGUAGES);
  }

  getLanguage(id: number): Observable<Language> {
    return this.httpClient.get<Language>(environment.REST.LANGUAGES + id);
  }

  selectedLanguageId: number = null;
}
