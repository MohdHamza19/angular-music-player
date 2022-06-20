import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SongsService } from 'src/app/songs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: any;
  hide = true;

  constructor(private songService: SongsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  login() {
    console.log('Login');
    this.songService.loginUser(this.myForm.value)
      .subscribe((data: any) => {
        // this.successMsg = "Success";
        console.log(data);
        localStorage.setItem('token', data.toString());
        this.router.navigate(['music/playlist']);

      },
      (err: any) => {
        console.log(err);
      })
  }

}
