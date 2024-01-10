import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <p class="text-grey">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati fuga,
      enim, cum, quidem autem alias cupiditate delectus blanditiis aperiam quae
      nihil? Laboriosam minima quos itaque, odit asperiores sit voluptates
      atque?
    </p>
  `,
  styles: [``],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    debugger;
  }
}
