import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  context: this;
  title = 'something';
  currentSlideIndex = 0;
  slides: [string] = [''];
  startPosition: number;
  lastTranslate: number;
  bodyWidth: number = document.body.offsetWidth;
  translate: number = -0.189 * this.bodyWidth * this.currentSlideIndex;
  isActive = false;

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
    this.startPosition = this.startPosition || event.clientX;
    this.lastTranslate = this.translate;
    this.isActive = true;
    console.log('Start params:', this.lastTranslate, this.startPosition)
  }

  // tslint:disable-next-line:typedef
  onDragMove(event: MouseEvent) {
    if (this.isActive) {
      const translate = this.lastTranslate + event.clientX - this.startPosition;

      if (translate > 0) {
        this.translate = 0;
      }
      else if (translate < -1.526 * this.bodyWidth) {
        this.translate = -1.526 * this.bodyWidth;
      }
      else {
        this.translate = translate
      }
    }
  }

  // tslint:disable-next-line:typedef
  onDragEnd(event: MouseEvent) {
    this.isActive = false;
    this.lastTranslate = this.translate;
    this.currentSlideIndex = Math.round(this.translate / (-0.189) / this.bodyWidth)
    console.log('End params:', this.lastTranslate, this.startPosition)
  }
}
