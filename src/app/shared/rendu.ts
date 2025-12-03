import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRendu]',
})
export class Rendu implements OnInit {
  @Input() appRendu!: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const n = this.el.nativeElement;
    if (this.appRendu) {
      n.style.color = 'green';
      n.style.border = '2px solid green';
    } else {
      n.style.color = 'red';
      n.style.border = '2px solid red';
    }
  }
}
