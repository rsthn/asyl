
export {
    loadFromBytes, loadFromDataUri, loadFromUrl,
    memory, dataView, asyl
}
from './loader';

export { default as Module } from './module';
export { default as wasi } from './wasi';

import { loadAsyl } from './loader';

loadAsyl();
