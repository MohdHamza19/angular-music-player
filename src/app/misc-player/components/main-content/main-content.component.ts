import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/songs.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  currentSongUrl: string = '';
  name: string = '';
  author: string = '';
  thumbnail: string = '';

  constructor(private songService: SongsService) { }

  ngOnInit(): void {
    this.songService.newSongUrlObs.subscribe(songUrl => {
      this.currentSongUrl = songUrl[0];
      this.name = songUrl[1];
      this.author = songUrl[2];
      this.thumbnail = songUrl[3];
      if (this.currentSongUrl == 'none') {
        const firstSongObject = this.songService.getFirstSong();
        this.currentSongUrl = firstSongObject.url;
        this.name = firstSongObject.name;
        this.author = firstSongObject.author;
        this.thumbnail = firstSongObject.thumbnail;
      }
    })
  }

}
