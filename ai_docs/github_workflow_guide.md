# GitHub Workflow Guide for School Scout Development

This guide provides a step-by-step workflow for developing features, fixing bugs, and managing the School Scout project using GitHub.

## Table of Contents
- [Daily Development Workflow](#daily-development-workflow)
- [Feature Development Cycle](#feature-development-cycle)
- [Bug Fix Process](#bug-fix-process)
- [Release Process](#release-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Commit Message Format](#commit-message-format)
- [LLM Coding Agent Prompts](#llm-coding-agent-prompts)

## Daily Development Workflow

### 1. Start Your Day
**When**: At the beginning of each development session

```bash
# Make sure you're on the dev branch
git checkout dev

# Get the latest changes
git pull origin dev
```

### 2. Check Project Status
**When**: Before starting new work

```bash
# See what branches exist locally
git branch

# Check the status of your working directory
git status

# View recent commits
git log --oneline -n 5
```

## Feature Development Cycle

### 1. Create a Feature Branch
**When**: Starting work on a new feature

```bash
# Create and switch to a new feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/descriptive-name
```

### 2. Develop Your Feature
**When**: During active development

```bash
# Make small, incremental commits as you work
git add <specific-files>
git commit -m "feat(component): brief description of changes"

# Periodically push your branch to GitHub (first time)
git push -u origin feature/descriptive-name

# Subsequent pushes
git push
```

### 3. Stay Up to Date
**When**: During longer feature development (more than a day)

```bash
# Get latest changes from dev
git checkout dev
git pull origin dev

# Switch back to your feature branch
git checkout feature/descriptive-name

# Merge in the latest changes from dev
git merge dev

# Resolve any conflicts if they occur
```

### 4. Complete Your Feature
**When**: Feature is ready for review

```bash
# Ensure tests pass
cd app
npm test

# Push final changes
git push

# Create a Pull Request on GitHub
# Go to: https://github.com/danedgar7/school-elc-finder/pulls
# Click "New Pull Request"
# Base: dev ← Compare: feature/descriptive-name
```

### 5. Address Review Feedback
**When**: After receiving code review comments

```bash
# Make requested changes
git add <files>
git commit -m "fix(component): address review feedback"
git push
```

### 6. Merge Your Feature
**When**: After PR approval

```bash
# Option 1: Merge on GitHub (preferred)
# Click the "Merge" button on the PR

# Option 2: Merge locally (if needed)
git checkout dev
git merge feature/descriptive-name
git push origin dev
```

## Bug Fix Process

### 1. Create a Bug Fix Branch
**When**: Addressing a bug

```bash
git checkout dev
git pull origin dev
git checkout -b fix/brief-bug-description
```

### 2. Fix the Bug
**When**: During bug fixing

```bash
# Make focused changes to fix the bug
git add <files>
git commit -m "fix(component): brief description of the fix"
git push -u origin fix/brief-bug-description
```

### 3. Create a Pull Request
**When**: Bug is fixed and tested

```bash
# Same process as feature PR
# Base: dev ← Compare: fix/brief-bug-description
```

## Release Process

### 1. Prepare for Release
**When**: Ready to create a new version

```bash
# Ensure dev branch is stable
git checkout dev
git pull origin dev

# Create a release branch (for major releases)
git checkout -b release/v1.0.0
```

### 2. Final Testing
**When**: Before releasing

```bash
# Run comprehensive tests
cd app
npm test

# Build the application to verify it works
npm run build
```

### 3. Merge to Main
**When**: Release is ready for production

```bash
# Create a PR from release branch to main
# After approval:
git checkout main
git pull origin main
git merge release/v1.0.0
git push origin main
```

### 4. Tag the Release
**When**: After merging to main

```bash
# Create a version tag
git tag -a v1.0.0 -m "Release v1.0.0: Brief description of release"
git push origin v1.0.0

# Create a GitHub Release
# Go to: https://github.com/danedgar7/school-elc-finder/releases
# Click "Draft a new release"
```

### 5. Update Dev Branch
**When**: After release is complete

```bash
git checkout dev
git merge main
git push origin dev
```

## Code Review Guidelines

### Requesting Reviews
**When**: After creating a PR

1. Assign at least one reviewer
2. Include in the PR description:
   - What the changes do
   - How to test them
   - Any specific areas needing attention

### Performing Reviews
**When**: Assigned as a reviewer

1. Check code style and adherence to project standards
2. Verify functionality works as expected
3. Look for potential bugs or edge cases
4. Ensure tests are included
5. Provide constructive feedback

## Commit Message Format

Follow the conventional commits format:

```
type(scope): brief description

[optional body with more details]

[optional footer with breaking changes or issue references]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code restructuring without functionality changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, etc.

**Examples**:
```
feat(assessment): add slider animation for better UX
fix(dashboard): resolve undefined score type error
docs(readme): update setup instructions
```

---

This workflow is designed to keep the School Scout codebase organized, maintain high code quality, and provide a clear history of changes. Adjust as needed as the project evolves.

## LLM Coding Agent Prompts

The following prompts are designed for use with LLM coding agents (like Cascade, Claude, ChatGPT, etc.) to help automate common GitHub tasks in the School Scout development workflow.

### 1. Preparing for New Feature Development

```
I need to start developing a new feature for the School Scout project. Please help me:

1. Check the current status of my repository
2. Make sure I'm on the dev branch and it's up to date
3. Create a new feature branch following our naming convention
4. Set up the initial structure for this feature

The feature I want to implement is: [BRIEF DESCRIPTION OF FEATURE]

It will involve changes to these components: [LIST COMPONENTS OR FILES]

Please guide me through the exact Git commands I should run and any other preparation steps.
```

### 2. Testing a Feature in Development

```
I'm working on a feature branch called "feature/[BRANCH-NAME]" for the School Scout project. Please help me:

1. Run the appropriate tests for the changes I've made
2. Check for any linting or type errors
3. Verify that my changes work as expected
4. Prepare my code for a pull request

The changes I've made are: [BRIEF DESCRIPTION OF CHANGES]

These files have been modified: [LIST FILES]

Please provide the commands I should run to test thoroughly, and any other verification steps I should take before submitting for review.
```

### 3. Merging Changes and Completing a Feature

```
I've completed development of a feature on branch "feature/[BRANCH-NAME]" for the School Scout project. The feature has been tested and is ready to merge. Please help me:

1. Ensure my branch is up to date with the latest dev branch
2. Resolve any potential merge conflicts
3. Create a pull request with appropriate description
4. Merge the changes after approval
5. Clean up my local branches

Feature summary: [BRIEF DESCRIPTION OF FEATURE]

Key files changed: [LIST FILES]

Please guide me through the exact process with Git commands and GitHub actions to properly complete this feature.
```

### 4. Handling an Urgent Bug Fix

```
I need to fix an urgent bug in the School Scout project. The bug is: [DESCRIBE BUG]

It appears to be in: [FILE OR COMPONENT]

Please help me:

1. Create a proper bug fix branch from the appropriate source branch
2. Make the necessary changes to fix the issue
3. Test the fix thoroughly
4. Create a pull request that clearly documents the bug and solution
5. Merge the fix following our expedited process for critical bugs

Please provide the specific Git commands and steps I should follow for this urgent fix.
```

### 5. Preparing for a Release

```
We're ready to prepare release v[VERSION] of the School Scout project. Please help me:

1. Create a release branch from dev
2. Run all tests and verification steps
3. Update version numbers in relevant files
4. Create release notes summarizing the changes
5. Merge to main and tag the release

Major features in this release: [LIST FEATURES]

Bug fixes: [LIST BUGS FIXED]

Please guide me through the complete release process with specific commands and actions.
```

These prompts can be customized with specific details about your feature, bug, or release to get more targeted assistance from an LLM coding agent.
