import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { ContainsDirective } from './contains-val.directive';

@Component({
  template: `
    <input 
      ngValidContains="{{ element }}"
      [ngValidContainsIgnoreCase]="ignoreCase"
      [ngValidContainsMinOccurrences]="minOccurrences"
      [(ngModel)]="value" 
      name="testInput"
      #input="ngModel"
    >
  `,
  imports: [FormsModule, ContainsDirective]
})
class TestComponent {
  element = '';
  ignoreCase = false;
  minOccurrences = 1;
  value = '';
}

describe('ContainsDirective', () => {
  let component: TestComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate contains requirement', () => {
    const directive = new ContainsDirective();
    // Note: In real usage, signals would be set by Angular's input binding
    // For unit tests, we need to mock the signal behavior
    (directive.element as any) = () => '@';
    (directive.ignoreCase as any) = () => false;
    (directive.minOccurrences as any) = () => 1;
    
    const validControl = new FormControl('test@example.com');
    const invalidControl = new FormControl('testexample.com');
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      contains: {
        actualValue: 'testexample.com',
        requiredElement: '@',
        ignoreCase: false,
        minOccurrences: 1
      }
    });
  });

  it('should handle ignoreCase option', () => {
    const directive = new ContainsDirective();
    (directive.element as any) = () => 'HELLO';
    (directive.ignoreCase as any) = () => true;
    (directive.minOccurrences as any) = () => 1;
    
    const control = new FormControl('hello world');
    expect(directive.validate(control)).toBeNull();
  });

  it('should handle minOccurrences option', () => {
    const directive = new ContainsDirective();
    (directive.element as any) = () => 'test';
    (directive.ignoreCase as any) = () => false;
    (directive.minOccurrences as any) = () => 2;
    
    const validControl = new FormControl('test test test');
    const invalidControl = new FormControl('test only once');
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      contains: {
        actualValue: 'test only once',
        requiredElement: 'test',
        ignoreCase: false,
        minOccurrences: 2
      }
    });
  });

  it('should return null when element is empty', () => {
    const directive = new ContainsDirective();
    (directive.element as any) = () => '';
    (directive.ignoreCase as any) = () => false;
    (directive.minOccurrences as any) = () => 1;
    
    const control = new FormControl('any value');
    expect(directive.validate(control)).toBeNull();
  });

  it('should handle all options together', () => {
    const directive = new ContainsDirective();
    (directive.element as any) = () => 'HELLO';
    (directive.ignoreCase as any) = () => true;
    (directive.minOccurrences as any) = () => 2;
    
    const validControl = new FormControl('hello world HELLO again');
    const invalidControl = new FormControl('hello world only');
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      contains: {
        actualValue: 'hello world only',
        requiredElement: 'HELLO',
        ignoreCase: true,
        minOccurrences: 2
      }
    });
  });
});