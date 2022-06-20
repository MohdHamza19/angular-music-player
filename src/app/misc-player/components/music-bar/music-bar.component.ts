import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { SongsService } from 'src/app/songs.service';

@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.component.html',
  styleUrls: ['./music-bar.component.scss']
})
export class MusicBarComponent implements OnInit {
  name: string = '';
  constructor(private songService: SongsService) { }
  playing: number = 0;  //not playing
  currentSongUrl: string = '';
  playFromStartFlag: number = 1; //1 means yes

  audioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];


  ngOnInit(): void {
    this.songService.newSongUrlObs.subscribe((songUrl: string[]) => {
      this.currentSongUrl = songUrl[0];
      this.name = songUrl[1];
      this.playing = 1;
      if (this.currentSongUrl == "none") {
        this.playing = 0;
      }
      // if (this.currentSongUrl == "none") {
      //   this.currentSongUrl = this.songService.getFirstSong().url;
      //   this.name = this.songService.getFirstSong().name;
      //   this.playing = 0;
      // }
      this.streamObserver(this.currentSongUrl).subscribe((event: any) => { });
    })
  }

  currentTime = '00:00';
  duration = '00:00';
  seekToDuration = 0;
  seek = 0;

  openFile(url: any) {

  }

  streamObserver(url: any) {
    return new Observable((observer: any) => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();


      const handler = (event: Event) => {
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
        this.seekToDuration = this.audioObj.duration;
      }

      this.addEvent(this.audioObj, this.audioEvents, handler)

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;

        this.removeEvent(this.audioObj, this.audioEvents, handler)
      }
    })
  }

  addEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    })
  }

  removeEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    })
  }

  setSeekTo(e: any) {
    this.audioObj.currentTime = e.value;
    this.play();
  }

  setVolume(e: any) {
    this.audioObj.volume = e.target.value
  }

  play() {
    this.audioObj.play();
    this.playing = 1;
  }

  pause() {
    this.audioObj.pause();
    this.playing = 0
  }

  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
    this.playing = 0;
  }

  timeFormat(time: any, format = "mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

}
