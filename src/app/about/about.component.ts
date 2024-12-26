import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit, OnDestroy {
  finalDate: number = new Date('Dec 28, 2024').getTime();
  now!: number;
  time!: string;
  intervalId!: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.now = new Date().getTime();
      this.time = this.countTime(this.finalDate, this.now);
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  countTime(finalDate: number, now: number): string {
    let distance = finalDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let text = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    return text;
  }
}
