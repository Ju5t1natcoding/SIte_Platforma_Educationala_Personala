# Programare Dinamică

Programarea Dinamică (DP) este o tehnică de rezolvare a problemelor complexe prin descompunerea lor în subprobleme suprapuse și memorarea rezultatelor acestora, pentru a evita recalculările.

---

## 1. Modelarea stărilor

Definim o funcție `dp(...)` cu parametri care descriu complet starea problemei:

* Indici de poziție (`i`, `j` etc.)
* Parametri adăugați (greutate acumulată, număr de pași, masă, profit)

> **Exemplu:** pentru problema Knapsack 0/1, `dp(i, w)` este valoarea maximă obținută folosind de la obiectul `i` încolo și având la dispoziție capacitate `w`:

```cpp
int dp(int i, int w) {
    if (i == n) return 0;
    if (memo[i][w] != -1) return memo[i][w];
    int skip = dp(i + 1, w);
    int take = (weight[i] <= w) ? value[i] + dp(i + 1, w - weight[i]) : 0;
    return memo[i][w] = max(skip, take);
}
```

![Modelare stări DP](../assets/img/programare-dinamica-states.png)

---

## 2. Top‑Down vs Bottom‑Up

* **Top‑Down (memoizare)**

  * Implementare recursivă
  * Salvezi rezultatele intermediare în tabel (vector 2D, `unordered_map`)
  * Simplu de scris, dar overhead din cauza apelurilor recursive

* **Bottom‑Up (tabulare)**

  * Construiești tabela pornind de la cazurile de bază spre cele complexe
  * Eficient din punct de vedere al memoriei de apel și al vitezei

```cpp
// Bottom-Up pentru Knapsack 0/1\int dp[MAX_N+1][MAX_W+1];
for (int i = n; i >= 0; i--) {
    for (int w = 0; w <= W; w++) {
        int skip = dp[i+1][w];
        int take = (weight[i] <= w) ? value[i] + dp[i+1][w-weight[i]] : 0;
        dp[i][w] = max(skip, take);
    }
}
```

![Top-Down vs Bottom-Up](../assets/img/programare-dinamica-td-bu.png)

---

## 3. Probleme clasice

1. **Knapsack 0/1** – capacitate fixă, repartiție obiecte
2. **Unbounded Knapsack** – poți alege un obiect de mai multe ori
3. **Longest Increasing Subsequence (LIS)** – `dp[i] = 1 + max(dp[j])` pentru toate `j < i` cu `a[j] < a[i]`
4. **Subset Sum** – verifici dacă există submulțime cu sumă `S` (DP boolean)
5. **DP pe graf/arbore** – calcul de diametru, subarbore maxim, colorare

> **Cod simplu LIS:**

```cpp
vector<int> dp(n, 1);
for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
    }
}
int ans = *max_element(dp.begin(), dp.end());
```

---

## 4. Optimizări avansate

* **Memory optimization**: păstrează doar ultima și penultima linie de DP în loc de întreaga matrice

```cpp
vector<int> prev(W+1), curr(W+1);
for (...) {
    for (int w = 0; w <= W; w++) {
        curr[w] = max(prev[w], weight[i] <= w ? value[i] + prev[w-weight[i]] : 0);
    }
    swap(prev, curr);
}
```

* **Convex Hull Trick**: optimizează DP de forma `dp[i] = max_j (m_j * x_i + b_j)` folosind o structură de drepte convexe

![Convex Hull Trick](../assets/img/programare-dinamica-cht.png)

* **Divide & Conquer DP**: reduce complexitatea O(n²) la O(n log n) pentru anumite cost functions

---

## 5. Capcane comune

* **Inițializare incorectă** (`-INF` vs `0`) pentru maximizare/minimizare
* **Overflow** dacă ai valori mari și nu folosești `long long` sau modulo
* **Ordine greșită de calcul** în DP tabular—ordinea buclelor contează!
* **Confuzie între valoarea optimă și numărul de moduri** (DP de contează soluții vs valoare)

---

> **Resurse recomandate:**
>
> * [Artyom Lipski](https://usaco.guide/)
> * [CP-algorithms (e-maxx)](https://cp-algorithms.com/dynamic_programming/)