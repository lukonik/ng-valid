# 🎯 ng-valid

[![npm version](https://badge.fury.io/js/ng-valid.svg)](https://badge.fury.io/js/ng-valid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Angular](https://img.shields.io/badge/Angular-v20+-red)](https://angular.dev)

> 🚀 **Modern Angular validation library** with comprehensive form validators inspired by validator.js

A powerful, type-safe validation library for Angular v20+ applications featuring both **reactive** and **template-driven** form support with cutting-edge Angular features like signals and standalone components.

## ✨ Features

- 🎯 **Pure TypeScript** - Full type safety and IntelliSense support
- ⚡ **Angular v20+** - Built with latest Angular features (signals, standalone components)
- 🔄 **Dual Support** - Works with both reactive and template-driven forms
- 🧪 **Well Tested** - Comprehensive test coverage for reliability
- 📦 **Tree Shakeable** - Import only what you need
- 🌐 **Universal** - SSR compatible
- 🎨 **Developer Friendly** - Clear error messages and TypeScript intellisense

## 📋 Available Validators

- 🔍 [Contains](#-contains-validation) - Validates string contains substring

## 📦 Installation

```bash
npm install ng-valid
```

```bash
yarn add ng-valid
```

```bash
pnpm add ng-valid
```

## 🚀 Quick Start

### Reactive Forms
```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { containsVal } from 'ng-valid';

@Component({
  selector: 'app-example',
  imports: [ReactiveFormsModule],
  template: `
    <input [formControl]="emailControl" placeholder="Enter email">
    @if (emailControl.errors?.['contains']) {
      <div class="error">Email must contain @ symbol</div>
    }
  `
})
export class ExampleComponent {
  emailControl = new FormControl('', [
    containsVal('@', { ignoreCase: false })
  ]);
}
```

### Template-Driven Forms
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainsDirective } from 'ng-valid';

@Component({
  selector: 'app-example',
  imports: [FormsModule, ContainsDirective],
  template: `
    <form #form="ngForm">
      <input
        [(ngModel)]="email"
        name="email"
        ngValidContains="@"
        [ngValidContainsIgnoreCase]="true"
        #emailInput="ngModel"
        placeholder="Enter email"
      >
      @if (emailInput.errors?.['contains']) {
        <div class="error">Email must contain @ symbol</div>
      }
    </form>
  `
})
export class ExampleComponent {
  email = '';
}
```

## 📚 Available Validators

### 🔍 Contains Validation

Validates that a string contains a specific substring with customizable options.

#### **Reactive Forms**
```typescript
import { containsVal } from 'ng-valid';

// Basic usage
const control = new FormControl('', containsVal('@'));

// With options
const advancedControl = new FormControl('', containsVal('@', {
  ignoreCase: true,
  minOccurrences: 1
}));
```

#### **Template-Driven Forms**
```html
<!-- Basic usage -->
<input ngValidContains="@" [(ngModel)]="email" name="email">

<!-- With all options -->
<input 
  ngValidContains="@"
  [ngValidContainsIgnoreCase]="true"
  [ngValidContainsMinOccurrences]="2"
  [(ngModel)]="email" 
  name="email"
>
```

#### **Options**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ignoreCase` | `boolean` | `false` | Case-insensitive matching |
| `minOccurrences` | `number` | `1` | Minimum number of occurrences required |

#### **Error Object**
```typescript
{
  contains: {
    actualValue: 'user-domain.com',
    requiredElement: '@',
    ignoreCase: false,
    minOccurrences: 1
  }
}
```

## 🏗️ Architecture

ng-valid follows a **three-layer architecture** for each validator:

1. **🔧 Pure Function** - Core validation logic (framework-agnostic)
2. **⚡ Angular Validator** - Angular ValidatorFn wrapper
3. **🎨 Directive** - Template-driven form directive

This design ensures:
- ✅ **Reusability** across different frameworks
- ✅ **Testability** with pure functions
- ✅ **Flexibility** for both form approaches
- ✅ **Maintainability** with clear separation of concerns

## 🧪 Testing

All validators come with comprehensive test suites covering:
- ✅ Valid and invalid inputs
- ✅ Edge cases and error conditions
- ✅ Option configurations
- ✅ Type safety and error messages

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/amazing-validator`)
3. 💻 Make your changes with tests
4. ✅ Ensure tests pass (`npm test`)
5. 📝 Commit your changes (`git commit -m 'feat: add amazing validator'`)
6. 🚀 Push to the branch (`git push origin feature/amazing-validator`)
7. 🎉 Open a Pull Request

## 📄 License

MIT © [ng-valid contributors](https://github.com/lukonik/ng-valid/graphs/contributors)

## 🔗 Links

- 📖 [Documentation](https://github.com/lukonik/ng-valid#readme)
- 🐛 [Issues](https://github.com/lukonik/ng-valid/issues)
- 💬 [Discussions](https://github.com/lukonik/ng-valid/discussions)
- 📦 [npm Package](https://www.npmjs.com/package/ng-valid)

---

<div align="center">
  <sub>Built with ❤️ for the Angular community</sub>
</div>