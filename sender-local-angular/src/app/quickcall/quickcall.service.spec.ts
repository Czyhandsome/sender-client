import { TestBed, inject } from '@angular/core/testing';

import { QuickcallService } from './quickcall.service';

describe('QuickcallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickcallService]
    });
  });

  it('should be created', inject([QuickcallService], (service: QuickcallService) => {
    expect(service).toBeTruthy();
  }));
});
