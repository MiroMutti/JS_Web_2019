import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from './../../../core/services/comment.service';
import { CommentInfo } from './../../shared/models/comment-info';

@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.css']
})
export class CommentInfoComponent implements OnInit {
  @Input() commentInfo: CommentInfo
  @Output() deleteCommentEmitter = new EventEmitter<string>()

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
  }

  deleteComment(id: string) {
    this.deleteCommentEmitter.emit(id)
  }

  

  isAuthor(commentInfo: Object) {
    return commentInfo['_acl']['creator'] === localStorage.getItem('userId');
  }
}
