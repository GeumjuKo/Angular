import { Component, OnInit } from '@angular/core'
import { CognitoUser, CognitoUserPool, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

interface formDataInterface {
  "name": string
  "family_name": string
  "custom:gender": string
  "email": string
  "phone_number": string
  [key: string]: string
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false
  submited: boolean = false
  fname: string = ''
  lname: string = ''
  gender: string = ''
  email: string = ''
  mobileNo: string = ''
  password: string = ''
  vericode: string = ''

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onSignup(form: NgForm) {
    console.log("click", form.valid)
    // if (form.valid) {
      this.isLoading = true
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      }
      let userPool = new CognitoUserPool(poolData)
      let attributeList = []
      let formData: formDataInterface = {
        "name": this.fname,
        "family_name": this.lname,
        "custom:gender": this.gender,
        "email": this.email,
        "phone_number": this.mobileNo
      }

      for (let key in formData) {
        let attrData = {
          Name: key,
          Value: formData[key]
        }
        let attribute = new CognitoUserAttribute(attrData)
        attributeList.push(attribute)
      }
      userPool.signUp(this.email, this.password, attributeList, [], (
        err,
        result
      ) => {

        this.isLoading = false
        if (err) {
          alert(err.message || JSON.stringify(err))
          return
        }
        this.submited = true
        // this.router.navigate(['/signin'])
      })

    // }
  }
  
  userVerify(form: NgForm) {

    // if (form.valid) {
      this.isLoading = true

      let vericode = this.vericode
      console.log(vericode)

      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      }

      let userPool = new CognitoUserPool(poolData)

      let userData = {
        Username: this.email,
        Pool: userPool
      }

      let cognitoUser = new CognitoUser(userData)

      cognitoUser.confirmRegistration(this.vericode, true, (err, result) => {
        this.isLoading = false
        if (err) {
          alert(err.message || JSON.stringify(err))
          return
        }
        console.log('call result: ' + result)

        if(confirm("회원가입을 완료했습니다."))
          this.router.navigate(['signin'])
      })
    // }
  }
}