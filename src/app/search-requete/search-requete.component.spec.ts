import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRequeteComponent } from './search-requete.component';

describe('SearchRequeteComponent', () => {
  let component: SearchRequeteComponent;
  let fixture: ComponentFixture<SearchRequeteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRequeteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
