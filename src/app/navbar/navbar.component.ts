import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  serachItem:any;
  spotifyAPI:any='https://v1.nocodeapi.com/jaison3666/spotify/ZxCnplbMayoPRJSG/search?q=';
  result:any;
  jsonData: any;
  tracks: any[] = []; // Array to store track data (titles and images)
  constructor(private http: HttpClient){}

  searchSong(){
    console.log(this.serachItem);
    this.result=this.spotifyAPI+this.serachItem;
    console.log(this.result);
    this.http.get<any>(this.result)
      .subscribe((data: any) => {
        this.jsonData = data;
        this.tracks = data.albums.items.map((item: any) => {
          return {
            title: item.name,
            image: item.images.length > 0 ? item.images[0].url : null // Use the first image URL, or null if no image available
          };
        });
        console.log(this.jsonData); // Log the data to see its structure
        console.log(this.tracks); 
      });
    
    
  }



}
