# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project Configuration for Claude Code

## Commit Standards
- **Always use conventional commit format** for all commits:
  - Format: `<type>[optional scope]: <description>`
  - Types: feat, fix, docs, style, refactor, test, chore
  - Include body when needed for context
  - Always include Claude Code footer

## Development Commands

### Building
- **Build library**: `npm run ng build ngx-valid` or `ng build ngx-valid`
- **Watch mode**: `npm run watch` - builds with file watching for development

### Testing  
- **Run all tests**: `npm test` or `ng test`
- **Run tests in CI mode**: `npm run test-ci` - headless mode for CI/CD
- **Single test run**: `ng test --no-watch --browsers=ChromeHeadless`

### Code Quality
- **Run ESLint**: `npm run lint` or `ng lint`
- **ESLint config**: `projects/ngx-valid/eslint.config.js`
- **Linting scope**: TypeScript and HTML files in library

### Development
- **Start dev server**: `npm start` or `ng serve` 
- **Install dependencies**: `npm ci` (preferred) or `npm install`

## Architecture Overview

This is an Angular library (`ngx-valid`) that provides form validation utilities. Key architectural points:

### Project Structure
- **Main library**: `projects/ngx-valid/` - contains the core library code
- **Library source**: `projects/ngx-valid/src/lib/` - individual validator implementations
- **Public API**: `projects/ngx-valid/src/public-api.ts` - exports all public validators and directives
- **Build output**: `dist/ngx-valid/` - compiled library for distribution

### Validation Architecture
Each validator follows a consistent pattern:
- **Validator function**: Pure TypeScript function returning `ValidatorFn`
- **Directive**: Angular directive for template-driven forms
- **Testing**: Both validator function and directive are thoroughly tested
- **Export**: All public APIs exported through main index

### Current Validators
- **Blacklist**: Validates against prohibited values/patterns

### CI/CD Pipeline
- **GitHub Actions**: `.github/workflows/ci.yml`
- **Pipeline steps**: Install → Build → Test
- **Triggers**: Push to main, all PRs

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
- Library code in `projects/ngx-valid/src/lib/`
- Export all public APIs through `projects/ngx-valid/src/public-api.ts`
- Keep validators focused and composable
- Follow Angular style guide: https://angular.dev/style-guide
- Reference https://github.com/validatorjs/validator.js for validation logic implementation

## Validator Implementation Pattern
When generating validators, follow this exact implementation structure:

### File Structure
For each validator (e.g., "email"):
```
projects/ngx-valid/src/lib/email/
├── email-val.ts               // Angular validator function with core logic
├── email-val.directive.ts     // Angular directive  
├── email-val.spec.ts          // Unit tests for validator function
└── email-val.directive.spec.ts // Unit tests for directive
```

### Implementation Requirements

1. **Angular Validator Function** (`[validatorName]-val.ts`):
   - Export Angular ValidatorFn using camelCase + "Val" suffix (e.g., `emailVal`)
   - Contains ALL validation logic directly (no separate core function)
   - Returns `ValidationErrors | null`
   - Follows Angular forms validation patterns
   - Include comprehensive JSDoc documentation

2. **Angular Directive** (`[validatorName]-val.directive.ts`):
   - Implements Angular `Validator` interface
   - Uses standalone directive pattern (Angular v20+)
   - Reference: https://angular.dev/guide/forms/form-validation#example-6
   - Provides template-driven form validation
   - Uses the validator function internally

3. **Public API Exports**:
   - Export validator function and directive in `projects/ngx-valid/src/public-api.ts`
   - Make all public APIs available for consumers

4. **Comprehensive Testing & Code Quality**:
   - Unit tests for Angular validator function  
   - Unit tests for Angular directive
   - Test both valid and invalid scenarios
   - Test edge cases and error conditions
   - **ALWAYS run ESLint** after implementation: `npm run lint`
   - Fix all ESLint violations before committing

### Naming Conventions
- **Directory**: Use kebab-case, validator name only (e.g., `email`, `credit-card`, `phone-number`)
- **Files**: Use kebab-case with `-val` suffix
- **Functions**: Use camelCase with "Val" suffix (e.g., `emailVal`, `creditCardVal`)
- **Directive selector**: Use kebab-case with library prefix (`ngValid[ValidatorName]`)

