import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from './../../../core/services/comment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @ViewChild('f') createCommentForm: NgForm;
  @Input() postId: string
  @Output() postCommentEmitter = new EventEmitter<void>()

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
  }

  postComment() {
    const body = this.createCommentForm.value;
    body['postId'] = this.postId;
    body['author'] = localStorage.getItem('username');

    this.commentService
      .postComment(this.createCommentForm.value)
      .subscribe(() => {
        this.createCommentForm.reset();
        this.postCommentEmitter.emit()
     //   this.loadComments();
      })
    }
}
