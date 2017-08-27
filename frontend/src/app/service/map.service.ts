import "rxjs/Rx";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class MapService {


  constructor(private http: Http) {

  }

  getMaps(){
    return this.http.get('app/dummy/mock/entity.json')
      .map(res =>{return res.json()});
  }
}
