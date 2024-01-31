import debounce from './debounce';

interface SlideArrayItem {
  element: HTMLElement;
  position: number;
}

class Slide {
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
  changeEvent: Event;
  constructor(container: string, slide: string) {
    this.container = document.querySelector(container);
    this.slide = document.querySelector(slide);
    this.dist = {
      startX: 0,
      movement: 0,
      currentPosition: 0,
    };
    this.index = { prev: 2, active: 3, next: 4 };
    this.slideArray = [];

    this.changeEvent = new Event('changeEvent');
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

    if (this.dist.movement > 120) this.prev();
    else if (this.dist.movement < -120) this.next();
    else this.activeSlide(this.index.active);
  }

  // Adiciona os eventos para o mevimento do slide
  addSlideEvents() {
    this.container?.addEventListener('mousedown', this.onStart);
    this.container?.addEventListener('touchstart', this.onStart);
    this.container?.addEventListener('mouseup', this.onEnd);
    this.container?.addEventListener('touchend', this.onEnd);
  }

  slideIndex(index: number) {
    this.index.prev = index - 1;
    this.index.active = index;
    this.index.next = index + 1;
  }

  slidePostion() {
    if (this.slide) {
      const slides = <HTMLElement[]>Array.from(this.slide.children);

      slides.forEach((slide, index) => {
        // Distância do slide até a borda da tela
        if (this.container) {
          const slideSpace =
            (this.container.offsetWidth - slide.offsetWidth) / 2;
          this.slideArray[index] = {
            element: slide,
            position: slideSpace + slide.offsetLeft * -1,
          };
        }
      });
    }
  }

  activeSlide(index: number) {
    const slide = this.slideArray[index - 1];

    this.moveSlide(slide.position);
    this.dist.currentPosition = slide.position;

    this.slideArray.forEach((item) => item.element.classList.remove('active'));
    slide.element.classList.add('active');

    this.slideIndex(index);

    this.container?.dispatchEvent(this.changeEvent);
  }

  prev() {
    if (this.index.prev) {
      this.activeSlide(this.index.prev);
    } else {
      this.activeSlide(this.index.active);
    }
  }

  next() {
    if (this.index.next <= this.slideArray.length) {
      this.activeSlide(this.index.next);
    } else {
      this.activeSlide(this.index.active);
    }
  }

  onResize() {
    setTimeout(() => {
      this.slidePostion();
      this.activeSlide(this.index.active);
    }, 1000);
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidePostion();
    this.activeSlide(3);
    this.transition(true);
    this.addResizeEvent();

    return this;
  }
}

export default class SlideConfig extends Slide {
  controlsContainer: HTMLElement | null;
  controls: HTMLElement[] | null;
  constructor(container: string, slide: string, controls: string) {
    super(container, slide);

    this.controlsContainer = document.querySelector(controls);

    if (this.controlsContainer) {
      this.controls = <HTMLElement[]>(
        Array.from(this.controlsContainer?.children)
      );
    } else this.controls = null;

    this.bindControlEvents();

    this.addActiveControl();
  }

  connectControls() {
    if (this.controls) {
      this.addControlsEvent();
      this.container?.addEventListener('changeEvent', this.addActiveControl);
    }
  }

  addControlsEvent() {
    if (this.controls) {
      this.controls.forEach((element) => {
        element.addEventListener('click', this.onClickControl);
        element.addEventListener('touchStart', this.onClickControl);
      });
    }
  }

  addActiveControl() {
    if (this.controls?.length) {
      this.controls.forEach((element) => element.classList.remove('active'));
      this.controls[this.index.active - 1].classList.add('active');
    }
  }

  onClickControl(event: Event) {
    const element = event.currentTarget;
    if (element instanceof HTMLElement) {
      const index = this.controls?.indexOf(element);
      if (index !== undefined) {
        this.activeSlide(index + 1);
      }
    }
  }

  bindControlEvents() {
    this.onClickControl = this.onClickControl.bind(this);
    this.addActiveControl = this.addActiveControl.bind(this);
  }
}
