import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongsService } from 'src/app/songs.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  loggedIn!: boolean;
  username!:string;
  constructor(private songService:SongsService,
    private router: Router) { 
    this.chkLogin();
  }

  ngOnInit(): void {
    this.songService.getUserName().subscribe({
      next: (data) => this.username=data.toString(),
      // error: (e) => this.router.navigate(['../login']),
      complete: () => console.info('complete') 
  })
  }

  chkLogin(){
    this.songService.checkLogin().subscribe(ifTrue=>{
      if(ifTrue == "true"){
        this.loggedIn = true;
        this.getUserNameFromSvc();
      }
      else{
        this.loggedIn = false;
      }
    })
  }

  getUserNameFromSvc(){
    this.songService.getUserName().subscribe(
      data=>this.username = data.toString(),
    )
  }
}
