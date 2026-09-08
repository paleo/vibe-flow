# @paleo/alproject

## 2.0.0

### Major Changes

- 44e1f9e: Breaking change: the host registry (`~/.alproject.json`, `register`, `unregister`) is replaced by markers. A project's committed `.alignfirst.json` is its registration, and `.alignfirst-projects.json` marks a projects directory. New commands: `doctor`, `init`, `free-ports`, `--guide`. Requires the `alignfirst` CLI on `PATH`.

## 1.1.0

### Minor Changes

- ecf4cee: Added explicit base-port allocations outside configured port ranges.

## 1.0.0

### Major Changes

- e44a7c8: Added detailed project status, exact base-port registration, and parent-specific port ranges using the new object-based configuration.

## 0.1.0

### Minor Changes

- 2877daa: Added the alproject CLI for project registration, discovery, and port allocation.
