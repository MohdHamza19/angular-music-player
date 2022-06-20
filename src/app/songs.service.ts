import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  obsUsingConstructor: any;
  currentlUrl: any;
  newSongUrl = new BehaviorSubject(['none']);
  newSongUrlObs = this.newSongUrl.asObservable();
  files: any = [];
  loggedIn = new BehaviorSubject('false');
  loggedInObs = this.loggedIn.asObservable();
  userPlaylist = [];

  constructor(private httpClient: HttpClient) {
    this.getAllSongs().subscribe(music => {
      this.files = music
    })

    // this.submitUser().subscribe((data: any) => {
    //   console.log(data);
    // })
  }

  getAllSongs() {
    // return this.obsUsingConstructor = new Observable(observer => {
    //   observer.next(this.files)

    //   observer.complete()
    // })
    return this.httpClient.get('http://localhost:3005/allsongs')
  }

  getFirstSong() {
    return this.files[0];
  }

  playNow(index: number): any {
    this.currentlUrl = this.files[index].url;
    const name = this.files[index].name;
    const author = this.files[index].author;
    const thumbnail = this.files[index].thumbnail;
    this.newSongUrl.next(
      [
        this.currentlUrl,
        name,
        author,
        thumbnail
      ]
    );
  }

  currentTime = '00:00';
  duration = '00:00';
  seekToDuration = 0;
  seek = 0;

  submitUser(body: any) {
    return this.httpClient.post('http://localhost:3005/users/register', body)
  }
  loginUser(body: any) {
    this.loggedIn.next("true");
    return this.httpClient.post('http://localhost:3005/users/login', body)
  }
  logoutUser() {
    localStorage.clear();
  }

  getUserName(){
    return this.httpClient.get('http://localhost:3005/users/username',{
      observe:'body',
      params: new HttpParams().append('token', localStorage.getItem('token')||'{}')
    })
  }
  
  checkLogin() {
    if (localStorage.getItem('token') != null) {
      // return ['true'].asObservable();
      this.loggedIn.next("true")
      console.log("true")
      return this.loggedIn;
    }
    else {
      this.loggedIn.next("false")
      return this.loggedIn;
    }
  }
}
