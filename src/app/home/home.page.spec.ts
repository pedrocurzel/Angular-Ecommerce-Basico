import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import ProductDTO from '../models/ProductDTO';
import { By } from '@angular/platform-browser';

fdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let http: HttpClient;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have products", () => {
    component.products;

    fixture.debugElement.query(By.css(""));
  });

});
