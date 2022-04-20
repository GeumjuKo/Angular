import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})


export class TVComponent implements OnInit,OnChanges {
  videoId: string = '';
  playerConfig: any = {};

  @Input() channel: string = ""; //방법3. AppComponent로부터 수신 받기 위한 변수 channel

  constructor() {
  }

  ngOnInit(): void {
    const tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    this.playerConfig = {
      autoplay: 1
    };

    this.videoId = 'XqZsoesa55w';
  }
  
  ngOnChanges(): void{ //방법3. 변수 channel 변경 시 호출 (변수에 새로운 값 할당 시 호출되는 생명주기 콜백 함수)
    this.play(this.channel);
  }
  
  play(channel: string) {
    this.playerConfig = {
      autoplay: 1
    };

    this.videoId = channel;
  }
}




