import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Donut} from "../../models/donut.model";
import {DonutService} from "../../services/donut.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DonutListComponent} from "../donut-list/donut-list.component";
import {DonutFormComponent} from "../../components/donut-form/donut-form.component";

@Component({
  standalone: true,
  imports: [DonutFormComponent],
  providers: [DonutService],
  selector: 'app-donut-single',
  templateUrl: './donut-single.component.html',
  styleUrls: ['./donut-single.component.scss']
})
export class DonutSingleComponent implements OnInit{

  donut!: Donut;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donutService: DonutService) {
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = this.route.snapshot.data['isEdit'];

    // const id = 'ORrwvPJ'; //y8z0As
   // this.donut =  this.donutService.readOne(id);
    this.donutService.readOne(id).subscribe((donut) => {
      this.donut = donut;
    });
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut).subscribe(() => {
      console.log('Created Successfully');
    });
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut).subscribe({
      next: () => {
        console.log('Update successfully!');
        this.router.navigate(['admin']);
      },
      error: (err) => {
        console.log('OnUpdate Error', err);
      }
    });
  }

  onDelete(donut: Donut) {
    this.donutService.delete(donut).subscribe(()=> {
      console.log('Delete successfully');
    });
  }
}
