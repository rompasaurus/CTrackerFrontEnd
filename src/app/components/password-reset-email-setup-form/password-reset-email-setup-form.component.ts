import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

/*
  To DO:
    validate proper email
*/

@Component({
  selector: 'app-password-reset-email-setup-form',
  templateUrl: './password-reset-email-setup-form.component.html',
  styleUrls: ['./password-reset-email-setup-form.component.css']
})
export class PasswordResetEmailSetupFormComponent implements OnInit {
  resetEmailForm !: FormGroup;
  registerSuccessMessage!: string;
  isError!: boolean;

  constructor(private authService: AuthService, private router: Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.resetEmailForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  sendEmail(){
    if(this.resetEmailForm.valid){
      this.authService.sendResetEmail(this.resetEmailForm.get("email")?.value).subscribe(
        success =>{
          this.toastr.success('password reset email sent check your email');
          this.router.navigateByUrl('');
          this.toastr.success('password reset email sent check your email');
        },
        fail =>{
          this.toastr.error('password reset email failed to send');
          console.log(fail);
        }
      )
    }
  }

}
