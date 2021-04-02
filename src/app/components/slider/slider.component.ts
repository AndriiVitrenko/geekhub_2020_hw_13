import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  currentSlideIndex = 0;
  slides: string[] = [''];
  startPosition: number;
  lastTranslate: number;
  bodyWidth: number = document.body.offsetWidth - 17;
  translate: number = -0.189 * this.bodyWidth * this.currentSlideIndex;
  isActive = false;
  sliderTrackWidth: number;

  ngOnInit(): void {
    const track = document.querySelector('.slider__track') as HTMLElement;
    this.sliderTrackWidth = track.offsetWidth;
    for (let i = 0; i < 13; i++) {
      if (i < 9) {
        this.slides[i] = `assets/images/img_0${i + 1}.jpg`;
      } else {
        this.slides[i] = `assets/images/img_${i + 1}.jpg`;
      }
    }
  }

  next(): void {
    if (this.currentSlideIndex < 9) {
      this.currentSlideIndex++;
    }
    if (-0.189 * this.bodyWidth * this.currentSlideIndex < 0.9 * this.bodyWidth - this.sliderTrackWidth) {
      this.translate = 0.9 * this.bodyWidth - this.sliderTrackWidth;
    } else {
      this.translate = -0.189 * this.currentSlideIndex * this.bodyWidth;
    }
  }

  previous(): void {
    if (this.currentSlideIndex) {
      this.currentSlideIndex--;
    }
    this.translate = -0.189 * document.body.offsetWidth * this.currentSlideIndex;
  }

  onDragStart(event: MouseEvent): void {
    this.startPosition = event.clientX;
    this.lastTranslate = this.translate;
    this.isActive = true;
  }

  onDragMove(event: MouseEvent): void {
    if (this.isActive) {
      const translate = this.lastTranslate + event.clientX - this.startPosition;

      if (translate > 0) {
        this.translate = 0;
      } else if (translate < 0.9 * this.bodyWidth - this.sliderTrackWidth) {
        this.translate = 0.9 * this.bodyWidth - this.sliderTrackWidth;
      } else {
        this.translate = translate;
      }
    }
  }

  onDragEnd(): void {
    this.isActive = false;
    this.lastTranslate = this.translate;
    this.currentSlideIndex = Math.ceil(this.translate / (-0.189) / this.bodyWidth);
  }
}
