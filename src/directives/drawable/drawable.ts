import { Platform } from 'ionic-angular';
import { Directive, Output, EventEmitter, ElementRef, HostListener, OnInit, Renderer } from '@angular/core';

/**
 * Generated class for the DrawableDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[drawable]' // Attribute selector
})
export class DrawableDirective implements OnInit {

  pos = { x: 0, y: 0 };
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  lastX: number;
  lastY: number;

  @Output() newImage = new EventEmitter();

  constructor(private el: ElementRef, public renderer: Renderer, public platform: Platform) { }

  ngOnInit() {
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    if(this.platform.is('mobile') || this.platform.is('ios') || this.platform.is('android') || this.platform.is('cordova') || this.platform.is('mobileweb')){
      this.renderer.setElementAttribute(this.canvas, 'width', this.platform.width() / 1.8 + '');
      this.renderer.setElementAttribute(this.canvas, 'height',  this.platform.width() / 1.8 + '');
    }
    else{
      this.renderer.setElementAttribute(this.canvas, 'width', this.platform.width() / 8 + '');
      this.renderer.setElementAttribute(this.canvas, 'height',  this.platform.width() / 8 + '');
    }
  }
  

  @HostListener('touchend', ['$event'])
  onUp(e) {
    this.newImage.emit(this.getImgData());

  }

  @HostListener('touchenter', ['$event'])
  onEnter(e) {
    this.setPosition(e);
    this.clear();
    this.lastX = e.touches[0].clientX;
    this.lastY = e.touches[0].clientY - this.ctx.canvas.height/2 ;
  }

  @HostListener('touchstart', ['$event'])
  onMove(e) {
    this.setPosition(e);
    this.clear();
    this.lastX = e.touches[0].clientX;
    this.lastY = e.touches[0].clientY - this.ctx.canvas.height/2;
  }

  @HostListener('touchmove', ['$event'])
  onDown(e) {
    //if (e.buttons !== 1) {
    //return;
    //}
    console.log("hello")
    this.ctx.beginPath(); // begin
    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#111111';

    // this.pos.x = e.touches[0].clientX;
    // this.pos.y = e.touches[0].clientY;

    this.ctx.moveTo(this.lastX, this.lastY);
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y);
    // this.ctx.closePath();

    this.lastX = this.pos.x;
    this.lastY = this.pos.y;
    this.ctx.stroke();
  }

  @HostListener('mouseup', ['$event'])
  onTheUp(e) {
    this.newImage.emit(this.getImgData());

  }

  @HostListener('mouseenter', ['$event'])
  onTheEnter(e) {
    this.setPosition(e);
    this.clear();
  }

  @HostListener('mousedown', ['$event'])
  onTheMove(e) {
    this.setPosition(e);
    this.clear();
  }

  @HostListener('mousemove', ['$event'])
  onTheDown(e) {
    if (e.buttons !== 1) {
      return;
    }

    this.ctx.beginPath(); // begin

    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#111111';

    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
  }  
  

  @HostListener('resize', ['$event'])
  onResize(e) {
    // this.ctx.canvas.width = window.innerWidth;
    // this.ctx.canvas.height = window.innerHeight;
  }

  setPosition(e) {
    // console.log(e)
    if(this.platform.is('mobile') || this.platform.is('ios') || this.platform.is('android') || this.platform.is('cordova') || this.platform.is('mobileweb')){
      this.pos.x = e.touches[0].clientX;
      this.pos.y = e.touches[0].clientY - this.ctx.canvas.height/2;
    }
    else{
      this.pos.x = e.offsetX;
      this.pos.y = e.offsetY;
    }
    
  }

  clear() {
    console.log("It Came Here")
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  getImgData(): ImageData {
    const scaled = this.ctx.drawImage(this.canvas, 0, 0, 28, 28);
    return this.ctx.getImageData(0, 0, 28, 28);
  }

}
