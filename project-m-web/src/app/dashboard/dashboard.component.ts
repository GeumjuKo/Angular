import { Router } from '@angular/router'
import { HttpCallerService } from '../http-caller.service'
import { AuthService } from '../auth/auth.service'
import { Component, OnInit } from '@angular/core';


// import { Post } from '../DataStructure'
// import dataset from '../dataset.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userName: string = ""
  public userId: string = ""
  // datafile: Post = dataset;
  // postNum: string = '';
  // category: string = '';
  // title: string ='';
  // writer: string ='';
  // date: string ='';
  // views: Number = 0;
  // diagnosis: string ='';
  // contents: string ='';


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser().getUserData((err: any, data: any)=>{
      if(err)
        console.log("유저정보를 불러오는데 실패했습니다.", err)
      
      this.userName = data.UserAttributes[3].Value
      this.userId = this.authService.currentUser().getUsername();
    })
  }

  onLogout(): void {
    let cognitoUser = this.authService.currentUser()
    cognitoUser?.signOut()
    this.router.navigate(["signin"])
  }

  onWriting(): void{
    let cognitoUser = this.authService.currentUser()
    this.router.navigate(["writing"])

  }
}