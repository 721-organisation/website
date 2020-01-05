    import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';  
    import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';  

    @Component({  
      selector: 'app-testimoninals-carousel',  
      templateUrl: './testimonials.component.html',  
      styleUrls: ['./testimonials.component.less']  
    })  
    export class TestimonialsComponent {  

      constructor(config: NgbCarouselConfig) {
        config.showNavigationArrows = false;
        config.showNavigationIndicators = false;
        config.pauseOnHover = true;
      }

      testimonial_1 = true;
      testimonial_2 = false;
      testimonial_3 = false;

      @ViewChild('carousel', { static : true }) carousel: NgbCarousel;

      selectedSlide(item) {
        this.carousel.select(item);
      }
      
      onSlide(slideEvent: NgbSlideEvent) {
        switch(slideEvent.current) {
          case "testimonial-1":
            this.testimonial_1 = true;
            this.testimonial_2 = false;
            this.testimonial_3 = false;
            break;
          case "testimonial-2":
            this.testimonial_1 = false;
            this.testimonial_2 = true;
            this.testimonial_3 = false;
            break
          case "testimonial-3":
            this.testimonial_1 = false;
            this.testimonial_2 = false;
            this.testimonial_3 = true;
            break;
        }
      }
    }  

 