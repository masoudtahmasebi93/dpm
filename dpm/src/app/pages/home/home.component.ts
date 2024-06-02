import {Component} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {AudioModel} from "../../models/audio.model";
import {AudioService} from "../../services/audio.service";
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../../components/button/button.component";
import {ValidatorService} from "../../services/validator.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  recording: boolean = false;
  mediaRecorder: MediaRecorder | undefined;
  audio: HTMLAudioElement | undefined;
  newAudio: HTMLAudioElement | undefined;
  private audioBlob: any;

  constructor(private audioService: AudioService, private validator: ValidatorService) {
  }

  setStatus() {
    if (this.audio && this.newAudio) {
      return 'Recorded & Fixed Audio Ready to play';
    } else if (this.audio && !this.newAudio) {
      return 'Recorded Audio Ready to play';
    } else if (!this.recording) {
      return 'Not Recording';
    } else if (this.recording) {
      return 'Recording';
    }
    return 'Not Recording';
  }

  resetRecording() {
    this.audio = undefined;
    this.newAudio = undefined;
  }

  // I used this url: https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b

  recordAudio() {
    try {
      this.resetRecording();
      navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.recording = true;

          let audioChunks: any[];
          audioChunks = [];
          this.mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
          });

          this.mediaRecorder.addEventListener("stop", () => {
            this.audioService.stopAudio(stream);
            this.audio = this.audioService.createAudioFile(audioChunks);
            this.audioBlob = this.audioService.createAudioFileBlob(audioChunks);
            this.recording = false;
          });

        });
    } catch (ex) {
      console.error(ex);
    }

  }

  stopRecordAudio() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.recording = false;
    }
  }

  playRecordedAudio() {
    if (this.audio) {
      this.audio.play();
    }
  }

  playFixedAudio() {
    if (this.newAudio) {
      this.newAudio.play();
    }
  }

  sendRecordedAudio() {
    const email = window.prompt('What is your email?');
    if (email !== '' || email !== null || this.validator.validateEmail(email)) {
      const data = new AudioModel();
      data.audio = this.audioBlob;
      data.email = email;
      this.audioService.sendRecordedAudio(data).subscribe(res => {
        this.newAudio = res;
      });
    }

  }
}
