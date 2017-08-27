import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { ResultComponent } from './result/result.component';
import { ListComponent } from './result/list/list.component';
import { FooterComponent } from './result/footer/footer.component';
import {HttpModule} from "@angular/http";
import {MapService} from "./service/map.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    ResultComponent,
    ListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
