import { TestBed } from '@angular/core/testing';

import { AlunosService } from './cliente.service';

describe('AlunosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlunosService = TestBed.get(AlunosService);
    expect(service).toBeTruthy();
  });
});
