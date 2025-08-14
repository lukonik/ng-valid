<div align="center">
  <img src="logo.png" alt="ngx-valid" width="200" height="200">
  
  # ngx-valid
  
  **Modern Angular validation library with TypeScript support**
  
  [![npm version](https://badge.fury.io/js/ngx-valid.svg)](https://www.npmjs.com/package/ngx-valid)
  [![Angular](https://img.shields.io/badge/Angular-20%2B-red?logo=angular)](https://angular.io)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue?logo=typescript)](https://www.typescriptlang.org)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
  **[🚀 Live Demo](https://lukonik.github.io/ngx-valid/) | [📖 Documentation](https://github.com/lukonik/ngx-valid) | [💾 GitHub](https://github.com/lukonik/ngx-valid)**
  
</div>

---

## 🚀 Features

- ✨ **Modern Angular 20+** - Built with the latest Angular features including signals and standalone components
- 🎯 **TypeScript First** - Full TypeScript support with strict typing
- 🔄 **Dual Support** - Works with both reactive and template-driven forms
- 🧪 **Well Tested** - Comprehensive unit test coverage
- 📦 **Tree Shakable** - Optimized bundle size with selective imports
- 🎨 **Validator.js Compatible** - Based on proven validation logic from validator.js
- ⚡ **Zoneless Ready** - Compatible with Angular's new zoneless change detection

## 📦 Installation

```bash
npm install ngx-valid
```

## 🎯 Quick Start

### Reactive Forms

```typescript
import { FormControl, FormGroup } from '@angular/forms';
import { contains } from 'ngx-valid';

const form = new FormGroup({
  message: new FormControl('', [contains('hello', { ignoreCase: true })]),
});
```

### Template-Driven Forms

```html
<input
  type="text"
  name="message"
  valContains="hello"
  [valContainsOptions]="{ ignoreCase: true }"
  [(ngModel)]="message"
  #messageInput="ngModel"
/>

<div *ngIf="messageInput.errors?.['contains']">
  Message must contain "hello"
</div>
```

## 📚 Available Validators

- [Contains](#contains-validator) - Validates that a string contains a specific substring
- [Equals](#equals-validator) - Validates that a string exactly equals a specific value
- [IsAfter](#isafter-validator) - Validates that a date is after a specific comparison date
- [IsBefore](#isbefore-validator) - Validates that a date is before a specific comparison date
- [IsCreditCard](#iscreditcard-validator) - Validates credit card numbers with industry-standard patterns and Luhn algorithm
- [IsLuhnNumber](#isluhn-validator) - Validates numbers using the Luhn algorithm (mod-10 checksum)

### Contains Validator

Validates that a string contains a specific substring.

#### Options

| Option           | Type      | Default | Description                            |
| ---------------- | --------- | ------- | -------------------------------------- |
| `ignoreCase`     | `boolean` | `false` | Perform case-insensitive search        |
| `minOccurrences` | `number`  | `1`     | Minimum number of occurrences required |

#### Examples

**Basic Usage:**

```typescript
import { contains } from 'ngx-valid';

// Must contain 'test'
contains('test');

// Case insensitive search
contains('TEST', { ignoreCase: true });

// Require multiple occurrences
contains('a', { minOccurrences: 3 });
```

**Template Directive:**

```html
<!-- Basic usage -->
<input valContains="world" [(ngModel)]="text" />

<!-- With options -->
<input
  valContains="hello"
  [valContainsOptions]="{ ignoreCase: true, minOccurrences: 2 }"
  [(ngModel)]="text"
/>
```

### Equals Validator

Validates that a string exactly equals a specific comparison value.

#### Examples

**Basic Usage:**

```typescript
import { equals } from 'ngx-valid';

// Must equal 'exact-match'
equals('exact-match');

// Type-safe string comparison
equals('password123');
```

**Template Directive:**

```html
<!-- Basic usage -->
<input valEquals="expected-value" [(ngModel)]="text" />

<!-- Password confirmation -->
<input type="password" [(ngModel)]="password" #pwd="ngModel" />
<input
  type="password"
  [valEquals]="pwd.value || ''"
  [(ngModel)]="confirmPassword"
  #confirmPwd="ngModel"
/>

<div *ngIf="confirmPwd.errors?.['equals']">Passwords do not match</div>
```

**Reactive Forms Example:**

```typescript
import { FormControl, FormGroup } from '@angular/forms';
import { equals } from 'ngx-valid';

const form = new FormGroup({
  password: new FormControl(''),
  confirmPassword: new FormControl(''),
});

// Dynamic equals validation
form
  .get('confirmPassword')
  ?.setValidators([equals(form.get('password')?.value || '')]);
```

### IsAfter Validator

Validates that a date is after a specific comparison date.

#### Options

| Option           | Type             | Default      | Description                 |
| ---------------- | ---------------- | ------------ | --------------------------- |
| `comparisonDate` | `string \| Date` | `new Date()` | The date to compare against |

#### Examples

**Basic Usage:**

```typescript
import { isAfter } from 'ngx-valid';

// Must be after current date/time
isAfter();

// Must be after specific date
isAfter({ comparisonDate: '2024-01-01' });

// Must be after specific date object
isAfter({ comparisonDate: new Date('2024-01-01') });
```

**Template Directive:**

```html
<!-- Must be after current date -->
<input type="date" valIsAfter [(ngModel)]="selectedDate" />

<!-- Must be after specific date -->
<input type="date" valIsAfter="2024-01-01" [(ngModel)]="selectedDate" />

<!-- Must be after another form field -->
<input type="date" [(ngModel)]="startDate" #start="ngModel" />
<input
  type="date"
  [valIsAfter]="start.value"
  [(ngModel)]="endDate"
  #end="ngModel"
/>

<div *ngIf="end.errors?.['isAfter']">End date must be after start date</div>
```

**Reactive Forms Example:**

```typescript
import { FormControl, FormGroup } from '@angular/forms';
import { isAfter } from 'ngx-valid';

const form = new FormGroup({
  startDate: new FormControl(''),
  endDate: new FormControl(''),
});

// Dynamic date validation
form
  .get('endDate')
  ?.setValidators([isAfter({ comparisonDate: form.get('startDate')?.value })]);
```

### IsBefore Validator

Validates that a date is before a specific comparison date.

#### Options

| Option           | Type             | Default      | Description                 |
| ---------------- | ---------------- | ------------ | --------------------------- |
| `comparisonDate` | `string \| Date` | `new Date()` | The date to compare against |

#### Examples

**Basic Usage:**

```typescript
import { isBefore } from 'ngx-valid';

// Must be before current date/time
isBefore();

// Must be before specific date
isBefore({ comparisonDate: '2024-12-31' });

// Must be before specific date object
isBefore({ comparisonDate: new Date('2024-12-31') });
```

**Template Directive:**

```html
<!-- Must be before current date -->
<input type="date" valIsBefore [(ngModel)]="selectedDate" />

<!-- Must be before specific date -->
<input type="date" valIsBefore="2024-12-31" [(ngModel)]="selectedDate" />

<!-- Must be before another form field -->
<input type="date" [(ngModel)]="endDate" #end="ngModel" />
<input
  type="date"
  [valIsBefore]="end.value"
  [(ngModel)]="startDate"
  #start="ngModel"
/>

<div *ngIf="start.errors?.['isBefore']">Start date must be before end date</div>
```

**Reactive Forms Example:**

```typescript
import { FormControl, FormGroup } from '@angular/forms';
import { isBefore } from 'ngx-valid';

const form = new FormGroup({
  startDate: new FormControl(''),
  endDate: new FormControl(''),
});

// Dynamic date validation
form
  .get('startDate')
  ?.setValidators([isBefore({ comparisonDate: form.get('endDate')?.value })]);
```

### IsCreditCard Validator

Validates credit card numbers using industry-standard patterns and Luhn algorithm verification. Supports all major card providers with optional provider-specific validation.

#### Options

| Option     | Type                                                                    | Default | Description                                      |
| ---------- | ----------------------------------------------------------------------- | ------- | ------------------------------------------------ |
| `provider` | `'amex' \| 'dinersclub' \| 'discover' \| 'jcb' \| 'mastercard' \| 'unionpay' \| 'visa'` | `undefined` | Optional specific card provider to validate against |

#### Examples

**Basic Usage:**

```typescript
import { isCreditCard } from 'ngx-valid';

// Validate any credit card
isCreditCard();

// Validate specific provider
isCreditCard({ provider: 'visa' });
isCreditCard({ provider: 'mastercard' });
isCreditCard({ provider: 'amex' });
```

**Template Directive:**

```html
<!-- Basic usage - any provider -->
<input valIsCreditCard [(ngModel)]="creditCardNumber" />

<!-- Specific provider -->
<input valIsCreditCard="visa" [(ngModel)]="creditCardNumber" />

<!-- With options -->
<input 
  valIsCreditCard
  [valIsCreditCardOptions]="{ provider: 'mastercard' }"
  [(ngModel)]="creditCardNumber" 
/>
```

**Reactive Forms Example:**

```typescript
import { FormControl, FormGroup } from '@angular/forms';
import { isCreditCard } from 'ngx-valid';

const form = new FormGroup({
  creditCard: new FormControl('', [isCreditCard()]),
  visaCard: new FormControl('', [isCreditCard({ provider: 'visa' })]),
});
```

**Supported Card Types:**

- **Visa**: `4111111111111111`
- **Mastercard**: `5555555555554444`
- **American Express**: `378282246310005`
- **Discover**: `6011111111111117`
- **Diners Club**: `30569309025904`
- **JCB**: `3530111333300000`
- **UnionPay**: Supported patterns

### IsLuhnNumber Validator

Validates numbers using the Luhn algorithm (mod-10 checksum). Commonly used for credit cards, IMEI numbers, and other identification numbers that require checksum validation.

#### Examples

**Basic Usage:**

```typescript
import { isLuhnNumber } from 'ngx-valid';

// Validate Luhn number
isLuhnNumber();
```

**Template Directive:**

```html
<!-- Basic usage -->
<input valIsLuhnNumber [(ngModel)]="luhnNumber" />

<!-- With validation feedback -->
<input 
  valIsLuhnNumber 
  [(ngModel)]="luhnNumber" 
  #luhnInput="ngModel"
/>
<div *ngIf="luhnInput.errors?.['isLuhnNumber']">
  Invalid Luhn number
</div>
```

**Reactive Forms Example:**

```typescript
import { FormControl, FormGroup } from '@angular/forms';
import { isLuhnNumber } from 'ngx-valid';

const form = new FormGroup({
  luhnNumber: new FormControl('', [isLuhnNumber()]),
});
```

**How Luhn Algorithm Works:**

The Luhn algorithm validates identification numbers by:
1. Starting from the rightmost digit, double every second digit
2. If doubling results in a two-digit number, add the digits together
3. Sum all digits
4. If the total is divisible by 10, the number is valid

**Test Numbers:**
- **Valid**: `79927398713`, `49927398716`, `4111111111111111`
- **Invalid**: `79927398714`, `1234567890123456`

## 🛠️ Development

### Prerequisites

- Node.js 18+
- Angular CLI 20+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/lukonik/ngx-valid.git
cd ngx-valid

# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm run test

# Run linting
npm run lint
```

### Project Structure

```
ngx-valid/
├── projects/ngx-valid/          # Library source code
│   ├── src/lib/                 # Validators
│   │   ├── contains/            # Contains validator
│   │   └── ...                  # Future validators
│   └── src/public-api.ts        # Public exports
├── logo.png                     # Project logo
└── README.md                    # This file
```

## 🤝 Contributing

We welcome contributions! Please see our [contribution guidelines](CONTRIBUTING.md) for details.

### Adding New Validators

1. Create a new branch from `main`
2. Add your validator in `projects/ngx-valid/src/lib/[validator-name]/`
3. Include both function and directive implementations
4. Add comprehensive tests
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Angular](https://angular.io)
- Validation logic inspired by [validator.js](https://github.com/validatorjs/validator.js)
- Generated with [Angular CLI](https://github.com/angular/angular-cli)

## 📞 Support

- 🐛 [Bug Reports](https://github.com/lukonik/ngx-valid/issues)
- 💡 [Feature Requests](https://github.com/lukonik/ngx-valid/issues)
- 📖 [Documentation](https://github.com/lukonik/ngx-valid/wiki)

---

<div align="center">
  Made with ❤️ by the ngx-valid team
</div>
