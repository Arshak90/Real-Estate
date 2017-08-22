import { Component, AfterViewInit } from '@angular/core';
declare var google: any;

import * as jQuery from 'jquery';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  public map: any;

  constructor() { }


  ngAfterViewInit() {
    (<any>window).googleMapsReady = this.initMap.bind(this);
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAEHv8JbWzo_67F0eZxQ5niDBpTKqfN7Ec&callback=googleMapsReady";
  }

  public initMap(){
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(52.5498783, 13.425209099999961),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);
    google.maps.event.addDomListener(map.getDiv(),'mousedown',function(e){
      //do it with the right mouse-button only
      if(e.button!=2)return;
      //the polygon
      let poly=new google.maps.Polyline({map:map,clickable:false});
      //move-listener
      var move=google.maps.event.addListener(map,'mousemove',function(e){

        poly.getPath().push(e.latLng);

      });

      google.maps.event.addListenerOnce(map,'mouseup',function(e){
        google.maps.event.removeListener(move);
        var path=poly.getPath();
        poly.setMap(null);
        poly=new google.maps.Polygon({map:map,path:path});
      });

    });
  }


}
