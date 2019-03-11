import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  post: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.post = 'assets' + this.router.url;
  }
}
