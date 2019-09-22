import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageComponent } from './language.component';
import { MatTableModule, MatTreeModule, MatIconModule } from '@angular/material';
import { LanguagesService } from '../../languages.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LanguagesComponent } from '../languages.component';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  const appRoutes: Routes = [
    {path: '', redirectTo: 'languages', pathMatch: 'full'},
    {path: 'languages', component: LanguagesComponent, children:
      [
        { path: 'language/:id', component: LanguagesComponent}
      ]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageComponent, LanguagesComponent ],
      imports: [
        MatTableModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        MatTreeModule,
        MatIconModule
      ],
      providers: [LanguagesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define id property', () => {
    expect(component.id).toBeDefined();
  });

  it('should define displayedColumns property', () => {
    expect(component.displayedColumns).toBeDefined();
  });

  it('should check displayedColumns property value', () => {
    let displayedColumns = [
      'name',
      'author',
      'appearedIn',
      'typeSystem',
      'description'
    ];
    expect(component.displayedColumns).toEqual(displayedColumns);
  });

  it('should define tableDataSource property', () => {
    expect(component.tableDataSource).toBeDefined();
  });
});
