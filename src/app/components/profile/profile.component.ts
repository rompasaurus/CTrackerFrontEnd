import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username!: string;
  toggle : boolean = false;
  constructor(private activatedRoute:ActivatedRoute) {
    this.username = this.activatedRoute.snapshot.params.username;
    console.log("activated Route username : ",this.activatedRoute.snapshot.params.username)
   }

  ngOnInit(): void {
  }

  toggleMyRideForm(){
    this.toggle = !this.toggle;
  }

}
