import { Component, OnInit } from '@angular/core';
import { LanguagesService } from 'src/app/languages.service';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/app/models/language.model';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.less']
})
export class LanguageComponent implements OnInit {

  constructor(
    private languageService: LanguagesService,
    private route: ActivatedRoute
  ) { 
      this.route.paramMap.subscribe(data => {
        this.id = Number(data.get('id'));

        this.languageService.getLanguage(this.id)
        .subscribe((language: Language) => {
          this.tableDataSource = [language];
          this.languageService.selectedLanguageId = this.id;
        });
      });
    }

  id: number;

  displayedColumns: string[] = [
    'name',
    'author',
    'appearedIn',
    'typeSystem',
    'description'
  ];
  tableDataSource: any[] = [];

  
  ngOnInit() {

  }
}
