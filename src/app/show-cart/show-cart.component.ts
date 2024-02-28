import { Component } from '@angular/core';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.css']
})
export class ShowCartComponent {
  // stars: number[] = [1, 2, 3, 4, 5];
  // selectedStarIndex: number = -1;

  // selectStar(index: number): void {
  //   this.selectedStarIndex = index;
  // }
  isHeartFilled: boolean = false;

  toggleHeart(): void {
    this.isHeartFilled = !this.isHeartFilled;
  }
}
