import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Donut} from "../../models/donut.model";
import {RouterModule} from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterModule,],
  selector: 'app-donut-card',
  templateUrl: './donut-card.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./donut-card.component.scss']
})
export class DonutCardComponent {
  @Input() donut !: Donut;
}
