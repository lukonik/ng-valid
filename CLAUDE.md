# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@instructions.md

## Introduction

- this is the open-source library project, called ngx-valid

## Project Structure

- ngx-valid project is inside projects/ngx-valid directory

## Implementation Details (when I ask to add new validation do the following)

- create new branch from latest main
- follow instructions.md style guide for implementation
- this project uses zoneless change detection, always add provideZonelessChangeDetection() to test providers
- when given a reference link (e.g., validator.js implementation), use WebFetch to examine the reference implementation and follow its exact logic and behavior
- create a folder called [validationName] (use dashcase if neccessary)
- create a file called [validationName].ts, that will implement and export function of the validation, use Angular custom validation style guide
- create a file called [validationName].directive.ts that will implement Angular Forms Custom Validation directive, use function validation internally to handle the validation
- **add comprehensive JSDoc documentation** to all validator functions, directives, interfaces, and helper functions with:
  - detailed descriptions of what the validator does
  - @param tags for all parameters with types and descriptions
  - @returns tags describing the return value
  - @example tags showing usage examples
  - @since tags for version tracking
  - @see tags for references to related validators or external docs
- export both validation function and directive to public-api.ts (always export directives for easier consumption)
- add documentation in README.md, add the link in the list that will navigate to the correct section
- whenever you modify README.md, always sync it with projects/ngx-valid/README.md file
- write comprehensive unit tests
- run npm run check to validate that everything passes (includes linting, formatting, testing, and building), if not fix them and rerun again
- if there are formatting issues, run npm run format:write to fix them
- add the validator example to the demo application in projects/demo/src/app/ with interactive options and beautiful styling
- create a PR with conventional commit format (feat: add [validationName] validation)
