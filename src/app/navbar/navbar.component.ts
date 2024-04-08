import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  serachItem: string = '';
  spotifyAPI: any =
    'https://v1.nocodeapi.com/boison123/spotify/lSFZDSffMxORXJPv/search?q=';
  result: any;
  jsonData: any;
  tracks: any[] = []; // Array to store track data (titles and images)
  loading: boolean = false;
  seach_check: boolean = false;
  constructor(private http: HttpClient,private snackBar: MatSnackBar) {}

  searchSong() {
    console.log(this.serachItem);
    if (this.serachItem == '') {
      this.snackBar.open('Please enter name...', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    } else {
      this.loading = true;
      this.result = this.spotifyAPI + this.serachItem + '&type=track';
      console.log(this.result);
      this.http.get<any>(this.result).subscribe((data: any) => {
        this.jsonData = data;
        // Check if data exists and has the correct structure
        this.loading = false;
        if (data && data.tracks && data.tracks.items) {
          this.tracks = data.tracks.items.map((item: any) => {
            return {
              title: item.name,
              image:
                item.album.images.length > 0 ? item.album.images[0].url : null, // Use the first image URL, or null if no image available
              preview: item.preview_url,
            };
          });
          console.log(this.jsonData); // Log the data to see its structure
          console.log(this.tracks);
        } else {
          this.loading = false;
          console.error('Invalid API response:', data);
        }
      });
    }
  }

  ngOnInit(): void {
    const strings: string[] = [
      'hindi songs',
      'new songs',
      'latest songs',
      'trending songs',
      'party songs',
    ];

    this.serachItem = strings[Math.floor(Math.random() * strings.length)];

    this.searchSong();
  }
}
