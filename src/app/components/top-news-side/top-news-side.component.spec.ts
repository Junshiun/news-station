import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNewsSideComponent } from './top-news-side.component';

describe('TopNewsSideComponent', () => {
  let component: TopNewsSideComponent;
  let fixture: ComponentFixture<TopNewsSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNewsSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNewsSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
