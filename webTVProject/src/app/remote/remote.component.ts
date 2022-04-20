import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { TVComponent } from '../TV/tv.component';
import { RestAPIService,Video } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})

export class RemoteComponent implements OnInit {

  @Output() callParent = new EventEmitter<string>(); //방법3.  event emitter 로 parent(AppComponent) 에게 event 전송
  tvComponent = new TVComponent(); //방법2. RemoteComponent 에서 TVComponent method 바로 호출을 위한 인스턴스 생성
  
  videos: any ;
  // constructor(public rest: RestAPIService, private router : Router) {}
  constructor(public rest: RestAPIService) {}

  ngOnInit(): void {
  }

  getVideo(): any{
    this.rest.getVideo().subscribe( //동생한테 맡기기
      (resp:any) => {
        this.videos = resp; 
        console.log('getVideo: ', this.videos);
        this.onPlay()
      }
    );
  }

  onPlay(): void{ //방법3.
    // this.router.navigate(['/Video']);
    var result = this.videos; // 계산끝난상태
    console.log(result);
    this.callParent.emit(result._id);
  }

  changeChannel(channel: string): void{ // 방법2. RemoteComponent 에서 TVComponent method 바로 호출 
    console.log("change Channel in remote control !!!");
    this.tvComponent.play(channel);
}

connectWS():void{
  // 웹소켓 전역 객체 생성
  var ws = new WebSocket("ws://localhost:8080", "echo-protocol"); 
  // 연결이 수립되면 서버에 메시지를 전송한다 
  ws.onopen = function(event) { ws.send("Client message"); } 
  // 서버로 부터 메시지를 수신한다 
  ws.onmessage = function(event) { console.log("Server message: ", event.data);
  document.write("Server message: ", event.data); } 
   // error event handler
  ws.onerror = function(event)
     { console.log("Server error message: ");}
}
}