import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss']
})
export class SliderItemComponent {
  @Input() slide: string;
}
