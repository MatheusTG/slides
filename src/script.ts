import Slide from './slide';

const slide = new Slide('.slide-container', '.slide', '.controls');
slide.init();
slide.connectControls();
