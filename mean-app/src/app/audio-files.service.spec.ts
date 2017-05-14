/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AudioFilesService } from './audio-files.service';

describe('AudioFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioFilesService]
    });
  });

  it('should ...', inject([AudioFilesService], (service: AudioFilesService) => {
    expect(service).toBeTruthy();
  }));
});
