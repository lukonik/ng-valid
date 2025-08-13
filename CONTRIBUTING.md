# 🤝 Contributing to ngx-valid

Thank you for considering contributing to ngx-valid! This guide will help you get started with contributing to our Angular validation library.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch** following our naming conventions
4. **Make your changes** with tests
5. **Push to your fork** and create a Pull Request

## 📋 Prerequisites

- **Node.js 20+** and npm
- **Git** with conventional commit knowledge
- **Angular** and TypeScript experience

## 🏗️ Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ngx-valid.git
cd ngx-valid

# Install dependencies
npm install

# Run tests
npx nx test ngx-valid

# Build the library
npx nx build ngx-valid
```

## 🌿 Branch Naming

Follow our branch naming convention:

- **Validators**: `feat/validator-name` (e.g., `feat/email`, `feat/credit-card`)
- **Documentation**: `docs/description` (e.g., `docs/update-readme`)
- **Bug fixes**: `fix/description` (e.g., `fix/validation-error`)
- **Refactoring**: `refactor/description`
- **Configuration**: `chore/description`

## 📝 Commit Messages

Use [Conventional Commits](https://conventionalcommits.org/) format:

```
feat(validators): add email validator
fix(blacklist): resolve regex escaping issue
docs(readme): update installation instructions
```

## 🧪 Adding New Validators

See our detailed [validator implementation pattern](CLAUDE.md#validator-implementation-pattern) in CLAUDE.md.

### Quick Checklist:
- [ ] Create feature branch (`feat/validator-name`)
- [ ] Implement ValidatorFn with all logic
- [ ] Create Angular directive for template forms
- [ ] Add comprehensive tests
- [ ] Export in public API (`src/index.ts`)
- [ ] Update README.md with documentation
- [ ] Create Pull Request

## 🔍 Pull Request Process

1. **Ensure CI passes** - All tests, builds, and type checks must pass
2. **Update documentation** - README.md must reflect your changes
3. **Add tests** - New code requires comprehensive test coverage
4. **Follow conventions** - Use our established patterns and naming
5. **Describe changes** - Clear PR title and description

## 🧪 Testing

```bash
# Run all tests
npx nx test ngx-valid

# Run tests in watch mode
cd packages/ngx-valid && npm run test:watch

# Run tests with coverage
cd packages/ngx-valid && npm run test:coverage
```

## 📚 Documentation

- Update README.md for new validators
- Follow the emoji and formatting conventions
- Include usage examples for both reactive and template-driven forms
- Document all options and error structures

## 🚨 Code Review

All contributions go through code review:

- **Automated checks** run via GitHub Actions
- **Manual review** by maintainers
- **Constructive feedback** to improve code quality
- **Learning opportunity** for all contributors

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🆘 Need Help?

- **Questions**: Open a [Discussion](https://github.com/lukonik/ngx-valid/discussions)
- **Bugs**: Report an [Issue](https://github.com/lukonik/ngx-valid/issues)
- **Features**: Suggest via [Issues](https://github.com/lukonik/ngx-valid/issues) with `enhancement` label

---

**Happy contributing! 🎉**