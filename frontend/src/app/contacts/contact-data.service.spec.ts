import { TestBed } from '@angular/core/testing';

import { ContactDataService } from './contact-data.service';

describe('ContactDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactDataService = TestBed.get(ContactDataService);
    expect(service).toBeTruthy();
  });
});
