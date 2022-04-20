import { Component, OnInit } from '@angular/core';
import { Post } from '../DataStructure';
import dataset from '../dataset.json';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  datafile: Post = dataset;
  write_time: string = '';
  text: string ='';
  edit_time: string ='';
  like: Number =0;
  dislike: Number = 0;
  name : string ='';
  id : string = '';
  constructor() { }

  ngOnInit(): void {
    // this.write_time = this.datafile.comment.write_time;
    // this.text = this.datafile.comment.text;
    // // this.writer = this.datafile.writer;
    // this.edit_time = this.datafile.comment.edit_time;
    // this.like = this.datafile.comment.like;
    // this.dislike = this.datafile.comment.dislike; 
    // this.name = this.datafile.comment.user.name;
    // this.id = this.datafile.comment.user.id;
  }

}
