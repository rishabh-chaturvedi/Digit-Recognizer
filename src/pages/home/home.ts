import { Component , ViewChild , ElementRef, Renderer } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as tf from '@tensorflow/tfjs';
import { tensor1d } from '@tensorflow/tfjs';
import { DrawableDirective } from '../../directives/drawable/drawable';
import { ChartComponent } from '../../components/chart/chart';
import { rendererTypeName } from '@angular/compiler';

// declare var tf;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  linearModel : tf.Sequential;
  prediction : any;
  InputTaken : any;
  model : tf.Model;
  ctx: CanvasRenderingContext2D;
  pos = { x: 0, y: 0 };
  canvasElement : any;

  @ViewChild(DrawableDirective) canvas;

  constructor(public navCtrl: NavController , public el : ElementRef , public renderer : Renderer , public platform : Platform) {
  }

  ionViewDidLoad(){
    this.loadModel();
  }


  async loadModel(){
    this.model = await tf.loadModel('/assets/model.json');
  }

  async predict(imageData: ImageData) {

    const pred = await tf.tidy(() => {

      // Convert the canvas pixels to 
      let img = tf.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img) as any;

      // Save predictions on the component
      this.prediction = Array.from(output.dataSync()); 
    });

  }

  eraseButton(){
    this.prediction = [0,0,0,0,0,0,0,0,0,0];
    this.canvas.clear();
    
  }

}