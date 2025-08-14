import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { EqualsDirective } from './equals.directive';

@Component({
  template: `
    <form #form="ngForm">
      <input
        name="testInput"
        [valEquals]="comparisonValue()"
        [(ngModel)]="value"
        #testInput="ngModel"
      />
    </form>
  `,
  imports: [FormsModule, EqualsDirective],
})
class TestComponent {
  value = signal('');
  comparisonValue = signal('expected');
}

describe('EqualsDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate valid input', async () => {
    component.value.set('expected');
    component.comparisonValue.set('expected');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeTruthy();
  });

  it('should invalidate invalid input', async () => {
    component.value.set('actual');
    component.comparisonValue.set('expected');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeFalsy();
    expect(form.controls['testInput'].errors?.['equals']).toBeDefined();
  });

  it('should be case sensitive', async () => {
    component.value.set('Expected');
    component.comparisonValue.set('expected');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeFalsy();
    expect(form.controls['testInput'].errors?.['equals']).toBeDefined();
  });

  it('should handle exact matches', async () => {
    component.value.set('test123');
    component.comparisonValue.set('test123');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeTruthy();
  });

  it('should update validation when comparison value changes', async () => {
    component.value.set('test');
    component.comparisonValue.set('different');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeFalsy();

    // Change the comparison value to match
    component.comparisonValue.set('test');
    fixture.detectChanges();
    await fixture.whenStable();

    // Force validation update
    const control = form.controls['testInput'];
    control.updateValueAndValidity();
    fixture.detectChanges();

    expect(form.valid).toBeTruthy();
  });

  it('should handle empty values', async () => {
    component.value.set('');
    component.comparisonValue.set('expected');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeTruthy(); // Empty values should not be validated
  });
});
