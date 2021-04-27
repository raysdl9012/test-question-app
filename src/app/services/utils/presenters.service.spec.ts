import { TestBed } from '@angular/core/testing';

import { PresentersService } from './presenters.service';

describe('PresentersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentersService = TestBed.get(PresentersService);
    expect(service).toBeTruthy();
  });
});
