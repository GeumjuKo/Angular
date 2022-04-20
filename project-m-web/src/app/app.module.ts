import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { SignInComponent } from './auth/sign-in/sign-in.component'
import { SignUpComponent } from './auth/sign-up/sign-up.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommentsComponent } from './comments/comments.component';
import { PostComponent } from './post/post.component';
import { WritingComponent } from './writing/writing.component'
import { GetValuesPipe } from './\bget-values.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    CommentsComponent,
    PostComponent,
    WritingComponent,
    GetValuesPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }