import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AudioModel} from "../models/audio.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'http://localhost:3000/';
  private UrlRoutes = {audio: 'audio'}

  constructor(private http: HttpClient) {
  }

  sendAudio(data: AudioModel) {
    const formData = new FormData()
    const {email, audio} = data;
    if (email)
      formData.append('email', email);
    if (audio) {
      formData.append('file', audio, Date.now().toString() + '.wav')
    }
    return new Observable<any>((observer) => {
      const request = this.http.post<any>(`${this.baseUrl}${(this.UrlRoutes.audio)}`, formData, {
          observe: 'response',
          responseType: 'blob' as 'json'
        }
      );
      request.subscribe(config => {
        console.log('Updated config:', config);

        const audioUrl = window.URL.createObjectURL(config.body);
        observer.next(audioUrl);
        observer.complete();
      });
    })
  }
}
