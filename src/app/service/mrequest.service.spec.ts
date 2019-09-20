import { TestBed, inject } from '@angular/core/testing';

import { MrequestService } from './mrequest.service';

describe('MrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrequestService]
    });
  });

  it('should be created', inject([MrequestService], (service: MrequestService) => {
    expect(service).toBeTruthy();
  }));
});
