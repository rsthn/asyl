# v1.0.3 - Jun 25 2023

#### Asyl
- Updated main asyl wasm module to export several function from cstdlib and cmath.
- Compile your modules with the `-nostdlib` option to ensure it uses the ones exposed by asyl.

#### Loader
- When importing a module now the core exports of asyl are made available to it.
- Core imports of Asyl are those starting with underscore in the asyl.cpp file.
- Asyl core exports are available via the `core` attribute.

#### Module
- Renamed functions allocMemory and freeMemory to just malloc and free.

<br/>

# v1.0.2 - Jun 20 2023

#### Loader
- Added method `loadAsyl` to load the main asyl WASM module.
- Added property `memory` which contains a reference to the shared WASM memory.
- Added property `dataView` representing a data view for the shared memory.
- All modules now share the same memory space with 1 MB minimum and 2 GB maximum.

#### Asyl
- Added main Asyl WASM module.
- Added functions memoryAlloc and memoryFree.

#### Module
- Added methods `alloc` and `free` using the Asyl module's memory functions.
- Added method `mapUint8Array`.

<br/>

# v1.0.1 - Sep 28 2022

#### Module
- Added `loadFromArrayBuffer`, `loadFromDataUri` and renamed `load` to `loadFromUrl`.
- Added method `mapFloat32Array` to AsylModule to create a Float32Array mapped to WASM memory.
