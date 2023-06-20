
import {
	config, loadAsyl, loadFromArrayBuffer, loadFromDataUri, loadFromUrl,
	memory, dataView, asyl
} from './loader';

globalThis.asyl =
{
	config,
	loadAsyl,
	loadFromArrayBuffer,
	loadFromDataUri,
	loadFromUrl,

	memory,
	dataView,
	asyl
};
