import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular-Basic';
  message !: string;
  testMsg !: string
  newMessage !: string;
  nameTarget !: string;

  ngOnInit() {
    this.message = 'Hello world';
    this.testMsg = '';
  }

  handleClick($event: MouseEvent) {
    console.log($event);
  }

  handleInput($event: Event) {
    const {value, nodeName} = ($event.target as HTMLInputElement);
    this.newMessage = value;
    this.nameTarget = nodeName;
    // this.newMessage = ($event.target as HTMLInputElement).value
  }
}
