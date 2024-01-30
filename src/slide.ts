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

    this.dist.movement = (this.dist.startX - pointerPosition!) * -1;
    this.moveSlide(this.dist.currentPosition + this.dist.movement);
  }

  onStart(event: Event) {
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
    // Determina a posição atual do slide
    this.dist.currentPosition += this.dist.movement;

    const eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
    this.container?.removeEventListener(eventType, this.onMove);
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
    const position = this.slideArray[index - 1].position;
    this.moveSlide(position);
    this.dist.currentPosition = position;
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
    this.activeSlide(1);

    return this;
  }
}
