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