
import {
    loadAsyl, loadFromBytes, loadFromDataUri, loadFromUrl,
    memory, dataView, asyl,
}
from './loader';

globalThis.asyl =
{
    loadFromBytes,
    loadFromDataUri,
    loadFromUrl,

    memory,
    dataView,
    asyl,
};

loadAsyl();
