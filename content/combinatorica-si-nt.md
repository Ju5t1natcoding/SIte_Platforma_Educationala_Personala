# Teoria Numerelor și Combinatorică

Acest capitol combină aritmetica modulară, primalitatea și tehnici de numărare pentru a rezolva probleme de optimizare și contorizare.

---

## 1. Primalitate și factorizare

### Crivă Eratostene

* Găsește toți divizorii primi până la `N` în O(N log log N).
* Algoritm: marchezi multiplii fiecărui număr prim.

```cpp
vector<bool> is_prime(N+1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i * i <= N; i++) {
    if (is_prime[i]) {
        for (int j = i * i; j <= N; j += i)
            is_prime[j] = false;
    }
}
```

### Miller–Rabin

* Test probabilist pentru primalitate pentru numere mari (64-bits).
* Repetiții multiple reduc eroarea.

```cpp
bool isPrime(ll n) {
    if (n < 2) return false;
    for (ll p : {2,3,5,7,11,13,17,19,23,29,31,37}) {
        if (n%p == 0) return n == p;
    }
    ll d = n - 1, s = 0;
    while ((d & 1) == 0) d >>= 1, s++;
    auto modpow = [&](ll a, ll e){ ll r=1; while(e){ if(e&1) r=__int128(r)*a%n; a=__int128(a)*a%n; e >>=1;} return r; };
    for (ll a : {2,325,9375,28178,450775,9780504,1795265022}) {
        ll x = modpow(a, d);
        if (x == 1 || x == n-1) continue;
        bool comp = true;
        for (int r = 1; r < s; r++) {
            x = __int128(x)*x % n;
            if (x == n-1) { comp = false; break; }
        }
        if (comp) return false;
    }
    return true;
}
```

### Pollard’s Rho

* Algoritm practic pentru factorizarea numerelor mari.

```cpp
ll pollards_rho(ll n) {
    if (n%2 == 0) return 2;
    ll x = rand() % (n-2) + 2;
    ll y = x;
    ll c = rand() % (n-1) + 1;
    ll d = 1;
    while (d == 1) {
        x = (__int128(x)*x + c) % n;
        y = (__int128(y)*y + c) % n;
        y = (__int128(y)*y + c) % n;
        d = gcd(abs(x-y), n);
        if (d == n) return pollards_rho(n);
    }
    return d;
}
```

![Factorizare](../assets/img/combinatorica-nt-factorizare.png)

---

## 2. Aritmetică modulară

* **Invers modular**: rezolvăm `a * x ≡ 1 (mod p)`

  * Când `p` prim, putem folosi `x = a^(p-2) mod p` (Fermat)
  * Altminteri, extins Euclid

```cpp
// Fermat
ll modexp(ll a, ll e, ll mod) { ll r=1; while(e){ if(e&1) r=__int128(r)*a%mod; a=__int128(a)*a%mod; e>>=1;} return r; }
ll inv = modexp(a, mod-2, mod);
```

* **Chinese Remainder Theorem (CRT)** – rezolvă sistem de congruențe cu moduli pairwise coprime.

---

## 3. Tehnici de numărare

### Permutări și Combinații

* **Permutări**: aranjări ordine, `P(n,k) = n! / (n-k)!`
* **Combinații**: selectări fără ordine, `C(n,k) = n! / (k!(n-k)!)`

```cpp
vector<ll> fact(N+1), invfact(N+1);
// precompute fact și invfact
fact[0]=1;
for (int i=1;i<=N;i++) fact[i]=fact[i-1]*i%mod;
invfact[N]=modexp(fact[N], mod-2, mod);
for (int i=N;i>0;i--) invfact[i-1]=invfact[i]*i%mod;
// C(n,k) = fact[n]*invfact[k]%mod*invfact[n-k]%mod;
```

### Principiul incluziune-excluziune

* Folosește pentru probleme de contorizare cu condiții de excludere.
* Formula: `|A∪B| = |A|+|B|−|A∩B|` și extinde la n seturi.

### Polinoame generatoare și FFT

* **Generating functions**: folosite pentru a transforma contorizarea în operații de polinom.
* **FFT**: multiplicarea polinoamelor în O(n log n).

```cpp
void fft(vector<complex<double>>& a, bool invert) { /* implementare standard */ }
```

![Combinatorică](../assets/img/combinatorica-nt-comb.png)

---

> **Resurse suplimentare:**
>
> * [CP-algorithms: Number theory](https://cp-algorithms.com/algebra/)
> * [USACO Guide: Combinatorics](https://usaco.guide/comb)