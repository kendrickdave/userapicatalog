import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Coordinate } from 'src/app/interface/Coordinate.interface';
import { Respond } from 'src/app/interface/respond.interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
respond:Respond;
mode: 'edit' | 'locked' = 'locked';
buttonText: 'Save Changes' | 'Edit'= 'Edit';

 constructor(private activatedRoute:ActivatedRoute, private userService:UserService){}
  ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
    console.log('User ID:' ,params.get('uuid')!);
    this.userService.getUser(params.get('uuid')!).subscribe(
    (Response:any)=>{
      console.log(Response);
      this.respond = Response;
    }
    );
   });
  }

switchMode(mode?: 'edit' | 'locked' ): void{
  console.log(mode);
  this.mode = this.mode === 'locked' ? 'edit' : 'locked';
  this.buttonText =this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';
  if(mode === 'edit'){
    //logic to update the user on the backend 
    console.log('Updating using on the back end');
  }
}

private loadMap(coordinate : Coordinate): void{
const map= Leaflet.map('map',{
  center: [coordinate.latitude, coordinate.longitude],
  zoom: 8
});
const mainLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  tileSize: 512,
  zoomOffset: -1,
  minZoom:1,
maxZoom: 30,
crossOrigin:true,
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

mainLayer.addTo(map)

}

} 
