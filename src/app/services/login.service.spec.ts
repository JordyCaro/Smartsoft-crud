
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when login credentials are valid', () => {
    const email = 'test@example.com';
    const password = 'password';

    const result$ = service.login(email, password);

    result$.subscribe((result) => {
      expect(result).toBe(true);
      expect(service.isAuthenticated()).toBe(true);
      expect(service.getAuthenticatedUser()).toEqual({ id: 1, email: email });
    });
  });

  it('should return false when login credentials are invalid', () => {
    const email = '';
    const password = '';

    const result$ = service.login(email, password);

    result$.subscribe((result) => {
      expect(result).toBe(false);
      expect(service.isAuthenticated()).toBe(false);
      expect(service.getAuthenticatedUser()).toBeNull();
    });
  });

  it('should logout the authenticated user', () => {
    service.logout();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.getAuthenticatedUser()).toBeNull();
  });
});