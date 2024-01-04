import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconName, fas } from '@fortawesome/free-solid-svg-icons';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() type: string = 'submit';
  @Input() buttonText?: string;
  @Input() iconName?: IconName;
  classExpression = `app-button`;

  ngOnInit() {
    if (!this.buttonText) {
      this.classExpression = `app-button app-button__single-icon`;
    }
  }
}
