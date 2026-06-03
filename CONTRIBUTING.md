# Contributing to Hawkward Website

Thank you for your interest in contributing to the Hawkward Portfolio! Whether you're an AI agent, a human developer, or the site owner, this document outlines the best practices for proposing and making changes.

## Development Workflow

1. **Local Setup:**
   - Run `npm install` to install dependencies.
   - Run `npm run dev` to start the local development server at `http://localhost:3000`.

2. **Making Changes:**
   - The primary UI components are located in `src/components/views/`.
   - The core data model is in `src/lib/data.ts`.
   - Ensure you follow the current UI aesthetics:
     - Use `.glass-panel` for primary content cards.
     - Use `.hud-container` for terminal-like/AI elements.

3. **Code Quality and Tests:**
   - Before submitting a Pull Request, run formatting and linting:
     ```bash
     npm run format
     npm run lint
     ```
   - Ensure the build succeeds locally:
     ```bash
     npm run build
     ```
   - If you modify UI, ensure end-to-end tests pass (if applicable):
     ```bash
     npx playwright test
     ```

## Submitting Changes

- Please use the provided Pull Request template when opening a new PR.
- If fixing a bug, please link the relevant issue.
- Keep commits focused and provide descriptive commit messages.

## Security

If you discover a security vulnerability, please refer to our [SECURITY.md](.github/SECURITY.md) for reporting guidelines. Do not open a public issue for security vulnerabilities.
