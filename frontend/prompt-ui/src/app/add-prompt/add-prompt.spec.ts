import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrompt } from './add-prompt';

describe('AddPrompt', () => {
  let component: AddPrompt;
  let fixture: ComponentFixture<AddPrompt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPrompt],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPrompt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
