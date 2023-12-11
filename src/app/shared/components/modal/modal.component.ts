import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() title?: string;
  @Input() message?: string;
  @Input() okButtonText?: string;
  @Input() cancelButtonText?: string;

  @Output() modalResultEvent = new EventEmitter<boolean>();
  modalAction(result: boolean) {
    this.modalResultEvent.emit(result);
  }
}
