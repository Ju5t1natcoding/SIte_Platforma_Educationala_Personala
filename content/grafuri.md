# Grafuri

Grafurile modelează relații și conexiuni între obiecte (noduri și muchii). Sunt extrem de utile în modelarea rețelelor și în rezolvarea diverselor probleme de optimizare și căutare.

---

## 1. Reprezentări

### Listă de adiacență

* Pentru fiecare nod, păstrezi o listă de vecini.
* Spațiu O(n + m), eficient pentru grafuri sparse.

```cpp
vector<vector<int>> adj(n);
void addEdge(int u, int v) {
    adj[u].push_back(v);
    adj[v].push_back(u);  // pentru graf neorientat
}
```

### Matrice de adiacență

* Matrice `n×n`, `adj[i][j] = 1` dacă există muchie.
* Spațiu O(n²), acces O(1).

```cpp
vector<vector<bool>> adj(n, vector<bool>(n, false));
adj[u][v] = adj[v][u] = true;
```

![Reprezentări graf](../assets/img/grafuri-repr.png)

---

## 2. Parcurgeri

### BFS (Breadth-First Search)

* Găsește distanța minimă în graf neponderat.
* Folosește coadă FIFO.

```cpp
vector<int> dist(n, -1);
void bfs(int src) {
    queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}
```

### DFS (Depth-First Search)

* Găsește componente conexe, detectează ciclu.
* Implementare recursivă sau stivă.

```cpp
vector<bool> vis(n, false);
void dfs(int u) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs(v);
}
```

![BFS vs DFS](../assets/img/grafuri-bfs-dfs.png)

---

## 3. Drumuri minime

### Dijkstra

* Graf cu costuri non-negative.
* Folosește priority\_queue, O((n + m) log n).

```cpp
vector<long long> dist(n, LLONG_MAX);
void dijkstra(int src) {
    dist[src] = 0;
    priority_queue<pair<ll,int>, vector<pair<ll,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
}
```

### Bellman-Ford

* Detectează cicluri de cost negativ.
* Complexitate O(n·m).

```cpp
vector<long long> dist(n, LLONG_MAX);
dist[src] = 0;
for (int i = 0; i < n-1; i++)
    for (auto [u, v, w] : edges)
        if (dist[u] != LLONG_MAX && dist[v] > dist[u] + w)
            dist[v] = dist[u] + w;
```

### Floyd-Warshall

* Toate perechile de distanțe.
* Complexitate O(n³).

```cpp
vector<vector<ll>> d(n, vector<ll>(n, INF));
for (int i = 0; i < n; i++) d[i][i] = 0;
for (auto [u,v,w] : edges) d[u][v] = w;
for (int k = 0; k < n; k++)
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
```

---

## 4. Arbori de acoperire minimă (MST)

### Kruskal

* Sortează muchiile și le adaugă cu DSU.
* O(m log m).

```cpp
struct DSU { vector<int> p, r; /* ... */ };
vector<Edge> edges;
sort(edges.begin(), edges.end(), [](auto &a, auto &b){ return a.w < b.w; });
for (auto &e : edges)
    if (dsu.find(e.u) != dsu.find(e.v)) {
        dsu.unite(e.u, e.v);
        mst_weight += e.w;
    }
```

### Prim

* Folosește heap, plecând dintr-un nod.
* O(m log n).

```cpp
vector<bool> used(n, false);
priority_queue<pair<ll,int>, vector<pair<ll,int>>, greater<>> pq;
pq.push({0, 0});
while (!pq.empty()) {
    auto [w,u] = pq.top(); pq.pop();
    if (used[u]) continue;
    used[u] = true;
    mst_weight += w;
    for (auto [v, wt] : adj[u]) if (!used[v])
        pq.push({wt, v});
}
```

![MST Kruskal vs Prim](../assets/img/grafuri-mst.png)

---

## 5. Flux maxim și cuplaj bipartit

### Edmonds-Karp

* BFS repetitiv pe rețeaua reziduală.
* O(V·E²).

```cpp
int maxflow = 0;
while (bfs_level()) {
    maxflow += dfs_flow(src, INF);
}
```

### Dinic

* Level graph + blocking flow.
* O(E·√V) în practică.

![Flow algorithms](../assets/img/grafuri-flow.png)

> **Aplicații:** cuplaj bipartit, flux cu cost minim, rețele de transport