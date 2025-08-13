# 🎯 ngx-valid

[![npm version](https://badge.fury.io/js/ngx-valid.svg)](https://badge.fury.io/js/ngx-valid)
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
- 🚫 [Blacklist](#-blacklist-validation) - Removes blacklisted characters from input

## 📦 Installation

```bash
npm install ngx-valid
```

```bash
yarn add ngx-valid
```

```bash
pnpm add ngx-valid
```

## 🚀 Quick Start

### Reactive Forms
```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { containsVal } from 'ngx-valid';

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
import { ContainsDirective } from 'ngx-valid';

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
import { containsVal } from 'ngx-valid';

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

### 🚫 Blacklist Validation

Automatically removes blacklisted characters from input values. This is a **transformer validator** that modifies the input rather than showing validation errors.

#### **Reactive Forms**
```typescript
import { blacklistVal } from 'ngx-valid';

// Remove special characters
const control = new FormControl('', blacklistVal('!@#$%^&*()'));

// Remove vowels
const noVowelsControl = new FormControl('', blacklistVal('aeiouAEIOU'));

// Remove numbers
const noNumbersControl = new FormControl('', blacklistVal('0123456789'));
```

#### **Template-Driven Forms**
```html
<!-- Remove special characters -->
<input 
  ngValidBlacklist="!@#$%^&*()"
  [(ngModel)]="text" 
  name="cleanText"
  placeholder="Special characters will be removed"
>

<!-- Remove specific characters -->
<input 
  ngValidBlacklist="aeiou"
  [(ngModel)]="consonantsOnly" 
  name="consonants"
  placeholder="No vowels allowed"
>
```

#### **Options**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `errorKey` | `string` | `undefined` | Custom error key (not used in current implementation) |

#### **Behavior**
- **Transforms input**: Removes specified characters as user types
- **No validation errors**: Always returns `null` (acts as transformer)
- **Real-time filtering**: Characters are removed immediately
- **Regex-safe**: Properly escapes special regex characters

#### **Use Cases**
- Remove special characters from usernames
- Filter out numbers from text input
- Create consonant-only or vowel-only inputs
- Clean phone number inputs
- Remove spaces or unwanted characters

## 🏗️ Architecture

ngx-valid follows a **three-layer architecture** for each validator:

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
2. 🌿 Create your feature branch (`git checkout -b feature/amazingx-validator`)
3. 💻 Make your changes with tests
4. ✅ Ensure tests pass (`npm test`)
5. 📝 Commit your changes (`git commit -m 'feat: add amazing validator'`)
6. 🚀 Push to the branch (`git push origin feature/amazingx-validator`)
7. 🎉 Open a Pull Request

## 📄 License

MIT © [ngx-valid contributors](https://github.com/lukonik/ngx-valid/graphs/contributors)

## 🔗 Links

- 📖 [Documentation](https://github.com/lukonik/ngx-valid#readme)
- 🐛 [Issues](https://github.com/lukonik/ngx-valid/issues)
- 💬 [Discussions](https://github.com/lukonik/ngx-valid/discussions)
- 📦 [npm Package](https://www.npmjs.com/package/ngx-valid)

---

<div align="center">
  <sub>Built with ❤️ for the Angular community</sub>
</div>