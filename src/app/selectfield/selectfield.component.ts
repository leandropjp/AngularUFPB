import { Component, OnInit,AfterViewInit} from '@angular/core';	
declare var require:any;
declare var componentHandler:any;
declare var test:any;

@Component({
  selector: 'app-selectfield',
  templateUrl: './selectfield.component.html',
  styleUrls: ['./selectfield.component.css']
})
export class SelectfieldComponent implements OnInit, AfterViewInit {
	loadAPI: Promise<any>;
  inputText = "teste";
  
  constructor() { }
  ngAfterViewInit(){
  	test();
  }

  ngOnInit() {
  	// x
  	// require.ensure(['./textfield.js'], function(require) {
  	// 	var a = require('./textfield.js');
        
   //      console.log(a.toString());
   //   }); 
  	// this.loadAPI = new Promise((resolve) => {
   //          console.log('resolving promise...');
   //          this.loadScript();
   //      });
  }

   public loadScript() {
        console.log('preparing to load...')
        // let node = document.createElement('script');
        // node.src = './textfield.js';
        // node.type = 'text/javascript';
        // node.async = true;
        // node.charset = 'utf-8';

        // let head = document.getElementById
    }

}
