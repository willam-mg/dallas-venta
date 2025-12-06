import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  standalone: false,
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public title:Title) {
    this.title.setTitle('Inicio');
  }

  ngOnInit(): void {
  }

}
