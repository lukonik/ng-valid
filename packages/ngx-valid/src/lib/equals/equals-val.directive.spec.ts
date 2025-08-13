import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EqualsDirective } from './equals-val.directive';

@Component({
  template: `
    <form #testForm="ngForm">
      <input
        ngValidEquals="{{ expectedValue }}"
        [(ngModel)]="actualValue"
        name="testInput"
        #input="ngModel"
      />
    </form>
  `,
  imports: [FormsModule, EqualsDirective],
})
class TestComponent {
  expectedValue = '';
  actualValue = '';
}

describe('EqualsDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate equals requirement through template integration', async () => {
    // Set up test values
    component.expectedValue = 'test123';
    component.actualValue = 'test123';
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input');
    const ngModel = fixture.debugElement.children[0].children[0].references['input'];
    
    expect(input).toBeTruthy();
    expect(ngModel.valid).toBeTruthy();

    // Test with non-matching value
    component.actualValue = 'different';
    input.value = 'different';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(ngModel.invalid).toBeTruthy();
    expect(ngModel.errors?.['equals']).toBeTruthy();
  });

  it('should handle empty values', async () => {
    component.expectedValue = '';
    component.actualValue = '';
    fixture.detectChanges();
    await fixture.whenStable();

    const ngModel = fixture.debugElement.children[0].children[0].references['input'];
    expect(ngModel.valid).toBeTruthy();
  });

  it('should be case sensitive', async () => {
    component.expectedValue = 'Test';
    component.actualValue = 'test';
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input');
    const ngModel = fixture.debugElement.children[0].children[0].references['input'];
    
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(ngModel.invalid).toBeTruthy();
    expect(ngModel.errors?.['equals']).toBeTruthy();
  });
});