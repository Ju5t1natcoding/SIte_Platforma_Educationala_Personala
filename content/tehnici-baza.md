# Tehnici de bază

În fazele inițiale ale olimpiadei de informatică, problemele se concentrează de obicei pe concepte fundamentale. Totuși, pentru a fi competitiv la nivel înalt, ai nevoie nu doar de cunoștințe teoretice, ci și de implementări eficiente și corecte.

---

## 1. Input / Output

### scanf/printf vs cin/cout

* **`scanf`/`printf`** (din C) sunt mai rapide decât **`cin`/`cout`** (din C++), dar au o sintaxă mai puțin prietenoasă.
* Dacă folosești C++, dezactivează sincronizarea cu C:

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

* Exemplu:

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    long long sum = 0;
    for (int x : a) sum += x;
    cout << sum << "\n";
    return 0;
}
```

![scanf vs cin](../assets/img/tehnici-baza-io.png)

### Buffering și sincronizare

* **Buffering**: datele nu sunt scrise imediat pe ecran/disc, ci în buffer, pentru eficiență.
* **`ios::sync_with_stdio(false)`**: deconectează `cin`/`cout` de `stdin`/`stdout`, accelerează I/O.
* **`cin.tie(nullptr)`**: decuplează fluxul de ieșire de cel de intrare, evitând flush-urile implicite.

### Citirea liniilor complete

* Pentru a citi linii de text cu spații, folosește:

```cpp
string line;
getline(cin, line);
```

* Dacă amesteci `cin >> x` cu `getline`, golește mai întâi buffer-ul:

```cpp
cin >> x;
cin.ignore(numeric_limits<streamsize>::max(), '\n');
getline(cin, line);
```

---

## 2. Sortări și căutare

### Sortări simple

* **Bubble Sort**: compari perechi și interschimbi, O(n²). Bun pentru înțelegere, nu pentru competiție.
* **Insertion Sort**: inserezi elementul curent în subșirul deja sortat, O(n²).
* **Selection Sort**: găsești minimul și îl poziționezi la început, O(n²).

### Sortări eficiente

* **Merge Sort**: divizează și cucerește, O(n log n), stabil.
* **Quick Sort**: pivot și partiționare, O(n log n) în medie, instabil.
* Alegerea pivotului (median-of-three) reduce șansele de O(n²).

```cpp
void quick_sort(vector<int> &a, int l, int r) {
    if (l >= r) return;
    int pivot = a[(l+r)/2];
    int i = l, j = r;
    while (i <= j) {
        while (a[i] < pivot) i++;
        while (a[j] > pivot) j--;
        if (i <= j) swap(a[i++], a[j--]);
    }
    quick_sort(a, l, j);
    quick_sort(a, i, r);
}
```

### Căutare liniară vs binară

* **Linear search**: O(n), parcurgi element cu element.
* **Binary search**: O(log n), necesită vector sortat.

```cpp
int lb(const vector<int>& a, int x) {
    int l = 0, r = a.size();
    while (l < r) {
        int m = (l + r) / 2;
        if (a[m] < x) l = m + 1;
        else r = m;
    }
    return l;
}
```

![Binary Search](../assets/img/tehnici-baza-binary-search.png)

---

## 3. Structuri simple

### vector și array

* **`vector<T>`**: alocare dinamică, redimensionabil.
* **`array<T, N>`**: alocare statică, lungime fixă.

```cpp
vector<int> v;        // dinamic
array<int, 100> a;     // static
```

### pair și tuple

* **`pair<A, B>`**: pereche de tipuri.
* **`tuple<Ts...>`**: stocare multipărți.
* Poți sorta vector de `pair<int,int>` direct.

### map vs unordered\_map

* **`map`**: arbore roșu-negru, O(log n) per operație.
* **`unordered_map`**: hash table, O(1) în medie.
* Rezervă spațiu cu `reserve()` pentru a evita rehash.

```cpp
unordered_map<int, int> mp;
mp.reserve(1000);
mp[5] = 10;
```

---

## 4. Recursie de bază

* Recursia folosește stiva de apeluri.
* Exemple: Fibonacci, factorial, backtracking.

```cpp
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}
```

* **Pruning** (tăiere): într-un backtracking de permutări, dacă partialul nu e promițător, nu mai continui.

---

## 5. STL și funcții de ajutor

* **`sort(begin, end)`**, **`reverse`**, **`next_permutation`**
* **`accumulate(begin, end, init)`**, **`count(begin, end, val)`**, **`__builtin_popcount(x)`**

```cpp
int cnt = __builtin_popcount(mask);
long long sum = accumulate(v.begin(), v.end(), 0LL);
```

---

> **Resurse suplimentare:**
>
> * [Documentație C++ STL](https://en.cppreference.com/w/cpp)
> * [Tutorial GeeksforGeeks](https://www.geeksforgeeks.org/)