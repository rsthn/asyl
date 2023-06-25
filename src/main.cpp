
#include <cstdlib>
#include <cmath>
#include <wasm>

// cstdlib functions
export long _atol(const char *str) { return std::atol(str); }
export int _atoi(const char *str) { return std::atoi(str); }
export long long _atoll(const char *str) { return std::atoll(str); }
export double _atof(const char *str) { return std::atof(str); }
export long _strtol(const char *str, char **endptr, int base) { return std::strtol(str, endptr, base); }
export unsigned long _strtoul(const char *str, char **endptr, int base) { return std::strtoul(str, endptr, base); }
export long long _strtoll(const char *str, char **endptr, int base) { return std::strtoll(str, endptr, base); }
export unsigned long long _strtoull(const char *str, char **endptr, int base) { return std::strtoull(str, endptr, base); }
export double _strtod(const char *str, char **endptr) { return std::strtod(str, endptr); }
export float _strtof(const char *str, char **endptr) { return std::strtof(str, endptr); }
export long double _strtold(const char *str, char **endptr) { return std::strtold(str, endptr); }
export int _rand(void) { return std::rand(); }
export void _srand(unsigned int seed) { std::srand(seed); }
export void* _calloc(size_t num, size_t size) { return std::calloc(num, size); }
export void _free(void* ptr) { std::free(ptr); }
export void* _malloc(size_t size) { return std::malloc(size); }
export void* _realloc(void* ptr, size_t new_size) { return std::realloc(ptr, new_size); }
export void* _bsearch(const void* key, const void* base, size_t num, size_t size, int (*compar)(const void*,const void*)) { return std::bsearch(key, base, num, size, compar); }
export void _qsort(void* base, size_t num, size_t size, int (*compar)(const void*,const void*)) { std::qsort(base, num, size, compar); }
export long _labs(long x) { return std::labs(x); }
export long long _llabs(long long x) { return std::llabs(x); }
export div_t _div(int numer, int denom) { return std::div(numer, denom); }
export ldiv_t _ldiv(long numer, long denom) { return std::ldiv(numer, denom); }
export lldiv_t _lldiv(long long numer, long long denom) { return std::lldiv(numer, denom); }

// cmath functions
export double _cos (double x) { return std::cos(x); }
export double _sin (double x) { return std::sin(x); }
export double _tan (double x) { return std::tan(x); }
export double _acos (double x) { return std::acos(x); }
export double _asin (double x) { return std::asin(x); }
export double _atan (double x) { return std::atan(x); }
export double _atan2 (double y, double x) { return std::atan2(y, x); }
export double _cosh (double x) { return std::cosh(x); }
export double _sinh (double x) { return std::sinh(x); }
export double _tanh (double x) { return std::tanh(x); }
export double _acosh (double x) { return std::acosh(x); }
export double _asinh (double x) { return std::asinh(x); }
export double _atanh (double x) { return std::atanh(x); }
export double _exp (double x) { return std::exp(x); }
export double _frexp (double x, int* exp) { return std::frexp(x, exp); }
export double _ldexp (double x, int exp) { return std::ldexp(x, exp); }
export double _log (double x) { return std::log(x); }
export double _log10 (double x) { return std::log10(x); }
export double _modf (double x, double* intpart) { return std::modf(x, intpart); }
export double _exp2 (double x) { return std::exp2(x); }
export double _expm1 (double x) { return std::expm1(x); }
export int _ilogb (double x) { return std::ilogb(x); }
export double _log1p (double x) { return std::log1p(x); }
export double _log2 (double x) { return std::log2(x); }
export double _logb (double x) { return std::logb(x); }
export double _scalbn (double x, int n) { return std::scalbn(x, n); }
export double _scalbln (double x, long int n) { return std::scalbln(x, n); }
export double _pow (double base, double exp) { return std::pow(base, exp); }
export double _sqrt (double x) { return std::sqrt(x); }
export double _cbrt (double x) { return std::cbrt(x); }
export double _hypot (double x, double y) { return std::hypot(x, y); }
export double _erf (double x) { return std::erf(x); }
export double _erfc (double x) { return std::erfc(x); }
export double _tgamma (double x) { return std::tgamma(x); }
export double _lgamma (double x) { return std::lgamma(x); }
export double _ceil (double x) { return std::ceil(x); }
export double _floor (double x) { return std::floor(x); }
export double _fmod (double numerator, double denominator) { return std::fmod(numerator, denominator); }
export double _trunc (double x) { return std::trunc(x); }
export double _round (double x) { return std::round(x); }
export long int _lround (double x) { return std::lround(x); }
export long long int _llround (double x) { return std::llround(x); }
export double _rint (double x) { return std::rint(x); }
export long int _lrint (double x) { return std::lrint(x); }
export long long int _llrint (double x) { return std::llrint(x); }
export double _nearbyint (double x) { return std::nearbyint(x); }
export double _remainder (double numerator, double denominator) { return std::remainder(numerator, denominator); }
export double _remquo (double numerator, double denominator, int* quot) { return std::remquo(numerator, denominator, quot); }
export double _copysign (double x, double y) { return std::copysign(x, y); }
export double _nan (const char* tagp) { return std::nan(tagp); }
export double _nextafter (double x, double y) { return std::nextafter(x, y); }
export double _nexttoward (double x, long double y) { return std::nexttoward(x, y); }
export double _fdim (double x, double y) { return std::fdim(x, y); }
export double _fmax (double x, double y) { return std::fmax(x, y); }
export double _fmin (double x, double y) { return std::fmin(x, y); }
export double _fabs (double x) { return std::fabs(x); }
export double _abs (double x) { return std::abs(x); }
export double _fma (double x, double y, double z) { return std::fma(x, y, z); }

