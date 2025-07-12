# Geometrie Computațională

Geometria Computațională implică algoritmi și structuri pentru rezolvarea problemelor de plan și spațiu, folosind operații pe vectori, intersecții și proprietăți ale poligoanelor.

---

## 1. Operații pe vectori

Fie două puncte A(x₁,y₁) și B(x₂,y₂), vectorul

$\vec{AB} = (x₂-x₁,\; y₂-y₁)$

* **Dot Product** (produs scalar):

$\vec{u} \cdot \vec{v} = u_x v_x + u_y v_y$

* Verifică ortogonalitatea: `u·v = 0`.

* Proiecție: `proj_u(v) = (u·v / |u|²) * u`.

* **Cross Product** (produs vectorial în 2D, scalar):

$\vec{u} \times \vec{v} = u_x v_y - u_y v_x$

* Semnifică orientarea (sens pozitiv = anti-orar).
* `|u × v|` = aria paralelogramului format.

```cpp
struct Point { long long x, y; };
long long dot(Point a, Point b) { return a.x*b.x + a.y*b.y; }
long long cross(Point a, Point b) { return a.x*b.y - a.y*b.x; }
```

![Vector Operations](../assets/img/geometrie-vectors.png)

---

## 2. Convex Hull

Construirea unei învelișuri convexe pentru un set de puncte. Două algoritmi comuni:

### Andrew’s Monotonic Chain

1. Sortează punctele după x (și y ca tie-breaker).
2. Construieste „lower hull” și „upper hull” folosind stivă și cross-product pentru orientare.

```cpp
vector<Point> convexHull(vector<Point>& pts) {
    sort(pts.begin(), pts.end(), [](auto &a, auto &b){ return a.x<b.x || (a.x==b.x && a.y<b.y); });
    vector<Point> h;
    // lower
    for (auto &p : pts) {
        while (h.size()>=2 && cross({h[h.size()-1].x-h[h.size()-2].x, h[h.size()-1].y-h[h.size()-2].y}, {p.x-h[h.size()-1].x, p.y-h[h.size()-1].y}) <= 0)
            h.pop_back();
        h.push_back(p);
    }
    // upper
    int lower_size = h.size();
    for (int i = pts.size()-2; i >= 0; i--) {
        auto &p = pts[i];
        while (h.size()>lower_size && cross({h[h.size()-1].x-h[h.size()-2].x, h[h.size()-1].y-h[h.size()-2].y}, {p.x-h[h.size()-1].x, p.y-h[h.size()-1].y}) <= 0)
            h.pop_back();
        h.push_back(p);
    }
    h.pop_back(); // ultimul e primul
    return h;
}
```

![Convex Hull](../assets/img/geometrie-convex-hull.png)

---

## 3. Intersecții

### Segment–Segment

Verifică orientarea punctelor și cazurile de coliniaritate.

```cpp
bool onSegment(Point a, Point b, Point p) {
    return min(a.x,b.x) <= p.x && p.x <= max(a.x,b.x)
        && min(a.y,b.y) <= p.y && p.y <= max(a.y,b.y);
}
bool segIntersect(Point a, Point b, Point c, Point d) {
    auto o1 = cross({b.x-a.x, b.y-a.y}, {c.x-a.x, c.y-a.y});
    auto o2 = cross({b.x-a.x, b.y-a.y}, {d.x-a.x, d.y-a.y});
    auto o3 = cross({d.x-c.x, d.y-c.y}, {a.x-c.x, a.y-c.y});
    auto o4 = cross({d.x-c.x, d.y-c.y}, {b.x-c.x, b.y-c.y});
    if (o1*o2 < 0 && o3*o4 < 0) return true;
    // cazuri coliniaritate
    if (!o1 && onSegment(a,b,c)) return true;
    if (!o2 && onSegment(a,b,d)) return true;
    if (!o3 && onSegment(c,d,a)) return true;
    if (!o4 && onSegment(c,d,b)) return true;
    return false;
}
```

### Sweep-Line pentru numărare intersecții

Folosind evenimente și un set ordonat pentru segmente active.

---

## 4. Poligoane

### Aria cu Shoelace Formula

Pentru poligon cu vârfurile (x₀,y₀),…,(xₙ₋₁,yₙ₋₁):

$A = \frac12 \left| \sum_{i=0}^{n-1} (x_i y_{i+1} - x_{i+1} y_i) \right|, \;\; x_n = x_0, y_n = y_0.$

```cpp
long long polygonArea(vector<Point>& P) {
    long long A = 0;
    int n = P.size();
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        A += P[i].x * P[j].y - P[j].x * P[i].y;
    }
    return abs(A);
}
```

### Test punct în interior (Ray-Casting)

Trasezi o dreaptă orizontală și numeri intersecțiile.

```cpp
bool pointInPoly(vector<Point>& P, Point q) {
    bool inside = false;
    int n = P.size();
    for (int i = 0, j = n-1; i < n; j = i++) {
        if ( ((P[i].y>q.y) != (P[j].y>q.y))
          && (q.x < (P[j].x-P[i].x)*(q.y-P[i].y)/(P[j].y-P[i].y) + P[i].x) )
            inside = !inside;
    }
    return inside;
}
```

![Poligon și test punct](../assets/img/geometrie-polygon.png)

---

> **Resurse:**
>
> * [CP-algorithms: Geometry](https://cp-algorithms.com/geometry/)
> * [USACO Guide: Geometry](https://usaco.guide/geometry)