# `parallelish`

> parallel `păr′ə-lĕl` -- ish

Use parallel to run a job multiple times in parallel in a single pipeline.

## Usage

> NodeJS is NOT Required

```yaml

jobs:
  pipeline:
    name: Node ${{ matrix.node-version }} on ${{ matrix.os }}
    runs-on: ${{ matrix.os }}

    strategy:
      fail-fast: false
      matrix:
        node-version: ['16.x']
        os: ['ubuntu-latest']
    name: Distributed Tasks
    steps:
      - uses: actions/checkout@v3

      - name: Run bash commands in parallel
        uses: mping-exo/parallelish@nodejs
          id: tasks
        with:
          run: | 
            echo $BASH_VERSION; date;
            echo $BASH_VERSION; date;
```
