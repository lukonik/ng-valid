import {
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ContainsDirective } from './contains.directive';

@Component({
  template: `
    <form #form="ngForm">
      <input
        name="testInput"
        [valContains]="requiredElement()"
        [valContainsOptions]="options()"
        [(ngModel)]="value"
        #testInput="ngModel"
      />
    </form>
  `,
  imports: [FormsModule, ContainsDirective],
})
class TestComponent {
  value = signal('');
  requiredElement = signal('test');
  options = signal({});
}

describe('ContainsDirective', () => {
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
    component.value.set('hello test world');
    component.requiredElement.set('test');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeTruthy();
  });

  it('should invalidate invalid input', async () => {
    component.value.set('hello world');
    component.requiredElement.set('test');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeFalsy();
    expect(form.controls['testInput'].errors?.['contains']).toBeDefined();
  });

  it('should work with ignoreCase option', async () => {
    component.value.set('Hello TEST World');
    component.requiredElement.set('test');
    component.options.set({ ignoreCase: true });

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeTruthy();
  });

  it('should work with minOccurrences option', async () => {
    component.value.set('test test test');
    component.requiredElement.set('test');
    component.options.set({ minOccurrences: 3 });

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeTruthy();
  });

  it('should fail with insufficient occurrences', async () => {
    component.value.set('test test');
    component.requiredElement.set('test');
    component.options.set({ minOccurrences: 3 });

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeFalsy();
    expect(form.controls['testInput'].errors?.['contains']).toBeDefined();
  });

  it('should update validation when inputs change', async () => {
    component.value.set('hello world');
    component.requiredElement.set('test');

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement.children[0].injector.get(NgForm);
    expect(form.valid).toBeFalsy();

    // Change the required element
    component.requiredElement.set('world');
    fixture.detectChanges();
    await fixture.whenStable();

    // Force validation update
    const control = form.controls['testInput'];
    control.updateValueAndValidity();
    fixture.detectChanges();

    expect(form.valid).toBeTruthy();
  });
});
