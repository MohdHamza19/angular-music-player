import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SongsService } from 'src/app/songs.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  loggedIn!: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private songService: SongsService) { }

  ngOnInit(): void {
    this.chkLogin();
  }
  registerNow() {
    this.router.navigate(['user/register'], { relativeTo: this.route });
  }
  loginNow() {
    this.router.navigate(['user/login'], { relativeTo: this.route });
  }
  logout() {
    this.songService.logoutUser();
    // location.reload();
    this.router.navigate(['user/login'], { relativeTo: this.route });
    this.chkLogin();
  }

  chkLogin(){
    this.songService.checkLogin().subscribe(ifTrue=>{
      if(ifTrue == "true"){
        this.loggedIn = true;
      }
      else{
        this.loggedIn = false;
      }
    })
  }
}
