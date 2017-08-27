import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";
import {MapService} from "../../service/map.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  maps : any[];

  constructor(private http:Http, private mapService: MapService) {

  }

  ngOnInit() {
    this.getMaps();
  }

  getMaps (){
    this.mapService.getMaps()
      .subscribe(users => {this.maps = users;});
  }
}
