import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false
  emailAddress: string = ""
  password: string = ""

  constructor(private router: Router) { }

  ngOnInit(): void { }
  
  OnSignUp(): void{
    this.router.navigateByUrl('/signup')
  }
  onSignIn(form: NgForm) {
    if (form.valid) {
      this.isLoading = true
      let authenticationDetails = new AuthenticationDetails({
        Username: this.emailAddress,
        Password: this.password
      })
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId,
        ClientId: environment.cognitoAppClientId
      }

      let userPool = new CognitoUserPool(poolData)
      let userData = { Username: this.emailAddress, Pool: userPool }
      let cognitoUser = new CognitoUser(userData)
      
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log("@@@@@@@@@:", result.getAccessToken().getJwtToken())
          this.router.navigate(["dashboard"])
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err))
          this.isLoading = false
        },
      })
    }
  }
}