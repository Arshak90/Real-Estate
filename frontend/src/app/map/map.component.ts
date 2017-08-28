import { Component, AfterViewInit } from '@angular/core';
declare var google: any;

import * as jQuery from 'jquery';
import {debug} from "util";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  public map: any;
  public ployList:any[] = [];
  public ployListReq:any[][] = [];
  public ployListReqa:any[] = [];
  statusMap: boolean = false;

  constructor() { }


  ngAfterViewInit() {
    (<any>window).googleMapsReady = this.initMap.bind(this);
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAEHv8JbWzo_67F0eZxQ5niDBpTKqfN7Ec&libraries=drawing&callback=googleMapsReady";
  }

  public initMap(){
    var that =this;
    function CenterControl(controlDiv, map) {
      // Set CSS for the control border.
      var controlUI = document.createElement('button');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.borderRadius = '10px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlUI.style.cursor = 'pointer';
      controlUI.style.width = '40px';
      controlUI.style.height = '40px';
      controlUI.style.marginBottom = '22px';
      controlUI.style.textAlign = 'center';
      controlUI.style.backgroundImage = 'url(https://cdn1.iconfinder.com/data/icons/free-98-icons/32/pencil-2-32.png)';
      controlUI.style.backgroundPosition = 'center';
      controlUI.style.backgroundRepeat = 'no-repeat';
      controlUI.title = 'Click to recenter the map';
      controlUI.id = 'drawId';
      controlDiv.appendChild(controlUI);

      controlUI.addEventListener('click', function() {
        debugger;
        if(that.statusMap){
          that.map.setOptions({draggable: true});
          controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        }else {
          that.map.setOptions({draggable: false});
          controlUI.style.boxShadow = '0 5px 10px rgba(0,0,0,1.0)';

        }
        that.statusMap = !that.statusMap;
      });

    }

    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(52.5498783, 13.425209099999961),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      }
    };

    that.map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
    google.maps.event.addDomListener(that.map.getDiv(),'mousedown',function(e){
      console.log(e);
      if (e.target.id === 'drawId' || !!e.handled === false || e.button!=0){
        return ;
      }

      //do it with the right mouse-button only
      let poly=new google.maps.Polyline({map:that.map,clickable:false});
      var move=google.maps.event.addListener(that.map,'mousemove',function(e){
        poly.getPath().push(e.latLng);
      });

      google.maps.event.addListenerOnce(that.map,'mouseup',function(e){
        google.maps.event.removeListener(move);
        var path=poly.getPath();
        poly.setMap(null);
        poly=new google.maps.Polygon({map:that.map,path:path});
        that.ployList.push(poly);

        that.ployListReq.push(poly.getPath().b);
      });

    });

    var centerControlDiv = document.createElement('div');
    CenterControl(centerControlDiv, that.map);

    that.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);
  }

  public resetMap(){
    for(let i=0; i< this.ployList.length;i++){
      console.log(this.ployList[i].getPath());
      this.ployList[i].setMap(null);
    }
    this.ployList = [];
  }

  public applyMap(){
    this.map.setOptions({draggable: true});
    this.statusMap = false;
    console.log(this.ployListReq);
  }

  public setPloyListReqa(a: any){
    debugger;
    this.ployListReqa = a[0];
  }

}
