import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule }   from '@angular/common/http';

import { 
  MatTreeModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule
} from '@angular/material';
import { LanguagesService } from './languages.service';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageComponent } from './languages/language/language.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'languages', pathMatch: 'full'},
  {path: 'languages', component: LanguagesComponent, children: 
    [
      { path: 'language/:id', component: LanguageComponent}
    ]  
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LanguagesComponent,
    LanguageComponent
  ],
  imports: [
    BrowserModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LanguagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
