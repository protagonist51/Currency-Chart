import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DataCollectionService} from "../shared/services/data-collection-service";
import {HttpModule} from "@angular/http";
import {DataCollectionApiService} from "../shared/services/data-collection-api.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataCollectionService, DataCollectionApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
