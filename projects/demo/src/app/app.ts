import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ContainsDirective,
  EqualsDirective,
  IsAfterDirective,
  IsBeforeDirective,
} from '../../../ngx-valid/src/public-api';

interface ContainsOptions {
  ignoreCase: boolean;
  minOccurrences: number;
}

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CommonModule,
    ContainsDirective,
    EqualsDirective,
    IsAfterDirective,
    IsBeforeDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Contains validator state
  containsText = signal('');
  containsSearch = signal('hello');
  containsOptions = signal<ContainsOptions>({ ignoreCase: false, minOccurrences: 1 });

  // Equals validator state  
  equalsText = signal('');
  equalsComparison = signal('exact-match');
  
  // Password confirmation example
  password = signal('');
  confirmPassword = signal('');

  // IsAfter validator state
  afterDate = signal('');
  afterComparisonDate = signal(new Date().toISOString().split('T')[0]);

  // IsBefore validator state
  beforeDate = signal('');
  beforeComparisonDate = signal(new Date().toISOString().split('T')[0]);

  updateContainsIgnoreCase(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.containsOptions.update(opts => ({ ...opts, ignoreCase: checked }));
  }

  updateContainsMinOccurrences(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const num = parseInt(value) || 1;
    this.containsOptions.update(opts => ({ ...opts, minOccurrences: num }));
  }
}