# Using GitHub Actions for CI / CD

Four workflows are currently defined in the `.github/workflows` directory:

- CodeQL Analysis (`push` to `main`, `pull_request` to `main`, and by `cron` schedule)
- Cypress E2E Tests (all `push` and `pull_request`)
- Lint, build, and run tests (`pull_request` for types `opened`, `synchronize`, and `reopened`)
- Release (`push` to `main`)

## GitHub Actions Notes

GHA `workflows` are defined by YAML files located in the `.github/workflows` folder in the top level of the repository. Each workflow can contain one or more `jobs` that execute a series of `steps`. By default, all steps in a single job execute sequentially. Jobs execute in parallel by default. The issue with multiple jobs in a single workflow is that if one job fails out of 10 jobs in your workflow, then all 10 jobs have to re-run for the workflow status to be a success. You can have workflows that execute one job and one job only to address this issue.

### Sequential Jobs in Separate Workflows

Sequential workflows can use a `repository_dispatch` API call at the end of the workflow to trigger the next workflow. An example using a Personal Access Token that has been added as an Actions Secret to the repository. Add to end of first Workflow that should trigger another Workflow:

```yaml
- name: Trigger next workflow
  # Run this step to trigger the next Workflow only if all the prior steps in the workflow were successful.
  # Use `if: always()` if you want the workflow to run regardless of success of past workflows.
  if: success()
  uses: peter-evans/repository-dispatch@v1
  with:
    token: ${{ secrets.REPO_GHA_PAT }}
    repository: ${{ github.repository }}
    # An arbitrary name for the event that other Workflows will listen for to trigger:
    event-type: trigger-workflow-2
    # Passes data from this Workflow to the next triggered Workflow, in this case the branch and
    # commit hash to checkout and use so that we know both Workflows are using the same exact code:
    client-payload: '{"ref": "${{ github.ref }}", "sha": "${{ github.sha }}"}'
```

Add the `repository_dispatch` event as a trigger in the Workflow to launch next:

```yaml
name: Workflow 2
on:
  repository_dispatch:
    # Match `event-type` defined in first Workflow
    types: [trigger-workflow-2]
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.event.client_payload.sha }}
```

You can also use the [`workflow_run`](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#workflow_run) keyword:

`build.yml`

```yaml
name: CI build

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Deploy Docker image to Google Cloud Run
      run: ...
```

`notify.yml`

```yaml
name: CI notify

# Only trigger, when the build workflow succeeded
on:
  workflow_run:
    workflows: ["CI build"]
    types:
      - completed

jobs:
  notify:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Notify Slack and send eMail
        run: ...
```

You can also use the [workflow_dispatch](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch) keyword.

### Sequential Jobs in the Same Workflow

Use the `needs` keyword:

```yaml
name: CI build and notify

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Deploy Docker image to Google Cloud Run
      run: ...

  notify:
    needs: build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Notify Slack and send eMail
        run: ...
```


### Caching dependencies

`@actions/cache`

For `npm`, cache files are stored in `~/.npm` on Posix, or `%AppData%/npm-cache` on Windows. If using npm config to retrieve the cache directory, ensure you run `actions/setup-node` first to ensure your npm version is correct. It is not recommended to cache `node_modules`, as it can break across Node versions and won't work with `npm ci`.

Inputs:

- `path`: A list of files, directories, and wildcard patterns to cache and restore. See @actions/glob for supported patterns.
- `key`: An explicit key for restoring and saving the cache
- `restore-keys`: An ordered list of keys to use for restoring the cache if no cache hit occurred for key

Output:

- `cache-hit`: A boolean value to indicate an exact match was found for the key

Node on POSIX:

```yaml
- uses: actions/cache@v2
  with:
    path: ~/.npm
    key: ${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-
```

Node - Lerna on POSIX:

```yaml
- name: restore lerna
  uses: actions/cache@v2
  with:
    path: |
      node_modules
      */*/node_modules
    key: ${{ runner.os }}-${{ hashFiles('**/package-lock.lock') }}
```

## CodeQL Analysis

## Cypress E2E Tests

## Lint, build, and run tests

## Release
