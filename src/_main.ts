
import {
	config, loadAsyl, loadFromBytes, loadFromDataUri, loadFromUrl,
	memory, dataView, asyl
} from './loader';

globalThis.asyl =
{
	config,
	loadAsyl,
	loadFromBytes,
	loadFromDataUri,
	loadFromUrl,

	memory,
	dataView,
	asyl
};
