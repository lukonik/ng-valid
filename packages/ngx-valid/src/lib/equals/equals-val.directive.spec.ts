import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { EqualsDirective } from './equals-val.directive';

@Component({
  template: `
    <input 
      ngValidEquals="{{ expectedValue }}"
      [(ngModel)]="actualValue" 
      name="testInput"
      #input="ngModel"
    >
  `,
  imports: [FormsModule, EqualsDirective]
})
class TestComponent {
  expectedValue = '';
  actualValue = '';
}

describe('EqualsDirective', () => {
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

  it('should validate equals requirement', () => {
    const directive = new EqualsDirective();
    (directive.comparison as any) = () => 'expected';
    
    const validControl = new FormControl('expected');
    const invalidControl = new FormControl('actual');
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      equals: {
        actualValue: 'actual',
        expectedValue: 'expected',
        actualValueAsString: 'actual'
      }
    });
  });

  it('should handle numeric comparisons', () => {
    const directive = new EqualsDirective();
    (directive.comparison as any) = () => '123';
    
    const validControl = new FormControl(123);
    const invalidControl = new FormControl(124);
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      equals: {
        actualValue: 124,
        expectedValue: '123',
        actualValueAsString: '124'
      }
    });
  });

  it('should handle boolean comparisons', () => {
    const directive = new EqualsDirective();
    (directive.comparison as any) = () => 'true';
    
    const validControl = new FormControl(true);
    const invalidControl = new FormControl(false);
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      equals: {
        actualValue: false,
        expectedValue: 'true',
        actualValueAsString: 'false'
      }
    });
  });

  it('should handle empty comparison value', () => {
    const directive = new EqualsDirective();
    (directive.comparison as any) = () => '';
    
    const validControl = new FormControl('');
    const invalidControl = new FormControl('not empty');
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      equals: {
        actualValue: 'not empty',
        expectedValue: '',
        actualValueAsString: 'not empty'
      }
    });
  });

  it('should handle case sensitivity', () => {
    const directive = new EqualsDirective();
    (directive.comparison as any) = () => 'Test';
    
    const validControl = new FormControl('Test');
    const invalidControl = new FormControl('test');
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      equals: {
        actualValue: 'test',
        expectedValue: 'Test',
        actualValueAsString: 'test'
      }
    });
  });

  it('should handle special characters', () => {
    const directive = new EqualsDirective();
    (directive.comparison as any) = () => 'test@example.com';
    
    const validControl = new FormControl('test@example.com');
    const invalidControl = new FormControl('test@example.co');
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      equals: {
        actualValue: 'test@example.co',
        expectedValue: 'test@example.com',
        actualValueAsString: 'test@example.co'
      }
    });
  });

  it('should handle unicode characters', () => {
    const directive = new EqualsDirective();
    (directive.comparison as any) = () => 'café';
    
    const validControl = new FormControl('café');
    const invalidControl = new FormControl('cafe');
    
    expect(directive.validate(validControl)).toBeNull();
    expect(directive.validate(invalidControl)).toEqual({
      equals: {
        actualValue: 'cafe',
        expectedValue: 'café',
        actualValueAsString: 'cafe'
      }
    });
  });

  describe('real-world password confirmation scenario', () => {
    it('should validate password confirmation', () => {
      const directive = new EqualsDirective();
      (directive.comparison as any) = () => 'mySecurePassword123';
      
      const validControl = new FormControl('mySecurePassword123');
      const invalidControl = new FormControl('mySecurePassword124');
      
      expect(directive.validate(validControl)).toBeNull();
      expect(directive.validate(invalidControl)).toEqual({
        equals: {
          actualValue: 'mySecurePassword124',
          expectedValue: 'mySecurePassword123',
          actualValueAsString: 'mySecurePassword124'
        }
      });
    });
  });
});