# Contributing to School Scout

Thank you for considering contributing to School Scout! This document outlines the process for contributing to this project.

## Development Workflow

### Branch Strategy

We use the following branch structure:
- `main`: Production-ready code
- `dev`: Development branch where features are integrated
- Feature branches: For new features (e.g., `feature/map-improvements`)
- Bug fix branches: For bug fixes (e.g., `fix/typescript-errors`)

### Getting Started

1. Clone the repository
2. Create a new branch from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

3. Make your changes, following our code style and commit message guidelines

4. Push your branch and create a pull request to `dev`

### Commit Message Guidelines

We follow conventional commits format:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(assessment): add slider animation for better UX
```

### Pull Request Process

1. Update documentation if needed
2. Make sure tests pass
3. Get at least one code review
4. Once approved, maintainers will merge your PR

## Code Style

- Follow TypeScript best practices
- Use consistent indentation (2 spaces)
- Add appropriate comments for complex logic
- Follow React functional component patterns

## Testing

- Write tests for new features
- Ensure all tests pass before submitting a PR
- Aim for good test coverage

## Questions?

If you have any questions, feel free to open an issue for discussion.

Thank you for contributing to School Scout!
