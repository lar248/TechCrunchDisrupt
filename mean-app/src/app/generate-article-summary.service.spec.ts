/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenerateArticleSummaryService } from './generate-article-summary.service';

describe('GenerateArticleSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateArticleSummaryService]
    });
  });

  it('should ...', inject([GenerateArticleSummaryService], (service: GenerateArticleSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
