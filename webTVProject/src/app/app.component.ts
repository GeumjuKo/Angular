import { Component, ViewChild } from '@angular/core';
import { TestScheduler } from 'rxjs/testing';
import { TVComponent } from './TV/tv.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent { 
  public tvChannel: string = "";

  constructor(){}

  // tvComponent: TVComponent;
  // receiveMessage($event: string): void{

  // }
  
  // 방법3. RemoteComponent 로 부터 받은 event
  getMessageFromRemoteControl(channel: string): void{ 
    console.log("Appcompnent getMessageFromRemoteControl channel:", channel);
    this.tvChannel = channel;
  }
}
