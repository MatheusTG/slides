interface SlideArrayItem {
  element: HTMLElement;
  position: number;
}

export default class Slide {
  container: HTMLElement | null;
  slide: HTMLElement | null;
  dist: {
    startX: number; // Posição do click do mouse no slide
    movement: number; // Distância percorrida com o mouse clicado
    currentPosition: number; // Translate atual do slide
  };
  index: {
    prev: number; // Index do slide anterior
    active: number; // Index do slide atual
    next: number; // Index do próximo slide
  };
  slideArray: SlideArrayItem[];
  constructor(container: string, slide: string) {
    this.container = document.querySelector(container);
    this.slide = document.querySelector(slide);
    this.dist = {
      startX: 0,
      movement: 0,
      currentPosition: 0,
    };
    this.index = { prev: 0, active: 1, next: 2 };
    this.slideArray = [];
  }

  transition(active: boolean) {
    if (this.slide) {
      if (active) {
        this.slide.style.transition = 'transform 0.5s';
      } else {
        this.slide.style.transition = '';
      }
    }
  }

  moveSlide(distX: number) {
    this.slide!.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  onMove(event: Event) {
    let pointerPosition;
    if (event instanceof MouseEvent) {
      pointerPosition = event.clientX;
    } else if (event instanceof TouchEvent) {
      pointerPosition = event.changedTouches[0].clientX;
    }

    this.dist.movement = (this.dist.startX - pointerPosition!) * -1.6;
    this.moveSlide(this.dist.currentPosition + this.dist.movement);
  }

  onStart(event: Event) {
    this.transition(false);

    if (event instanceof MouseEvent) {
      event.preventDefault();
      this.dist.startX = event.clientX;
    } else if (event instanceof TouchEvent) {
      this.dist.startX = event.changedTouches[0].clientX;
    }

    const eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
    this.container?.addEventListener(eventType, this.onMove);
  }

  onEnd(event: Event) {
    this.transition(true);

    // Determina a posição atual do slide
    this.dist.currentPosition += this.dist.movement;

    const eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
    this.container?.removeEventListener(eventType, this.onMove);

    if (this.dist.movement > 80) this.prev();
    else if (this.dist.movement < -80) this.next();
    else this.activeSlide(this.index.active);
  }

  // Adiciona os eventos para o mevimento do slide
  addSlideEvents() {
    this.container?.addEventListener('mousedown', this.onStart);
    this.container?.addEventListener('touchstart', this.onStart);
    this.container?.addEventListener('mouseup', this.onEnd);
    this.container?.addEventListener('touchend', this.onEnd);
  }

  slidePostion() {
    if (this.slide) {
      const slides = <HTMLElement[]>Array.from(this.slide.children);

      slides.forEach((slide, index) => {
        // Distância do slide até a borda da tela
        const slideSpace = (window.innerWidth - slide.offsetWidth) / 2;
        this.slideArray[index] = {
          element: slide,
          position: slideSpace + slide.offsetLeft * -1,
        };
      });
    }
  }

  activeSlide(index: number) {
    const slide = this.slideArray[index - 1];
    this.moveSlide(slide.position);
    this.dist.currentPosition = slide.position;

    this.slideArray.forEach((item) => item.element.classList.remove('active'));
    slide.element.classList.add('active');
  }

  prev() {
    if (this.index.prev) {
      this.activeSlide(this.index.prev);
      this.index.prev -= 1;
      this.index.active -= 1;
      this.index.next -= 1;
    } else {
      this.activeSlide(this.index.active);
    }
  }

  next() {
    if (this.index.next <= this.slideArray.length) {
      this.activeSlide(this.index.next);
      this.index.prev += 1;
      this.index.active += 1;
      this.index.next += 1;
    } else {
      this.activeSlide(this.index.active);
    }
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidePostion();
    this.activeSlide(3);
    this.transition(true);

    return this;
  }
}
