import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AudioFilesService {

  constructor(private http: Http) { }

  getAllAudioFiles() {
    return this.http.get('/api/audioFiles')
      .map(res => {
        console.log('res audio files: ', res);
        // res.json()
      });
  }
}
