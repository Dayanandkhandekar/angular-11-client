import { TestBed } from '@angular/core/testing';

import { HTTPReqInterceptorService } from './httpreq-interceptor.service';

describe('HTTPReqInterceptorService', () => {
  let service: HTTPReqInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPReqInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