### Implementation Notes
- **ALWAYS use Pull Request workflow** for ANY changes (validators, docs, configs, etc.)
- **ALWAYS create feature branch from latest main** - run `git checkout main && git pull origin main` first
- **Create feature branch** for each change (e.g., `feat/validator-name`, `docs/readme-update`, `fix/bug-name`)
- **Never commit directly to main** - all changes must go through PR review
- Follow Angular v20+ best practices (standalone components, signals, etc.)
- Use TypeScript strict typing
- Reference validator.js library for validation logic patterns
- Keep validators composable and focused on single responsibility
- Ensure all validators work with both reactive and template-driven forms

## Pull Request Workflow
**CRITICAL**: Use PR workflow for ALL changes, not just validators:

### Branch Naming Convention
- **Validators**: `feat/validator-name` (e.g., `feat/email`, `feat/credit-card`)
- **Documentation**: `docs/description` (e.g., `docs/update-readme`, `docs/add-examples`)
- **Bug fixes**: `fix/description` (e.g., `fix/validation-error`, `fix/build-issue`)
- **Refactoring**: `refactor/description` (e.g., `refactor/simplify-pattern`)
- **Configuration**: `chore/description` (e.g., `chore/update-deps`, `chore/jest-config`)

### Required PR Process
1. **Start from latest main**: `git checkout main && git pull origin main`
2. **Create feature branch**: `git checkout -b feat/feature-name`
3. **Implement changes** with proper testing
4. **Commit with conventional format**: `feat(scope): description`
5. **Push branch**: `git push origin feat/feature-name`
6. **Create Pull Request** with descriptive title and body
7. **Wait for review** before merging to main

### PR Title Format
Use conventional commit format:
- `feat(validators): add email validator`
- `docs(readme): update installation instructions`
- `fix(blacklist): resolve regex escaping issue`
- `refactor(pattern): simplify file structure`

## README.md Maintenance
**CRITICAL**: After implementing each new validator, ALWAYS update README.md:

### Required Updates for Each Validator
1. **Add validator to bullet list** near the top with emoji and link
2. **Add new validator section** in "📚 Available Validators" section
3. **Include validator emoji** and descriptive title
4. **Provide complete documentation** with:
   - Brief description of what it validates
   - Angular ValidatorFn usage examples (no core function examples)
   - Reactive forms examples
   - Template-driven forms examples
   - Options table (if applicable)
   - Error object structure
5. **Follow existing format** exactly as shown in Contains Validation section
6. **Use appropriate emojis** for visual consistency
7. **Include TypeScript examples** with proper imports
8. **Show both basic and advanced usage** patterns

### Validator List Maintenance
Update the validator bullet list after the features section:
```markdown
## 📋 Available Validators

- 📧 [Email](#-email-validation) - Validates email format
- 🔐 [Password](#-password-validation) - Validates password strength
```

### Documentation Template for New Validators
```markdown
### [EMOJI] [Validator Name] Validation

[Brief description of what it validates and key features]

#### **Reactive Forms**
```typescript
import { [validatorName]Val } from 'ngx-valid';

// Basic usage
const control = new FormControl('', [validatorName]Val());

// With options
const controlWithOptions = new FormControl('', [validatorName]Val(options));
```

#### **Template-Driven Forms**
```html
<!-- Basic usage -->
<input ngValid[ValidatorName] [(ngModel)]="model" name="field">

<!-- With options -->
<input 
  ngValid[ValidatorName]
  [ngValid[ValidatorName]Option]="value"
  [(ngModel)]="model" 
  name="field"
>
```

#### **Options** (if applicable)
| Option | Type | Default | Description |
|--------|------|---------|-------------|

#### **Error Object**
```typescript
{
  [validatorErrorKey]: {
    // error structure with context
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

## Testing & Code Quality
- Write unit tests for all validators
- Use Karma/Jasmine for testing framework  
- Test both valid and invalid scenarios
- **Run ESLint before committing**: `npm run lint`
- Ensure all ESLint rules pass (TypeScript and HTML files)
- Follow Angular ESLint configuration standards