export float _cosf(float x) { return std::cosf(x); }
export float _sinf(float x) { return std::sinf(x); }
export float _tanf(float x) { return std::tanf(x); }
export float _acosf(float x) { return std::acosf(x); }
export float _asinf(float x) { return std::asinf(x); }
export float _atanf(float x) { return std::atanf(x); }
export float _atan2f(float y, float x) { return std::atan2f(y, x); }
export float _coshf(float x) { return std::coshf(x); }
export float _sinhf(float x) { return std::sinhf(x); }
export float _tanhf(float x) { return std::tanhf(x); }
export float _acoshf(float x) { return std::acoshf(x); }
export float _asinhf(float x) { return std::asinhf(x); }
export float _atanhf(float x) { return std::atanhf(x); }
export float _expf(float x) { return std::expf(x); }
export float _logf(float x) { return std::logf(x); }
export float _log10f(float x) { return std::log10f(x); }
export float _exp2f(float x) { return std::exp2f(x); }
export float _expm1f(float x) { return std::expm1f(x); }
export float _log1pf(float x) { return std::log1pf(x); }
export float _log2f(float x) { return std::log2f(x); }
export float _powf(float base, float exp) { return std::powf(base, exp); }
export float _sqrtf(float x) { return std::sqrtf(x); }
export float _cbrtf(float x) { return std::cbrtf(x); }
export float _hypotf(float x, float y) { return std::hypotf(x, y); }
export float _erff(float x) { return std::erff(x); }
export float _erfcf(float x) { return std::erfcf(x); }
export float _tgammaf(float x) { return std::tgammaf(x); }
export float _lgammaf(float x) { return std::lgammaf(x); }
export float _ceilf(float x) { return std::ceilf(x); }
export float _floorf(float x) { return std::floorf(x); }
export float _fmodf(float numerator, float denominator) { return std::fmodf(numerator, denominator); }
export float _truncf(float x) { return std::truncf(x); }
export float _roundf(float x) { return std::roundf(x); }
export float _rintf(float x) { return std::rintf(x); }
export float _nearbyintf(float x) { return std::nearbyintf(x); }
export float _remainderf(float numerator, float denominator) { return std::remainderf(numerator, denominator); }
export float _copysignf(float x, float y) { return std::copysignf(x, y); }
export float _nextafterf(float x, float y) { return std::nextafterf(x, y); }
export float _fdimf(float x, float y) { return std::fdimf(x, y); }
export float _fmaxf(float x, float y) { return std::fmaxf(x, y); }
export float _fminf(float x, float y) { return std::fminf(x, y); }
export float _fabsf(float x) { return std::fabsf(x); }
export float _fmaf(float x, float y, float z) { return std::fmaf(x, y, z); }
