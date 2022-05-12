import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {CatFactApiService} from "./api/cat-fact-api.service";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BitcoinPriceService} from "./api/bitcoin-price.service";
import {GenderizeService} from "./api/genderize.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [
    BitcoinPriceService,
    CatFactApiService,
    GenderizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
