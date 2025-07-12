// ==== script.js ====

// ==== 1. Lista capitolelor (păstrând structura schiței) ====
const chapters = [
    {
      id: 'tehnici-baza',
      title: 'Tehnici de bază',
      problems: [
        // CodeForces
        { id: 'cf1462A', name: 'CF 1462A – Favorite Sequence', url: 'https://codeforces.com/problemset/problem/1462/A' },
        { id: 'cf1772A', name: 'CF 1772A – A Problem About Polyline', url: 'https://codeforces.com/problemset/problem/1772/A' },
        { id: 'cf1498A', name: 'CF 1498A – GCD Sum', url: 'https://codeforces.com/problemset/problem/1498/A' },
        { id: 'cf158B',  name: 'CF 158B – Taxi', url: 'https://codeforces.com/problemset/problem/158/B' },
        { id: 'cf200B',  name: 'CF 200B – Drinks', url: 'https://codeforces.com/problemset/problem/200/B' },
        // Kilonova
        { id: 'klv-basics1', name: 'Kilonova – Basics 1', url: 'https://kilonova.ro/problems/basics1' },
        { id: 'klv-basics2', name: 'Kilonova – Basics 2', url: 'https://kilonova.ro/problems/basics2' },
        // pbinfo
        { id: 'pbinfo-rc1', name: 'pbinfo – Recapitulare Citire', url: 'https://pbinfo.ro/probleme/recap-citire' },
        { id: 'pbinfo-sort', name: 'pbinfo – Sortări', url: 'https://pbinfo.ro/probleme/sortari' },
        // USACO (exemplu)
        { id: 'usaco-sum', name: 'USACO – Sum in a Triangle', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=863' },
        // Infoarena (exemplu)
        { id: 'ia-sir', name: 'infoarena – sir', url: 'https://infoarena.ro/problema/sir' },
        // Altele
        { id: 'atc-basic', name: 'AtCoder – Beginner Contest A', url: 'https://atcoder.jp/contests/abc001/tasks/abc001_1' },
        { id: 'uva-100', name: 'UVA 100 – 3n + 1', url: 'https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=36' },
        { id: 'spoj-easy', name: 'SPOJ – EASYPROB', url: 'https://www.spoj.com/problems/EASYPROB/' }
      ]
    },
    {
      id: 'programare-dinamica',
      title: 'Programare Dinamică',
      problems: [
        { id: 'cf1399E1', name: 'CF 1399E1 – Weights Division (easy)', url: 'https://codeforces.com/problemset/problem/1399/E1' },
        { id: 'cf1399E2', name: 'CF 1399E2 – Weights Division (hard)', url: 'https://codeforces.com/problemset/problem/1399/E2' },
        { id: 'cf1108E2', name: 'CF 1108E2 – Array and Segments (Hard)', url: 'https://codeforces.com/problemset/problem/1108/E2' },
        { id: 'cf1462D',  name: 'CF 1462D – Divide and Summarize', url: 'https://codeforces.com/problemset/problem/1462/D' },
        { id: 'cf1446B',  name: 'CF 1446B – Catching Cheaters', url: 'https://codeforces.com/problemset/problem/1446/B' },
        { id: 'klv-dp1',  name: 'Kilonova – DP1', url: 'https://kilonova.ro/problems/dp1' },
        { id: 'klv-dp2',  name: 'Kilonova – DP2', url: 'https://kilonova.ro/problems/dp2' },
        { id: 'pbinfo-dp', name: 'pbinfo – Programare Dinamică', url: 'https://pbinfo.ro/probleme/programare-dinamica' },
        { id: 'pbinfo-knap', name: 'pbinfo – Knapsack', url: 'https://pbinfo.ro/probleme/knapsack' },
        { id: 'usaco-cowntagion', name: 'USACO – Cowntagion', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=1005' },
        { id: 'ia-dyn', name: 'infoarena – dynarray', url: 'https://infoarena.ro/problema/dynarray' },
        { id: 'atc-dp', name: 'AtCoder – DP Contest A', url: 'https://atcoder.jp/contests/dp/tasks/dp_a' },
        { id: 'uva-dp1', name: 'UVA 1003 – Infected Tree?', url: 'https://onlinejudge.org/external/10/1003.html' },
        { id: 'spoj-dp1', name: 'SPOJ – M3TILE', url: 'https://www.spoj.com/problems/M3TILE/' },
        { id: 'spoj-dp2', name: 'SPOJ – ADASTAIRS', url: 'https://www.spoj.com/problems/ADASTAIRS/' }
      ]
    },
    {
      id: 'grafuri',
      title: 'Grafuri',
      problems: [
        { id: 'cf1000E', name: 'CF 1000E – We Need More Bosses', url: 'https://codeforces.com/problemset/problem/1000/E' },
        { id: 'cf1325E', name: 'CF 1325E – Ehab’s REAL Number Theory Problem', url: 'https://codeforces.com/problemset/problem/1325/E' },
        { id: 'cf1009E', name: 'CF 1009E – Intercity Travelling', url: 'https://codeforces.com/problemset/problem/1009/E' },
        { id: 'cf1528C', name: 'CF 1528C – Trees of Tranquillity', url: 'https://codeforces.com/problemset/problem/1528/C' },
        { id: 'cf1446A', name: 'CF 1446A – Knapsack', url: 'https://codeforces.com/problemset/problem/1446/A' },
        { id: 'klv-graph1', name: 'Kilonova – Graphs 1', url: 'https://kilonova.ro/problems/graph1' },
        { id: 'klv-graph2', name: 'Kilonova – Graphs 2', url: 'https://kilonova.ro/problems/graph2' },
        { id: 'pbinfo-graph', name: 'pbinfo – Grafuri', url: 'https://pbinfo.ro/probleme/grafuri' },
        { id: 'usaco-graph', name: 'USACO – Censoring', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=998' },
        { id: 'ia-punti', name: 'infoarena – punti', url: 'https://infoarena.ro/problema/punti' },
        { id: 'atc-graph', name: 'AtCoder – Graph 2', url: 'https://atcoder.jp/contests/abc204/tasks/abc204_d' },
        { id: 'uva-graph1', name: 'UVA 119 – Greedy Gift Givers', url: 'https://onlinejudge.org/external/1/119.html' },
        { id: 'spoj-graph1', name: 'SPOJ – BUGLIFE', url: 'https://www.spoj.com/problems/BUGLIFE/' },
        { id: 'spoj-graph2', name: 'SPOJ – PT07Y', url: 'https://www.spoj.com/problems/PT07Y/' },
        { id: 'spoj-graph3', name: 'SPOJ – PFDEP', url: 'https://www.spoj.com/problems/PFDEP/' }
      ]
    },
    {
      id: 'combinatorica-si-nt',
      title: 'Teoria Numerelor și Combinatorică',
      problems: [
        { id: 'cf914C', name: 'CF 914C – Travelling Salesman & Special Numbers', url: 'https://codeforces.com/problemset/problem/914/C' },
        { id: 'cf235A', name: 'CF 235A – LCM Challenge', url: 'https://codeforces.com/problemset/problem/235/A' },
        { id: 'cf622C', name: 'CF 622C – Not Equal on a Segment', url: 'https://codeforces.com/problemset/problem/622/C' },
        { id: 'cf1618E', name: 'CF 1618E – Singers’ Tour', url: 'https://codeforces.com/problemset/problem/1618/E' },
        { id: 'cf1538F', name: 'CF 1538F – Interesting Function', url: 'https://codeforces.com/problemset/problem/1538/F' },
        { id: 'klv-combi1', name: 'Kilonova – Combi 1', url: 'https://kilonova.ro/problems/combi1' },
        { id: 'klv-combi2', name: 'Kilonova – Combi 2', url: 'https://kilonova.ro/problems/combi2' },
        { id: 'pbinfo-comb', name: 'pbinfo – Combinatorică', url: 'https://pbinfo.ro/probleme/combinatorica' },
        { id: 'usaco-nt', name: 'USACO – Prime Factors', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=862' },
        { id: 'ia-crt', name: 'infoarena – crt', url: 'https://infoarena.ro/problema/crt' },
        { id: 'atc-math', name: 'AtCoder – Math Contest A', url: 'https://atcoder.jp/contests/abc198/tasks/abc198_a' },
        { id: 'uva-math1', name: 'UVA 10738 – Riemann vs Mertens', url: 'https://onlinejudge.org/external/107/10738.html' },
        { id: 'spoj-nt1', name: 'SPOJ – DIVFACT', url: 'https://www.spoj.com/problems/DIVFACT/' },
        { id: 'spoj-nt2', name: 'SPOJ – CRYPTO1', url: 'https://www.spoj.com/problems/CRYPTO1/' },
        { id: 'spoj-nt3', name: 'SPOJ – CAB', url: 'https://www.spoj.com/problems/CAB/' }
      ]
    },
    {
      id: 'structuri-avansate',
      title: 'Structuri de Date Avansate',
      problems: [
        { id: 'cf276B', name: 'CF 276B – Little Girl and Maximum XOR', url: 'https://codeforces.com/problemset/problem/276/B' },
        { id: 'cf1736D', name: 'CF 1736D – Permutation Game', url: 'https://codeforces.com/problemset/problem/1736/D' },
        { id: 'cf1353D', name: 'CF 1353D – Constructing the Array', url: 'https://codeforces.com/problemset/problem/1353/D' },
        { id: 'cf1175E', name: 'CF 1175E – Minimal Diameter Forest', url: 'https://codeforces.com/problemset/problem/1175/E' },
        { id: 'cf1636D', name: 'CF 1636D – Branch and Bound', url: 'https://codeforces.com/problemset/problem/1636/D' },
        { id: 'klv-ds1', name: 'Kilonova – DS 1', url: 'https://kilonova.ro/problems/ds1' },
        { id: 'klv-ds2', name: 'Kilonova – DS 2', url: 'https://kilonova.ro/problems/ds2' },
        { id: 'pbinfo-ds', name: 'pbinfo – Structuri de Date', url: 'https://pbinfo.ro/probleme/structuri-date' },
        { id: 'usaco-dsu', name: 'USACO – Agrinet', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=380' },
        { id: 'ia-fft', name: 'infoarena – fft', url: 'https://infoarena.ro/problema/fft' },
        { id: 'atc-dsu', name: 'AtCoder – DSU Tasks', url: 'https://atcoder.jp/contests/abc202/tasks/abc202_d' },
        { id: 'spoj-fq', name: 'SPOJ – FREQUENT', url: 'https://www.spoj.com/problems/FREQUENT/' },
        { id: 'spoj-cand', name: 'SPOJ – CANDY', url: 'https://www.spoj.com/problems/CANDY/' },
        { id: 'spoj-lites', name: 'SPOJ – LITE', url: 'https://www.spoj.com/problems/LITE/' },
        { id: 'spoj-gss', name: 'SPOJ – GSS1', url: 'https://www.spoj.com/problems/GSS1/' }
      ]
    },
    {
      id: 'geometrie',
      title: 'Geometrie Computațională',
      problems: [
        { id: 'cf166B', name: 'CF 166B – Polygons', url: 'https://codeforces.com/problemset/problem/166/B' },
        { id: 'cf148D', name: 'CF 148D – Bag of mice', url: 'https://codeforces.com/problemset/problem/148/D' },
        { id: 'cf687A', name: 'CF 687A – NP-Hard Problem', url: 'https://codeforces.com/problemset/problem/687/A' },
        { id: 'cf148C', name: 'CF 148C – Wishing Snake', url: 'https://codeforces.com/problemset/problem/148/C' },
        { id: 'cf617B', name: 'CF 617B – Chocolate', url: 'https://codeforces.com/problemset/problem/617/B' },
        { id: 'klv-geo1', name: 'Kilonova – Geometry 1', url: 'https://kilonova.ro/problems/geo1' },
        { id: 'klv-geo2', name: 'Kilonova – Geometry 2', url: 'https://kilonova.ro/problems/geo2' },
        { id: 'pbinfo-geo', name: 'pbinfo – Geometrie', url: 'https://pbinfo.ro/probleme/geometrie' },
        { id: 'usaco-fence', name: 'USACO – Fence Rails', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=262' },
        { id: 'ia-polygon', name: 'infoarena – poligoane', url: 'https://infoarena.ro/problema/poligoane' },
        { id: 'atc-geo', name: 'AtCoder – Geometry Contest A', url: 'https://atcoder.jp/contests/abc129/tasks/abc129_c' },
        { id: 'spoj-ciuri', name: 'SPOJ – CIURI', url: 'https://www.spoj.com/problems/CIURI/' },
        { id: 'spoj-laser', name: 'SPOJ – LASER', url: 'https://www.spoj.com/problems/LASER/' },
        { id: 'spoj-broom', name: 'SPOJ – BROOM', url: 'https://www.spoj.com/problems/BROOM/' },
        { id: 'uva-geo2', name: 'UVA 681 – Convex Hull Finding', url: 'https://onlinejudge.org/external/6/681.html' }
      ]
    },
    {
      id: 'greedy',
      title: 'Algoritmi Greedy și Euristici',
      problems: [
        { id: 'cf1631D', name: 'CF 1631D – MinimizE', url: 'https://codeforces.com/problemset/problem/1631/D' },
        { id: 'cf1638C', name: 'CF 1638C – Inversion Graph', url: 'https://codeforces.com/problemset/problem/1638/C' },
        { id: 'cf1473B', name: 'CF 1473B – String LCM', url: 'https://codeforces.com/problemset/problem/1473/B' },
        { id: 'cf902C',  name: 'CF 902C – Hashing Trees', url: 'https://codeforces.com/problemset/problem/902/C' },
        { id: 'cf1593D', name: 'CF 1593D – Half of Same', url: 'https://codeforces.com/problemset/problem/1593/D' },
        { id: 'klv-greedy1', name: 'Kilonova – Greedy 1', url: 'https://kilonova.ro/problems/greedy1' },
        { id: 'klv-greedy2', name: 'Kilonova – Greedy 2', url: 'https://kilonova.ro/problems/greedy2' },
        { id: 'pbinfo-greedy', name: 'pbinfo – Greedy', url: 'https://pbinfo.ro/probleme/greedy' },
        { id: 'usaco-greedy', name: 'USACO – Marathon', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=495' },
        { id: 'ia-greedy', name: 'infoarena – greedy', url: 'https://infoarena.ro/problema/greedy' },
        { id: 'atc-greedy', name: 'AtCoder – Greedy Contest A', url: 'https://atcoder.jp/contests/abc103/tasks/abc103_b' },
        { id: 'spoj-grly', name: 'SPOJ – GRLY', url: 'https://www.spoj.com/problems/GRLY/' },
        { id: 'spoj-rail', name: 'SPOJ – RAIL', url: 'https://www.spoj.com/problems/RAIL/' },
        { id: 'uva-greedy', name: 'UVA 10610 – Gopher II', url: 'https://onlinejudge.org/external/106/10610.html' },
        { id: 'uva-slice', name: 'UVA 11900 – Boiled Eggs', url: 'https://onlinejudge.org/external/119/11900.html' }
      ]
    },
    {
      id: 'alte-teme',
      title: 'Alte Teme (Strings, FFT, Arbori etc.)',
      problems: [
        { id: 'cf1768C',  name: 'CF 1768C – Element Extermination', url: 'https://codeforces.com/problemset/problem/1768/C' },
        { id: 'cf1675G',  name: 'CF 1675G – White-Black Balanced Subtrees', url: 'https://codeforces.com/problemset/problem/1675/G' },
        { id: 'cf1733D',  name: 'CF 1733D – Zero-One (Tree DP)', url: 'https://codeforces.com/problemset/problem/1733/D' },
        { id: 'cf1760E',  name: 'CF 1760E – Binary Inversions', url: 'https://codeforces.com/problemset/problem/1760/E' },
        { id: 'cf1446C',  name: 'CF 1446C – Xor Tree', url: 'https://codeforces.com/problemset/problem/1446/C' },
        { id: 'klv-strings1', name: 'Kilonova – Strings 1', url: 'https://kilonova.ro/problems/strings1' },
        { id: 'klv-strings2', name: 'Kilonova – Strings 2', url: 'https://kilonova.ro/problems/strings2' },
        { id: 'pbinfo-fft', name: 'pbinfo – FFT', url: 'https://pbinfo.ro/probleme/fft' },
        { id: 'pbinfo-trie', name: 'pbinfo – Trie', url: 'https://pbinfo.ro/probleme/trie' },
        { id: 'usaco-suffix', name: 'USACO – Suffix Snowflake', url: 'http://usaco.org/index.php?page=viewproblem2&cpid=1054' },
        { id: 'ia-lca', name: 'infoarena – lca', url: 'https://infoarena.ro/problema/lca' },
        { id: 'atc-fft', name: 'AtCoder – FFT Contest A', url: 'https://atcoder.jp/contests/agc009/tasks/agc009_a' },
        { id: 'spoj-suffix', name: 'SPOJ – SARRAY', url: 'https://www.spoj.com/problems/SARRAY/' },
        { id: 'spoj-mos', name: 'SPOJ – DQUERY', url: 'https://www.spoj.com/problems/DQUERY/' },
        { id: 'uva-strings', name: 'UVA 11475 – Extend to Palindrome', url: 'https://onlinejudge.org/external/114/11475.html' }
      ]
    }
  ];
  
  // ==== 2. Generare meniuri & evenimente ====
const menu = document.getElementById('chapters-menu');
chapters.forEach(ch => {
  const chapDiv = document.createElement('div');
  chapDiv.classList.add('chapter');

  // titlul capitolului
  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = ch.title;
  chapDiv.appendChild(title);

  // sub‐meniul cu Teorie deasupra Practică
  const submenu = document.createElement('div');
  submenu.classList.add('submenu');

  // 1) Teorie
  const aTheory = document.createElement('a');
  aTheory.href = '#';
  aTheory.textContent = 'Teorie';
  aTheory.addEventListener('click', e => {
    e.preventDefault();
    showTheory(ch);
  });
  submenu.appendChild(aTheory);

  // 2) Practică
  const aPractice = document.createElement('a');
  aPractice.href = '#';
  aPractice.textContent = 'Practică';
  aPractice.addEventListener('click', e => {
    e.preventDefault();
    showPractice(ch);
  });
  submenu.appendChild(aPractice);

  // toggle vizibilitate sub‐meniu la click pe titlu
  title.addEventListener('click', () => {
    submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
  });

  chapDiv.appendChild(submenu);
  menu.appendChild(chapDiv);
});

// ==== 3. Toggle sidebar & overlay ====
function toggleSidebar() {
  const sb  = document.getElementById('sidebar');
  const ov  = document.getElementById('overlay');
  const wr  = document.getElementById('wrapper');
  const btn = document.querySelector('.menu-toggle');

  sb.classList.toggle('active');
  ov.classList.toggle('active');
  wr.classList.toggle('shift');
  btn.classList.toggle('shift');
}

// click pe overlay => închide meniul
document.getElementById('overlay').addEventListener('click', toggleSidebar);

// ==== 4. Funcții de afișare în main ====
const pageTitle = document.getElementById('page-title');
const content   = document.getElementById('content');

async function showTheory(chapter) {
  pageTitle.textContent = `Teorie – ${chapter.title}`;
  try {
    // 1) Fetch fișierul .md după chapter.id
    const res = await fetch(`./content/${chapter.id}.md`);
    if (!res.ok) {
      throw new Error(`Fișierul Markdown nu a fost găsit: ./content/${chapter.id}.md`);
    }
    const md = await res.text();

    // 2) Parsează Markdown în HTML și injectează
    content.innerHTML = `
      <div class="theory-section">
        ${marked(md)}
      </div>
    `;
  } catch (err) {
    console.error(err);
    content.innerHTML = `
      <div class="theory-section error">
        <p>Ne pare rău, nu am putut încărca conținutul de teorie.</p>
      </div>
    `;
  }
}

function showPractice(chapter) {
  pageTitle.textContent = `Practică – ${chapter.title}`;
  content.innerHTML     = '';

  const ul = document.createElement('ul');
  chapter.problems.forEach(p => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href        = p.url;
    a.textContent = p.name;
    a.target      = '_blank';

    // starea curentă din localStorage
    let status = localStorage.getItem(p.id) || 'none';
    a.setAttribute('data-status', status);

    // click cyclic: none → partial → max → none
    a.addEventListener('click', e => {
      e.preventDefault();
      const next = status === 'none'
        ? 'partial'
        : status === 'partial'
        ? 'max'
        : 'none';
      localStorage.setItem(p.id, next);
      status = next;
      a.setAttribute('data-status', status);
      window.open(p.url, '_blank');
    });

    li.appendChild(a);
    ul.appendChild(li);
  });
  content.appendChild(ul);
}

// ==== 5. Inițial: Home ====
pageTitle.textContent = 'Bine ai venit la EduOlymp!';
content.innerHTML     = '<p>Selectează un capitol și o secțiune din meniul din stânga.</p>';

// 6. Buton Home: revine la ecranul inițial
document.getElementById('home-button').addEventListener('click', showHome);

function showHome() {
  // Închide meniul dacă e deschis
  const sb  = document.getElementById('sidebar');
  const ov  = document.getElementById('overlay');
  const wr  = document.getElementById('wrapper');
  const btn = document.querySelector('.menu-toggle');
  sb.classList.remove('active');
  ov.classList.remove('active');
  wr.classList.remove('shift');
  btn.classList.remove('shift');

  // Setează titlul și conținutul Home
  const pageTitle = document.getElementById('page-title');
  const content   = document.getElementById('content');
  pageTitle.textContent = 'Bine ai venit la EduOlymp!';
  content.innerHTML = '<p>Selectează un capitol și o secțiune din meniul din stânga.</p>';
}
