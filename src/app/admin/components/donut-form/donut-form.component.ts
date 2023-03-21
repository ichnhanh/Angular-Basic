import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Donut} from "../../models/donut.model";
import {FormsModule, NgForm, NgModel} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  standalone: true,
  imports: [RouterModule, NgIf, NgForOf, FormsModule],
  selector: 'app-donut-form',
  templateUrl: './donut-form.component.html',
  styleUrls: ['./donut-form.component.scss']
})
export class DonutFormComponent {

  @Input() donut: Donut | undefined;
  @Input() isEdit!:Boolean;
  @Output() create = new EventEmitter<Donut>;
  @Output() update = new EventEmitter<Donut>;
  @Output() delete = new EventEmitter<Donut>;

  icons: string[] = [
    'just-chocolate',
    'glazed-fudge',
    'caramel-swirl'
  ];

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({id: this.donut?.id, ...form.value});
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleDelete(form: NgForm) {
    if (confirm(`Readly delete ${this.donut?.name}?`)) {
      this.delete.emit({id: this.donut?.id, ...form.value});
    }
  }

}
