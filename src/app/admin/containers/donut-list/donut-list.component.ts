import {Component, OnInit} from '@angular/core';
import {Donut} from "../../models/donut.model";
import {DonutService} from "../../services/donut.service";
import {RouterModule} from "@angular/router";
import {DonutCardComponent} from "../../components/donut-card/donut-card.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  standalone: true,
  imports: [RouterModule, DonutCardComponent, NgIf, NgForOf],
  providers: [DonutService],
  selector: 'app-donut-list',
  templateUrl: './donut-list.component.html',
  styleUrls: ['./donut-list.component.scss']
})
export class DonutListComponent implements OnInit{

  donuts !: Donut[];
  donut !: Donut;
  constructor(private donutService: DonutService) {
  }

  ngOnInit() {
    this.donutService.read().subscribe({
      next: (donuts)  => {
        this.donuts = donuts;
      },
      error: err => {
        console.error(err.messages);
      }
    });
  }

  trackByFn(index: number, value: Donut)  {
    return value.id;
  }

}
