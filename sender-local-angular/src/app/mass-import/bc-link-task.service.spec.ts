import { TestBed, inject } from '@angular/core/testing';

import { BcLinkTaskService } from './bc-link-task.service';

describe('BcLinkTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BcLinkTaskService]
    });
  });

  it('should be created', inject([BcLinkTaskService], (service: BcLinkTaskService) => {
    expect(service).toBeTruthy();
  }));
});
