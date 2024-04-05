import { TestBed } from '@angular/core/testing';

import { ApiadminService } from './apiadmin.service';

describe('ApiadminService', () => {
  let service: ApiadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
