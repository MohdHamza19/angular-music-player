import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from 'src/app/songs.service';
// import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  successMsg = '';
  hide = true;
  regTrue: boolean = false;

  constructor(
    private songsService: SongsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      // email: new FormControl(null, [Validators.email, Validators.required]),
      email: new FormControl(null, [Validators.required]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, [this.passValidator, Validators.required]),
    });

    this.myForm.controls['password'].valueChanges.subscribe(
      (x) => {
        this.myForm.controls['cnfpass'].updateValueAndValidity()
      }
    )
  }

  register() {
    if (this.myForm.valid) {
      this.songsService.submitUser(this.myForm.value)
        .subscribe((data: any) => {
          this.successMsg = "Registration Successful";
          this.myForm.reset();
          this.regTrue = true;
          setTimeout(() => {
            this.router.navigate(['../login'], { relativeTo: this.activatedRoute })
          }, 1500);
          // console.log(data);
        },
          (err: any) => {
            // console.log(err);
            this.successMsg = "Registration unsuccessful"
          })
    }
  }

  ngOnInit(): void {
  }

  isValid(controlName: any) {
    return this.myForm.get(controlName)?.invalid && this.myForm.get(controlName)?.dirty;
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.valid !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          }
        }
      }
    }
    return null
  }

  movetologin() {
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute })
  }
}
