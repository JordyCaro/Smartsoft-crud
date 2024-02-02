import { TestBed } from '@angular/core/testing';
import { CsvService } from './csv.service';

describe('CsvService', () => {
  let service: CsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvService);
  });

  it('should parse CSV file and return the result', (done) => {
    const mockFile = new File(['id,name\n1,John'], 'test.csv', { type: 'text/csv' });

    service.parseCsv(mockFile).subscribe((result) => {
      expect(result).toBeDefined();
      expect(result.data).toEqual([{ id: '1', name: 'John' }]);
      done();
    });
  });

  it('should complete the observable after parsing the CSV file', (done) => {
    const mockFile = new File(['id,name\n1,John'], 'test.csv', { type: 'text/csv' });

    service.parseCsv(mockFile).subscribe({
      complete: () => {
        done();
      },
    });
  });
});