# Alte Teme (Strings, FFT, Arbori etc.)

Aceste subiecte apar la etapele avansate și în competiții de nivel IOI și includ tehnici critice pentru probleme complexe.

---

## 1. Stringuri și Pattern Matching

### KMP (Knuth–Morris–Pratt)

* Construiești un array `pi[i]` ce reprezintă lungimea celei mai mari prefixe-sufix pentru `s[0..i]`.
* Căutarea are complexitate O(n + m).

```cpp
vector<int> build_pi(const string &s) {
    int n = s.size();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i-1];
        while (j > 0 && s[i] != s[j]) j = pi[j-1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}

vector<int> kmp_search(const string &text, const string &pat) {
    string s = pat + "#" + text;
    auto pi = build_pi(s);
    vector<int> occurrences;
    for (int i = pat.size() + 1; i < s.size(); i++) {
        if (pi[i] == pat.size())
            occurrences.push_back(i - 2*pat.size());
    }
    return occurrences;
}
```

### Z-Algorithm

* Creezi un array `z[i]` = lungimea celui mai lung prefix care începe la `i`.
* Util pentru multiple pivotări de căutare.

---

## 2. Structuri pe suffixe

### Suffix Array

* Sortarea tuturor sufixelor șirului.
* Construcție O(n log n) cu dublarea offset-urilor.

### Suffix Automaton

* Automaton minim care recunoaște toate sufixele unui șir.
* Permite contorizarea distinctă a substring-urilor în O(n).

### Suffix Tree (Ukkonen)

* Structură compresată de trie pentru sufixe.
* Construcție în O(n).

---

## 3. Mo’s Algorithm

* Algoritm offline pentru interogări pe intervale.
* Sortezi interogările după bloc și capăt pentru a minimiza costul de update.

```cpp
int BLOCK;
struct Query { int l, r, idx; };
bool cmp(const Query &a, const Query &b) {
    if (a.l / BLOCK != b.l / BLOCK)
        return a.l < b.l;
    return a.r < b.r;
}

void processQueries(vector<Query>& Q) {
    sort(Q.begin(), Q.end(), cmp);
    int curL = 0, curR = -1;
    for (auto &q : Q) {
        while (curL > q.l) add(--curL);
        while (curR < q.r) add(++curR);
        while (curL < q.l) remove(curL++);
        while (curR > q.r) remove(curR--);
        ans[q.idx] = currentAnswer();
    }
}
```

---

## 4. FFT pentru polinoame

* **Fast Fourier Transform** pentru multiplicarea rapidă a polinoamelor în O(n log n).

```cpp
void fft(vector<complex<double>>& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j |= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2*M_PI/len * (invert ? -1 : 1);
        complex<double> wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            complex<double> w(1);
            for (int j = 0; j < len/2; j++) {
                complex<double> u = a[i+j];
                complex<double> v = a[i+j+len/2] * w;
                a[i+j] = u + v;
                a[i+j+len/2] = u - v;
                w *= wlen;
            }
        }
    }
    if (invert) for (auto &x : a) x /= n;
}
```

---

## 5. Arbori pe graf

### LCA (Lowest Common Ancestor)

* Tabulare cu dublarea (binary lifting) în O(n log n) preprocessing și O(log n) query.

### Centroid Decomposition

* Descompunere recursivă axată pe centroid pentru a rezolva DP pe arbore eficient.

### Virtual Tree

* Construcția arborelui restrâns la noduri de interes, cu DSU/sortări.

> **Resurse suplimentare:**
>
> * [CP-algorithms: Strings, FFT, Trees](https://cp-algorithms.com)
> * [USACO Guide: Advanced Topics](https://usaco.guide)