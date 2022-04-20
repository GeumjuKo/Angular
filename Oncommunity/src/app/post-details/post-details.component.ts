import { CommentStartToken } from '@angular/compiler/src/ml_parser/tokens';
import { Component, OnInit } from '@angular/core';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { CommentDetailsComponent } from '../comment-details/comment-details.component';
import dataset from '../dataset.json';
import { Post } from '../DataStructure'

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})

export class PostDetailsComponent implements OnInit {

  datafile: Post = dataset;
  category: string = '';
  title: string ='';
  writer: string ='';
  date: string ='';
  views: Number = 0;
  diagnosis: string ='';
  contents: string ='';

  comment_details = new CommentDetailsComponent()
  constructor() {
  }

  ngOnInit(): void {
    this.category = this.datafile.category;
    this.title = this.datafile.title;
    // this.writer = this.datafile.writer;
    this.writer = this.datafile.user.name;
    this.date = this.datafile.date;
    this.views = this.datafile.views; 
    this.diagnosis = this.datafile.diagnosis;
    this.contents = this.datafile.contents;
  }
}
