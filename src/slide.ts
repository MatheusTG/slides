export default class Slide {
  container: HTMLElement | null;
  slide: HTMLElement | null;
  dist: {
    startX: number;
    movement: number;
    currentPosition: number;
  };
  constructor(container: string, slide: string) {
    this.container = document.querySelector(container);
    this.slide = document.querySelector(slide);
    this.dist = {
      startX: 0, // Posição do click do mouse no slide
      movement: 0, // Distância percorrida com o mouse clicado
      currentPosition: 0, // Translate atual do slide
    };
  }

  moveSlide() {
    this.slide!.style.transform = `translate3d(${this.dist.currentPosition + this.dist.movement}px, 0, 0)`;
  }

  onMove(event: Event) {
    let pointerPosition;
    if (event instanceof MouseEvent) {
      pointerPosition = event.clientX;
    } else if (event instanceof TouchEvent) {
      pointerPosition = event.changedTouches[0].clientX;
    }

    this.dist.movement = (this.dist.startX - pointerPosition!) * -1;
    this.moveSlide();
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

  addSlideEvents() {
    this.container?.addEventListener('mousedown', this.onStart);
    this.container?.addEventListener('touchstart', this.onStart);
    this.container?.addEventListener('mouseup', this.onEnd);
    this.container?.addEventListener('touchend', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
  }
}
