import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
/*
  To DO:
    Added validation to form 
    return descriptive errors on failure 
    validate token before allowing form to show
    concela password characters
*/

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.css']
})
export class PasswordResetFormComponent implements OnInit {
  token !:string;
  resetForm !: FormGroup;
  registerSuccessMessage!: string;
  isError!: boolean;

  constructor(private authService: AuthService, private toastr: ToastrService,private activatedRoute:ActivatedRoute) {
    this.token = this.activatedRoute.snapshot.params.token;
    console.log("activated Route token:  : ",this.token)
   }
  ngOnInit(): void {
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  resetPassword(){
    let newPassword = this.resetForm.get("newPassword")?.value;
    let confirmPassword = this.resetForm.get("confirmPassword")?.value;
    if(newPassword == confirmPassword){
      console.log("passwords match");
      if(this.resetForm.valid){
        this.authService.resetPassword(this.token, newPassword).subscribe(
          success =>{
            console.log("password reset success " + success);
            this.toastr.success("Password Has been changed: ", success);
          },
          error=>{
            this.toastr.error("Password Could not be changed: ", error);
            console.log("Password Could not be changed: ", error);
          }
        );
      }
    }  
  }

}
