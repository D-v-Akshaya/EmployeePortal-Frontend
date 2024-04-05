import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponentsComponent } from './loader-components.component';

describe('LoaderComponentsComponent', () => {
  let component: LoaderComponentsComponent;
  let fixture: ComponentFixture<LoaderComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponentsComponent]
    });
    fixture = TestBed.createComponent(LoaderComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
