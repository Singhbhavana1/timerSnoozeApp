import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timer',
  imports: [CommonModule, FormsModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  minute: number = 0;
  seconds: number = 0;
  remainingTime: number = 0;
  interval: any;
  isTimeUp: boolean = false;
  isRunning: boolean = false;
  isPause: boolean = false;

  audio = new Audio('assets/audio/alarm-beep-34359.mp3');
  audioTimeout: any;

  setTimer() {
    this.remainingTime = this.minute * 60 + this.seconds;
    this.isRunning = true;
    this.isTimeUp = false;
    this.isPause = false;
    this.startCountDown();
  }

  startCountDown() {
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.interval);
        this.isRunning = false;
        this.isTimeUp = true;
        // this.minute = 0;
        // this.seconds = 0;
        // this.audio.play();
        this.playAudioFor5Seconds();

        // alert("Time's Up ⏱️");
      }
    }, 1000);
  }

  playAudioFor5Seconds() {
    this.audio.play();
    this.audioTimeout = setTimeout(() => {
      this.audio.pause();
      this.audio.currentTime = 0;
    }, 5000);
  }

  get timeFormatter(): string {
    const min = Math.floor(this.remainingTime / 60)
      .toString()
      .padStart(2, '0');
    const sec = (this.remainingTime % 60).toString().padStart(2, '0');

    return `${min}:${sec}`;
  }

  reset() {
    clearInterval(this.interval);
    clearTimeout(this.audioTimeout);
    this.audio.pause();
    this.audio.currentTime = 0;
    this.remainingTime = 0;
    this.isRunning = false;
    this.isTimeUp = false;
    this.isPause = false;
  }

  pauseTime() {
    clearInterval(this.interval);
    this.isPause = true;
    this.isRunning = false;
  }

  resumeTime() {
    this.isRunning = true;
    this.isPause = false;
    this.startCountDown();
  }
}
