import { TestBed, inject } from '@angular/core/testing';

import { SenderInfoService } from './sender-info-service.service';

describe('SenderInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SenderInfoService]
    });
  });

  it('should be created', inject([SenderInfoService], (service: SenderInfoService) => {
    expect(service).toBeTruthy();
  }));
});
