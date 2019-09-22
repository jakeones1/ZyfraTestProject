import { TestBed } from '@angular/core/testing';

import { LanguagesService } from './languages.service';
import { HttpClientModule } from '@angular/common/http';

describe('LanguagesService', () => {
  let languageService: LanguagesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });

    languageService = TestBed.get(LanguagesService);
  });

  it('should be created', () => {
    languageService = TestBed.get(LanguagesService);
    expect(languageService).toBeTruthy();
  });

  it('should define getLanguage method', () => {
    expect(languageService.getLanguage).toBeDefined();
  });

  it('should define getLanguages method', () => {
    expect(languageService.getLanguages).toBeDefined();
  });

  it('should define selectedLanguageId property', () => {
    expect(languageService.selectedLanguageId).toBeDefined();
  });
});
