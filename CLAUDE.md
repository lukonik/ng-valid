# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@instructions.md

## Project Overview

This appears to be a newly initialized Angular validation library project (`ngx-valid`). The repository is currently empty and ready for initial development.

## Expected Development Setup

Since this is an Angular library project, the typical development workflow would involve:

- `npm install` - Install dependencies
- `ng build` - Build the library
- `ng test` - Run unit tests
- `ng lint` - Run linting
- `npm run build:lib` - Build library for distribution
- `npm publish` - Publish to npm (when ready)

## Architecture Notes

As an Angular library (`ngx-` prefix), this project should follow Angular library conventions:

- Main library code in `projects/ngx-valid/src/lib/`
- Public API exported through `projects/ngx-valid/src/public-api.ts`
- Demo/example app in `src/app/` for testing the library
- TypeScript configuration for both library and demo app