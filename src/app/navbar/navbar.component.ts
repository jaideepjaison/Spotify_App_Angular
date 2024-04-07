import { Component,OnInit } from '@angular/core';
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
    this.result = this.spotifyAPI + this.serachItem + '&type=track';
    console.log(this.result);
    this.http.get<any>(this.result).subscribe((data: any) => {
      this.jsonData = data;
      // Check if data exists and has the correct structure
      if (data && data.tracks && data.tracks.items) {
        this.tracks = data.tracks.items.map((item: any) => {
          return {
            title: item.name,
            image: item.album.images.length > 0 ? item.album.images[0].url : null, // Use the first image URL, or null if no image available
            preview:item.preview_url
          };
        });
        console.log(this.jsonData); // Log the data to see its structure
        console.log(this.tracks); 
      } else {
        console.error('Invalid API response:', data);
      }
    });
    
    
  }

  ngOnInit(): void {
    const strings: string[] = ['hindi songs', 'new songs', 'latest songs', 'trending_songs', 'party songs'];
    
    this.serachItem=strings[Math.floor(Math.random() * strings.length)];
    console.log(this.serachItem);
    
    this.searchSong();
  }



}
