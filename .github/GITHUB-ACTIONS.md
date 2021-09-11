# Using GitHub Actions for CI / CD

Four workflows are currently defined in the `.github/workflows` directory:

- CodeQL Analysis (`push` to `main`, `pull_request` to `main`, and by `cron` schedule)
- Cypress E2E Tests (all `push` and `pull_request`)
- Lint, build, and run tests (`pull_request` for types `opened`, `synchronize`, and `reopened`)
- Release (`push` to `main`)

## GitHub Actions Notes

GHA `workflows` are defined by YAML files located in the `.github/workflows` folder in the top level of the repository. Each workflow can contain one or more `jobs` that execute a series of `steps`. By default, all steps in a single job execute sequentially.

The issue with multiple jobs in a single workflow is that if one job fails out of 10 jobs in your workflow, then all 10 jobs have to re-run for the workflow status to be a success. You can have workflows that execute one job and one job only to address this issue.

Sequential workflows: Use a `repository_dispatch` API call at the end of the workflow to trigger the next workflow

### Caching dependencies



## CodeQL Analysis

## Cypress E2E Tests

## Lint, build, and run tests

## Release
