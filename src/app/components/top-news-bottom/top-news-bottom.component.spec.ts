import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNewsBottomComponent } from './top-news-bottom.component';

describe('TopNewsBottomComponent', () => {
  let component: TopNewsBottomComponent;
  let fixture: ComponentFixture<TopNewsBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNewsBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNewsBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
