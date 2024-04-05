import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonformsComponent } from './commonforms.component';

describe('CommonformsComponent', () => {
  let component: CommonformsComponent;
  let fixture: ComponentFixture<CommonformsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonformsComponent]
    });
    fixture = TestBed.createComponent(CommonformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
