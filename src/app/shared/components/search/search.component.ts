import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  searchValue: string = '';
  @Input() placeholder: string = 'Input text';
  @Output() search = new EventEmitter<string>();

  onSubmit() {
    this.search.emit(this.searchValue);
  }
}
