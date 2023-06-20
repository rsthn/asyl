
#include <cstdlib>
#include <wasm>

/**
 * @brief Allocates a number of bytes of memory.
 * @param byteLength 
 * @return void*
 */
export void *memoryAlloc (unsigned byteLength)
{
	return malloc(byteLength);
}

/**
 * @brief Frees the specified memory block.
 * @param blockAddr
 * @return void*
 */
export void memoryFree (void *blockAddr)
{
	free(blockAddr);
}
