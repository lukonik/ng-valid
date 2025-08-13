# Project Configuration for Claude Code

## Commit Standards
- **Always use conventional commit format** for all commits:
  - Format: `<type>[optional scope]: <description>`
  - Types: feat, fix, docs, style, refactor, test, chore
  - Include body when needed for context
  - Always include Claude Code footer

## Angular Developer Persona
I am a dedicated Angular developer who thrives on leveraging the absolute latest features of Angular v20+. I passionately adopt signals for reactive state management, embrace standalone components for streamlined architecture, and utilize the new control flow for more intuitive template logic. Performance is paramount, constantly seeking to optimize change detection and improve user experience through modern Angular paradigms.

## Angular v20+ Best Practices

### Components
- **Always use standalone components** over NgModules
- **Do NOT set `standalone: true`** inside decorators (it's default in v20+)
- Use `input()` signal instead of `@Input()` decorators
- Use `output()` function instead of `@Output()` decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Keep components small and focused on single responsibility
- Prefer inline templates for small components
- **Do NOT use `@HostBinding` and `@HostListener`** - use `host` object in decorator instead

### State Management
- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- **Do NOT use `mutate` on signals** - use `update` or `set` instead

### Templates
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- **Do NOT use `ngClass`** - use `class` bindings instead
- **Do NOT use `ngStyle`** - use `style` bindings instead
- Use async pipe to handle observables
- Keep templates simple, avoid complex logic
- Import pipes when used in templates

### Forms
- **Prefer Reactive forms** over Template-driven forms
- Use Angular's latest form APIs with signals integration

### Services
- Design services around single responsibility
- Use `providedIn: 'root'` for singleton services
- **Use `inject()` function** instead of constructor injection

### TypeScript Best Practices
- Use strict type checking
- Prefer type inference when type is obvious
- **Avoid `any` type** - use `unknown` when type is uncertain

### Performance
- Use `NgOptimizedImage` for all static images
- Implement lazy loading for feature routes
- Optimize change detection with OnPush strategy

## Project Structure
- Library code in `packages/ng-valid/src/lib/`
- Export all public APIs through `packages/ng-valid/src/index.ts`
- Keep validators focused and composable
- Follow Angular style guide: https://angular.dev/style-guide
- Reference https://github.com/validatorjs/validator.js for validation logic implementation

## Validator Implementation Pattern
When generating validators, follow this exact implementation structure:

### File Structure
For each validator (e.g., "email-validation"):
```
packages/ng-valid/src/lib/email-validation/
├── email-validation.ts           // Core validation function
├── email-validation-val.ts       // Angular validator function
├── email-validation-val.directive.ts // Angular directive
├── email-validation.spec.ts      // Unit tests for core function
├── email-validation-val.spec.ts  // Unit tests for validator function
└── email-validation-val.directive.spec.ts // Unit tests for directive
```

### Implementation Requirements

1. **Core Validation Function** (`[validatorName].ts`):
   - Export pure function using camelCase naming (e.g., `emailValidation`)
   - Contains business logic for validation
   - Returns boolean or validation result object
   - No Angular dependencies

2. **Angular Validator Function** (`[validatorName]-val.ts`):
   - Export Angular ValidatorFn using camelCase + "Val" suffix (e.g., `emailValidationVal`)
   - Uses the core validation function internally
   - Returns `ValidationErrors | null`
   - Follows Angular forms validation patterns

3. **Angular Directive** (`[validatorName]-val.directive.ts`):
   - Implements Angular `Validator` interface
   - Uses standalone directive pattern (Angular v20+)
   - Reference: https://angular.dev/guide/forms/form-validation#example-6
   - Provides template-driven form validation
   - Uses the validator function internally

4. **Public API Exports**:
   - Export validator function and directive in `packages/ng-valid/src/index.ts`
   - Make all public APIs available for consumers

5. **Comprehensive Testing**:
   - Unit tests for core validation function
   - Unit tests for Angular validator function  
   - Unit tests for Angular directive
   - Test both valid and invalid scenarios
   - Test edge cases and error conditions

### Naming Conventions
- **Directory**: Use kebab-case (dash-separated) naming
- **Files**: Use kebab-case for filenames
- **Functions**: Use camelCase for function names
- **Validator suffix**: Add "Val" suffix to Angular validator functions
- **Directive selector**: Use kebab-case with library prefix

### Implementation Notes
- **Do NOT commit automatically** - I will manually commit validators
- Follow Angular v20+ best practices (standalone components, signals, etc.)
- Use TypeScript strict typing
- Reference validator.js library for validation logic patterns
- Keep validators composable and focused on single responsibility
- Ensure all validators work with both reactive and template-driven forms

## README.md Maintenance
**CRITICAL**: After implementing each new validator, ALWAYS update README.md:

### Required Updates for Each Validator
1. **Add new validator section** in "📚 Available Validators" section
2. **Include validator emoji** and descriptive title
3. **Provide complete documentation** with:
   - Brief description of what it validates
   - Core function usage examples
   - Reactive forms examples
   - Template-driven forms examples
   - Options table (if applicable)
   - Error object structure
4. **Follow existing format** exactly as shown in Contains Validation section
5. **Use appropriate emojis** for visual consistency
6. **Include TypeScript examples** with proper imports
7. **Show both basic and advanced usage** patterns

### Documentation Template for New Validators
```markdown
### [EMOJI] [Validator Name] Validation

[Brief description of what it validates and key features]

#### **Core Function**
```typescript
import { [validatorName] } from 'ng-valid';

const isValid = [validatorName]('example', options); // true/false
```

#### **Reactive Forms**
```typescript
import { [validatorName]Val } from 'ng-valid';

const control = new FormControl('', [validatorName]Val(options));
```

#### **Template-Driven Forms**
```html
<input ngValid[ValidatorName]="value" [(ngModel)]="model" name="field">
```

#### **Options** (if applicable)
| Option | Type | Default | Description |
|--------|------|---------|-------------|

#### **Error Object**
```typescript
{
  [validatorErrorKey]: {
    // error structure
  }
}
```
```

This ensures consistent, comprehensive documentation for all validators.

## Resources
- Components: https://angular.dev/essentials/components
- Signals: https://angular.dev/essentials/signals
- Templates: https://angular.dev/essentials/templates
- Dependency Injection: https://angular.dev/essentials/dependency-injection
- Style Guide: https://angular.dev/style-guide

## Testing
- Write unit tests for all validators
- Use Jest for testing framework
- Test both valid and invalid scenarios