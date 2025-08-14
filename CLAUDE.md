# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@instructions.md

## Introduction

- this is the open-source library project, called ngx-valid

## Project Structure

- ngx-valid project is inside projects/ngx-valid directory

## Implementation Details (when I ask to add new validation do the following)

- create new branch from latest main
- create a folder called [validationName] (use dashcase if neccessary)
- create a file called [validationName].ts, that will implement and export function of the validation, use Angular custom validation style guide
- create a file called [validationName].directive.ts that will implement Angular Forms Custom Validation directive, use function validation internally to handle the validation
- export both of them to public-api.ts
- add documentation in README.md, add the link in the list that will navigate to the correct section
- write comprehensive unit tests
- run npm run check to validate that everything passes, if not fix them and rerun again
