import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscPlayerAppComponent } from './misc-player-app.component';

describe('MiscPlayerAppComponent', () => {
  let component: MiscPlayerAppComponent;
  let fixture: ComponentFixture<MiscPlayerAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscPlayerAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscPlayerAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
