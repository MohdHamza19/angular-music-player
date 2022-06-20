// import { Component, OnInit } from '@angular/core';
// import { SongsService } from 'src/app/songs.service';

// @Component({
//   selector: 'app-playlists',
//   templateUrl: './playlists.component.html',
//   styleUrls: ['./playlists.component.scss']
// })
// export class PlaylistsComponent implements OnInit {
//   loggedIn!: boolean;
//   constructor(private songService:SongsService) { }

//   ngOnInit(): void {
//     this.songService.checkLogin().subscribe(ifTrue=>{
//       if(ifTrue){
//         this.loggedIn = true;
//       }
//       else{
//         this.loggedIn = false;
//       }
//     })
//   }

// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongsService } from 'src/app/songs.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  loggedIn!: boolean;
  username!:string;
  constructor(private songService:SongsService,
    private router: Router) { 
    // this.chkLogin();
  }

  ngOnInit(): void {
    this.songService.getUserName().subscribe({
      next: (data) => this.username=data.toString(),
      error: (e) => this.router.navigate(['../login']),
      complete: () => console.info('complete') 
  })
  }

  // chkLogin(){
  //   this.songService.checkLogin().subscribe(ifTrue=>{
  //     if(ifTrue == "true"){
  //       this.loggedIn = true;
  //       this.getUserNameFromSvc();
  //     }
  //     else{
  //       this.loggedIn = false;
  //     }
  //   })
  // }

  getUserNameFromSvc(){
    this.songService.getUserName().subscribe(
      data=>this.username = data.toString(),
    )
  }
}
