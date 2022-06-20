import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SongsService } from 'src/app/songs.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss']
})
export class AllSongsComponent implements OnInit {
  songs: any;


  constructor(private songService: SongsService) { }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe((songs: any) => {
      console.log("s ",this.songs);
      this.songs = songs;
    })
  }

  playSong(i: any) {
    // const urlFromList = this.songs[i].url
    this.songService.playNow(i);
    // this.newSongUrl.next(urlFromList);
  }

}
