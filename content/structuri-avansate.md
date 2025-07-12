# Structuri de Date Avansate

Pentru probleme dinamice și interactive, ai nevoie de structuri specializate care să suporte operații de actualizare și interogare rapide.

---

## 1. Fenwick Tree (BIT)

Permite update și interogare prefix sum în O(log n).

### Implementare

```cpp
struct Fenwick {
    int n;
    vector<long long> bit;
    Fenwick(int _n) : n(_n), bit(n+1, 0) {}
    void update(int idx, long long v) {
        for (; idx <= n; idx += idx & -idx) bit[idx] += v;
    }
    long long query(int idx) {
        long long s = 0;
        for (; idx > 0; idx -= idx & -idx) s += bit[idx];
        return s;
    }
    long long range(int l, int r) {
        return query(r) - query(l-1);
    }
};
```

![Fenwick Tree](../assets/img/structuri-avansate-bit.png)

---

## 2. Segment Tree

Suportă interogări pe interval (min, max, sum) și update punct în O(log n). Cu **lazy propagation** poți face update pe intervale.

### Implementare simplă

```cpp
struct SegTree {
    int n;
    vector<long long> st;
    SegTree(int _n) : n(_n), st(4*n) {}
    void build(int p, int l, int r, vector<int>& a) {
        if (l == r) { st[p] = a[l]; return; }
        int m = (l+r)/2;
        build(p*2, l, m, a);
        build(p*2+1, m+1, r, a);
        st[p] = st[p*2] + st[p*2+1];
    }
    long long query(int p, int l, int r, int i, int j) {
        if (j < l || r < i) return 0;
        if (i <= l && r <= j) return st[p];
        int m = (l+r)/2;
        return query(p*2, l, m, i, j) + query(p*2+1, m+1, r, i, j);
    }
    void update(int p, int l, int r, int idx, long long v) {
        if (l == r) { st[p] += v; return; }
        int m = (l+r)/2;
        if (idx <= m) update(p*2, l, m, idx, v);
        else update(p*2+1, m+1, r, idx, v);
        st[p] = st[p*2] + st[p*2+1];
    }
};
```

![Segment Tree](../assets/img/structuri-avansate-segtree.png)

---

## 3. Disjoint Set Union (DSU)

Suportă operații de `find` și `union` în aproape O(1) (inverse Ackermann).

```cpp
struct DSU {
    vector<int> p, r;
    DSU(int n): p(n), r(n, 0) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a,b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
};
```

![DSU](../assets/img/structuri-avansate-dsu.png)

---

## 4. Arbori speciali

### Heavy-Light Decomposition (HLD)

Împarte arborele în lanțuri pentru a reduce interogări pe drum de la O(n) la O(log² n).

### Link-Cut Tree

Structură dinamică pentru arbori cu rotații, suportă schimbări de root și query pe drum.

### Treap (Tree + Heap)

BST aleator, asigură echilibrarea implicită prin prioritate random.

### Rope

Structură pentru stringuri mari, suportă concatenare și split eficient.

> **Resurse suplimentare:**
>
> * [CP-algorithms: DSU, Segment Tree, HLD](https://cp-algorithms.com/data_structures/)
> * [USACO Guide: Data Structures](https://usaco.guide/data-structures)