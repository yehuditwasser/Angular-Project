import { Component, OnInit } from '@angular/core';
import { Gift } from '../models/gift.model';

// import { initMDB } from 'mdb-ui-kit';
import "@fortawesome/fontawesome-free/js/all";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image = [
    {
      itemImageSrc: 'assets/1.png',
      thumbnailImageSrc: 'assets/1.png',
      alt: 'Description for Image 30',
      title: 'Title 30'
    },
    {
      itemImageSrc: 'assets/2.png',
      thumbnailImageSrc: 'assets/2.png',
      alt: 'Description for Image 2',
      title: 'Title 2'
    },
    {
      itemImageSrc: 'assets/3.png',
      thumbnailImageSrc: 'assets/3.png',
      alt: 'Description for Image 3',
      title: 'Title 3'
    },
    {
      itemImageSrc: 'assets/logo.png',
      thumbnailImageSrc: 'assets/logo.png',
      alt: 'Description for Image 4',
      title: 'Title 4'
    },
    {
      itemImageSrc: 'assets/4.png',
      thumbnailImageSrc: 'assets/4.png',
      alt: 'Description for Image 4',
      title: 'Title 4'
    }
  ];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() { }
  ngOnInit(): void {
    console.log(this.image);
  }

}
