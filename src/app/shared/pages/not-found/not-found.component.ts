import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: false,
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  backUrl() {
    this.location.back();
  }

}
