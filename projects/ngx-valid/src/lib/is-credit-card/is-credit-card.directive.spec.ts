import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { IsCreditCardDirective } from './is-credit-card.directive';

@Component({
  template: `
    <form #form="ngForm">
      <input 
        name="creditCard" 
        valIsCreditCard 
        [(ngModel)]="creditCard" 
        #creditCardInput="ngModel" 
      />
      
      <input 
        name="visaCard" 
        valIsCreditCard="visa"
        [(ngModel)]="visaCard" 
        #visaCardInput="ngModel" 
      />
      
      <input 
        name="cardWithOptions" 
        valIsCreditCard
        [valIsCreditCardOptions]="{ provider: 'mastercard' }"
        [(ngModel)]="cardWithOptions" 
        #cardWithOptionsInput="ngModel" 
      />
    </form>
  `,
  imports: [FormsModule, IsCreditCardDirective],
  standalone: true,
})
class TestComponent {
  creditCard = '';
  visaCard = '';
  cardWithOptions = '';
}

describe('IsCreditCardDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  describe('Basic validation', () => {
    it('should validate valid credit card numbers', async () => {
      component.creditCard = '4111111111111111';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['creditCard'].valid).toBe(true);
    });

    it('should invalidate invalid credit card numbers', async () => {
      component.creditCard = '1234567890123456';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['creditCard'].valid).toBe(false);
      expect(form.controls['creditCard'].errors).toEqual({
        isCreditCard: jasmine.any(Object)
      });
    });
  });

  describe('Provider-specific validation', () => {
    it('should validate Visa card when provider is specified via attribute', async () => {
      component.visaCard = '4111111111111111';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['visaCard'].valid).toBe(true);
    });

    it('should invalidate Mastercard when Visa provider is specified', async () => {
      component.visaCard = '5555555555554444';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['visaCard'].valid).toBe(false);
      expect(form.controls['visaCard'].errors).toEqual({
        isCreditCard: {
          actualValue: '5555555555554444',
          provider: 'visa'
        }
      });
    });

    it('should validate Mastercard when provider is specified via options', async () => {
      component.cardWithOptions = '5555555555554444';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['cardWithOptions'].valid).toBe(true);
    });

    it('should invalidate Visa when Mastercard provider is specified via options', async () => {
      component.cardWithOptions = '4111111111111111';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['cardWithOptions'].valid).toBe(false);
      expect(form.controls['cardWithOptions'].errors).toEqual({
        isCreditCard: {
          actualValue: '4111111111111111',
          provider: 'mastercard'
        }
      });
    });
  });

  describe('Formatted cards', () => {
    it('should handle cards with spaces and hyphens', async () => {
      component.creditCard = '4111 1111-1111 1111';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['creditCard'].valid).toBe(true);
    });
  });

  describe('Empty values', () => {
    it('should be valid for empty strings', async () => {
      component.creditCard = '';
      fixture.detectChanges();
      await fixture.whenStable();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      expect(form.controls['creditCard'].valid).toBe(true);
    });
  });
});