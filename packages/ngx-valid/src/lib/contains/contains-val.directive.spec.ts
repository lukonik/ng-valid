import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ContainsDirective } from './contains-val.directive';

@Component({
  template: `
    <form #testForm="ngForm">
      <input
        ngValidContains="{{ element }}"
        [ngValidContainsIgnoreCase]="ignoreCase"
        [ngValidContainsMinOccurrences]="minOccurrences"
        [(ngModel)]="value"
        name="testInput"
        #input="ngModel"
      />
    </form>
  `,
  imports: [FormsModule, ContainsDirective],
})
class TestComponent {
  element = '';
  ignoreCase = false;
  minOccurrences = 1;
  value = '';
}

describe('ContainsDirective', () => {
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

  it('should validate contains requirement through template integration', async () => {
    component.element = '@';
    component.value = 'test@example.com';
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input');
    const ngModel = fixture.debugElement.children[0].children[0].references['input'];
    
    expect(input).toBeTruthy();
    expect(ngModel.valid).toBeTruthy();

    // Test with value that doesn't contain required element
    component.value = 'testexample.com';
    input.value = 'testexample.com';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(ngModel.invalid).toBeTruthy();
    expect(ngModel.errors?.['contains']).toBeTruthy();
  });

  it('should handle ignore case option', async () => {
    component.element = 'HELLO';
    component.ignoreCase = true;
    component.value = 'hello world';
    fixture.detectChanges();
    await fixture.whenStable();

    const ngModel = fixture.debugElement.children[0].children[0].references['input'];
    expect(ngModel.valid).toBeTruthy();
  });

  it('should handle min occurrences option', async () => {
    component.element = 'test';
    component.minOccurrences = 2;
    component.value = 'test test test';
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input');
    const ngModel = fixture.debugElement.children[0].children[0].references['input'];
    
    expect(ngModel.valid).toBeTruthy();

    // Test with insufficient occurrences
    component.value = 'test only once';
    input.value = 'test only once';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(ngModel.invalid).toBeTruthy();
    expect(ngModel.errors?.['contains']).toBeTruthy();
  });
});