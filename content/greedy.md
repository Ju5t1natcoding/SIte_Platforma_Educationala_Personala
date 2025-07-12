# Algoritmi Greedy și Euristici

Strategia greedy (lacomoasă) construiește soluția pas cu pas, alegând la fiecare pas opțiunea care pare a fi cea mai bună local.

---

## 1. Principii de bază

### Interval Scheduling

* Dată o mulțime de activități cu intervale `[start, finish]`, selectează cât mai multe non‑suprapuse.
* **Greedy**: sortează după `finish` crescător și alege activitățile cu cea mai mică `finish` care nu intră în conflict.

```cpp
struct Act { int s, f; };
bool cmp(const Act &a, const Act &b) { return a.f < b.f; }
int maxActivities(vector<Act>& acts) {
    sort(acts.begin(), acts.end(), cmp);
    int count = 0, last_end = -1;
    for (auto &act : acts) {
        if (act.s >= last_end) {
            count++;
            last_end = act.f;
        }
    }
    return count;
}
```

### Fractional Knapsack

* Obiecte cu greutate și valoare; poți lua fracțiuni.
* Sortează după raportul `value/weight` și umple rucsacul.

```cpp
struct Item { double w, v; };
bool cmp(const Item&a, const Item&b) { return a.v/a.w > b.v/b.w; }
double fracKnapsack(int W, vector<Item>& items) {
    sort(items.begin(), items.end(), cmp);
    double val = 0;
    for (auto &it : items) {
        if (W == 0) break;
        int take = min<double>(it.w, W);
        val += take * (it.v/it.w);
        W -= take;
    }
    return val;
}
```

> **Observație:** Fractional Knapsack nu poate fi rezolvat greedy dacă nu permiți fracțiuni.

---

## 2. Demonstratea corectitudinii

### Exchange Argument

* Demonstrezi că orice soluție optimă poate fi transformată pas cu pas într‑una obținută de algoritmul tău, fără a scădea valoarea.

> Exemplu: în Interval Scheduling, dacă soluția optimă are o activitate cu `finish` mai mare, o poți înlocui cu prima activitate alesă de greedy fără a reduce numărul.

---

## 3. Euristici și aproximări

### Nearest Neighbor (TSP)

* Pornind dintr-un oraș, mută‑te mereu la cel mai apropiat oraș nevizitat.
* Nu garantează soluție optimă, dar rapid.

```cpp
int nearestNeighbor(int start, vector<vector<int>>& dist) {
    int n = dist.size();
    vector<bool> used(n, false);
    int cur = start, tourLen = 0;
    used[cur] = true;
    for (int k = 1; k < n; k++) {
        int nxt = -1;
        for (int i = 0; i < n; i++) if (!used[i]) {
            if (nxt == -1 || dist[cur][i] < dist[cur][nxt]) nxt = i;
        }
        tourLen += dist[cur][nxt];
        cur = nxt;
        used[cur] = true;
    }
    // întoarcere la start
    tourLen += dist[cur][start];
    return tourLen;
}
```

### Hill Climbing

* Pornind de la o soluție inițială, aplici „mutări” locale care îmbunătățesc soluția.
* Oprești când nu mai găsești mutări care să scadă costul.

---

## 4. Branch & Bound și Backtracking cu Euristici

* **Branch & Bound**: explorezi spațiul de soluții, folosind upper/lower bounds pentru a tăia ramuri nepromițătoare.
* **Backtracking cu euristică**: alege ordinea de explorare în funcție de potențialul de a găsi soluții bune rapid.

> **Exemplu de aplicație:** problema celor 8 regine, scheduling cu costuri, grafuri colorate.

---

> **Resurse:**
>
> * [CP-algorithms: Greedy](https://cp-algorithms.com/greedy/)
> * [USACO Guide: Heuristics](https://usaco.guide/heuristics)