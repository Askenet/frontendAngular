import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-non-rendu',
  template: ` <span style="color: red; font-weight: bold;">Non rendu</span> `,
})
export class NonRendu {
  @Input() assignment: any;
}
