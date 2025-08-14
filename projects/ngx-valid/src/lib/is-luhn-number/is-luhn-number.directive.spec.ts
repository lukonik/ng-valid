import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { IsLuhnNumberDirective } from './is-luhn-number.directive';

@Component({
  template: `
    <form #form="ngForm">
      <input
        name="luhnNumber"
        valIsLuhnNumber
        [(ngModel)]="luhnNumber"
        #luhnNumberInput="ngModel"
      />
    </form>
  `,
  imports: [FormsModule, IsLuhnNumberDirective],
  standalone: true,
})
class TestComponent {
  luhnNumber = '';
}

describe('IsLuhnNumberDirective', () => {
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

  describe('Basic validation', () => {
    it('should validate valid Luhn numbers', async () => {
      component.luhnNumber = '4111111111111111';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['luhnNumber'].valid).toBe(true);
    });

    it('should invalidate invalid Luhn numbers', async () => {
      component.luhnNumber = '4111111111111112';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['luhnNumber'].valid).toBe(false);
      expect(form.controls['luhnNumber'].errors).toEqual({
        isLuhnNumber: { actualValue: '4111111111111112' },
      });
    });
  });

  describe('Formatted numbers', () => {
    it('should handle numbers with spaces and hyphens', async () => {
      component.luhnNumber = '4111 1111-1111 1111';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['luhnNumber'].valid).toBe(true);
    });
  });

  describe('Invalid characters', () => {
    it('should invalidate numbers with letters', async () => {
      component.luhnNumber = '411111111111111a';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['luhnNumber'].valid).toBe(false);
      expect(form.controls['luhnNumber'].errors).toEqual({
        isLuhnNumber: {
          actualValue: '411111111111111a',
          invalidCharacter: 'a',
        },
      });
    });
  });

  describe('Empty values', () => {
    it('should be valid for empty strings', async () => {
      component.luhnNumber = '';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['luhnNumber'].valid).toBe(true);
    });
  });
});
