import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  title = 'something';
  currentSlideIndex = 0;
  slides: [string] = [''];
  lastPosition: number;
  bodyWidth: number = document.body.offsetWidth;
  translate: number = -0.189 * this.bodyWidth * this.currentSlideIndex;

  // tslint:disable-next-line:typedef
  ngOnInit() {
    for (let i = 0; i < 13; i++) {
      if (i < 9) {
        this.slides[i] = `assets/images/img_0${i + 1}.jpg`;
      }
      else {
        this.slides[i] = `assets/images/img_${i + 1}.jpg`;
      }
    }
  }

  // tslint:disable-next-line:typedef
  next() {
    if (this.currentSlideIndex < 9) {
      this.currentSlideIndex++;
    }

    // tslint:disable-next-line:max-line-length
    this.translate = -0.189 * this.bodyWidth * this.currentSlideIndex < -1.526 * this.bodyWidth ? -1.526 * this.bodyWidth : -0.189 * this.currentSlideIndex * this.bodyWidth;
  }

  // tslint:disable-next-line:typedef
  previous() {
    if (this.currentSlideIndex) {
      this.currentSlideIndex--;
    }
    this.translate = -0.189 * document.body.offsetWidth * this.currentSlideIndex;
  }

  // tslint:disable-next-line:typedef
  onDragStart(event: MouseEvent) {
    this.lastPosition = this.lastPosition || event.clientX;
    const target = event.currentTarget as HTMLElement;
    target.style.transition = '0s';
    target.addEventListener('mousemove', this.onDragMove.bind(this), true);
  }

  // tslint:disable-next-line:typedef
  onDragMove(event: MouseEvent) {
    const translate = event.clientX - this.lastPosition - 0.05 * this.bodyWidth;

    this.translate = translate > 0 ? 0 : translate;
  }

  // tslint:disable-next-line:typedef
  onDragEnd(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.style.transition = '0.3s';
    target.removeEventListener('mousemove', this.onDragMove, true);
    console.log(event.currentTarget);
  }
}
