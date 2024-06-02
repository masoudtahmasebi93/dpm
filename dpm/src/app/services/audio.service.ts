import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {AudioModel} from "../models/audio.model";

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private httpService: HttpService) {
  }

  stopAudio(stream: MediaStream) {
    stream.getTracks().forEach((track) => {
      if (track.readyState == 'live' && track.kind === 'audio') {
        track.stop();
      }
    });
  }

  createAudioFile(audioChunks: any[] | undefined) {
    const audioBlob = this.createAudioFileBlob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    return new Audio(audioUrl);
  }

  createAudioFileBlob(audioChunks: any[] | undefined) {
    return new Blob(audioChunks, {type: 'audio/wav'});
  }

  sendRecordedAudio(data: AudioModel) {
    return this.httpService.sendAudio(data);
  }
}
