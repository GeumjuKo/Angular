import { Injectable } from '@angular/core'
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private cognitoUser: any = {}

  constructor() {
    this.cognitoUser = new CognitoUserPool({
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    }).getCurrentUser()
  }

  isLoggedIn(): boolean {
    let isAuth = false

    if (this.cognitoUser != null) {
      this.cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err))
        }
        isAuth = session.isValid()
      })
    }
    return isAuth
  }

  currentUser(): CognitoUser {
    return this.cognitoUser
  }

  currentUserSession(): any {
    let currentSession = undefined

    if (this.cognitoUser != null) {
      this.cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err))
        }
        currentSession = session
      })
    }
    return currentSession
  }
}