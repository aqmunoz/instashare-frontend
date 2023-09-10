import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilesComponent } from './list-files.component';

describe('ListFilesComponent', () => {
  let component: ListFilesComponent;
  let fixture: ComponentFixture<ListFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFilesComponent]
    });
    fixture = TestBed.createComponent(ListFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
