import { SwiperComponent } from 'swiper/angular';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import SwiperCore, { Pagination, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageCarouselComponent implements OnInit {
  @Input() imageURL: SafeUrl[] = [];
  @Output() currentSelection = new EventEmitter<string>();

  @ViewChild('swiper') swiper: SwiperComponent;

  constructor() {}
  ngOnInit(): void {}

  onSelectionChange(swiper: SwiperComponent) {
    swiper.activeSlides.subscribe((slides) => {
      slides.forEach((slide) => {
        if (slide.slideIndex == swiper.swiperRef.activeIndex) {
          this.currentSelection.emit(
            document
              .querySelector(`.${slide.classNames.split(' ').join('.')} img`)
              .getAttribute('src')
          );
        }
      });
    });
  }
}
