---
title: "Aliran Fluida Dalam Bidang Penampang Pipa (Penyelesaian Numerikal Finite Difference 2 Dimensi dari Persamaan Navier-Stokes)"
desc: "Analisis numerik dari persamaan Navier-Stokes pada kasus aliran dalam Pipa dengan metode Finite Difference 2 dimensi"
tags: "Computational Physics"
coverImage: "/Aliran%20Fluida%20Dalam%20Bidang%20Penampang%20Pipa/cover.png"
date: "2023-06-24"
author:
  name: Jhagas Hana Winaya
ogImage:
  url: "/Aliran%20Fluida%20Dalam%20Bidang%20Penampang%20Pipa/cover.png"
---

Persamaan Navier-Stokes adalah seperangkat persamaan yang menggambarkan bagaimana fluida bergerak. Persamaan Navier-Stokes secara matematis mengungkapkan keseimbangan momentum dan konservasi massa untuk fluida serta hubungan antara kecepatan, tekanan, densitas, dan suhu fluida. Persamaan ini digunakan dalam berbagai bidang untuk memprediksi perilaku fluida.

Persamaan momentum untuk mencari kecepatan $\vec v$ dapat ditulis sebagai

$$
\begin{align}
\frac{\partial \vec{v}}{\partial t}+(\vec{v}\cdot\nabla)\vec{v}=-\frac{1}{\rho}\nabla p + \nu \nabla^2\vec{v}
\end{align}
$$

Karena kita akan menyelesaikan persamaan Navier-Stokes untuk 2 dimensi maka persamaan di atas merepresentasikan 2 persamaan skalar untuk setiap komponen momentum dengan kecepatan $v_x$ dan $v_y$. Khusus untuk $v_x$, ditambahkan satu suku $F$ yang mempresentasikan sumber aliran fluida. Sehingga persamaan 1 dapat dijadikan 3 persamaan

$$
\begin{align}
\frac{\partial v_x}{\partial t}+v_x\frac{\partial v_x}{\partial x}+v_y\frac{\partial v_x}{\partial y}=-\frac{1}{\rho}\frac{\partial p}{\partial x}+\nu\left(\frac{\partial^2 v_x}{\partial x^2}+\frac{\partial^2 v_x}{\partial y^2}\right)+F\\

\frac{\partial v_y}{\partial t}+v_x\frac{\partial v_y}{\partial x}+v_y\frac{\partial v_y}{\partial y}=-\frac{1}{\rho}\frac{\partial p}{\partial y}+\nu\left(\frac{\partial^2 v_y}{\partial x^2}+\frac{\partial^2 v_y}{\partial y^2}\right)\\

\frac{\partial^2 p}{\partial x^2}+\frac{\partial^2 p}{\partial y^2}=-\rho\left(\frac{\partial v_x}{\partial x}\frac{\partial v_x}{\partial x}+2\frac{\partial v_x}{\partial y}\frac{\partial v_y}{\partial x}+\frac{\partial v_y}{\partial y}\frac{\partial v_y}{\partial y}\right)
\end{align}
$$

Persamaan 2 dan 3 masing-masing adalah untuk komponen momentum dengan kecepatan $v_x$ dan $v_y$ dan persamaan 4 adalah untuk tekanan ($p$) dari persamaan kontinuitas dan persamaan poisson.

## Diskretisasi Persamaan Diferensial Parsial

Dilakukan diskretisasi pada persamaan 2, 3 dan 4. Untuk mempermudah penulisan, maka $v_x$ diganti dengan $u$ dan $v_y$ diganti dengan $v$. Untuk persamaan momentum $u$ dan $v$, diskretisasi dilakukan dengan metode _backward_ pada semua suku turunan terhadap ruang $(\partial x$ dan $\partial y)$, khusus pada turunan terhadap waktu, dilakukan metode forward. Sedangkan pada semua suku di ruas kanan dilakukan metode _center_. Sehingga persamaan momentum $u$ menjadi

$$
\begin{align}
\frac{u_{i,j}^{n+1}-u_{i,j}^{n}}{\Delta t}+u_{i,j}^{n}\frac{u_{i,j}^{n}-u_{i-1,j}^{n}}{\Delta x}+v_{i,j}^{n}\frac{u_{i,j}^{n}-u_{i,j-1}^{n}}{\Delta y} = -\frac{1}{\rho}\frac{p_{i+1,j}^{n}-p_{i-1,j}^{n}}{2\Delta x} +\nu\left(\frac{u_{i+1,j}^{n}-2u_{i,j}^{n}+u_{i-1,j}^{n}}{\Delta x^2}+\frac{u_{i,j+1}^{n}-2u_{i,j}^{n}+u_{i,j-1}^{n}}{\Delta y^2}\right)+F_{i,j}
\end{align}
$$

Untuk persamaan momentum $v$, diskretisasi menghasilkan persamaan

$$
\begin{align}
\frac{v_{i,j}^{n+1}-v_{i,j}^{n}}{\Delta t}+u_{i,j}^{n}\frac{v_{i,j}^{n}-v_{i-1,j}^{n}}{\Delta x}+v_{i,j}^{n}\frac{v_{i,j}^{n}-v_{i,j-1}^{n}}{\Delta y} =
-\frac{1}{\rho}\frac{p_{i,j+1}^{n}-p_{i,j-1}^{n}}{2\Delta y} +\nu\left(\frac{v_{i+1,j}^{n}-2v_{i,j}^{n}+v_{i-1,j}^{n}}{\Delta x^2}+\frac{v_{i,j+1}^{n}-2v_{i,j}^{n}+v_{i,j-1}^{n}}{\Delta y^2}\right)
\end{align}
$$

Untuk persamaan tekanan-Poisson $p$, diskretisasi dilakukan dengan metode center dan menghasilkan persamaan

$$
\begin{align}
\frac{p_{i+1,j}^{n}-2p_{i,j}^{n}+p_{i-1,j}^{n}}{\Delta x^2} + \frac{p_{i,j+1}^{n}-2p_{i,j}^{n}+p_{i,j-1}^{n}}{\Delta y^2} =\rho\left[\frac{1}{\Delta t}\left(\frac{u_{i+1,j}-u_{i-1,j}}{2\Delta x}+\frac{v_{i,j+1}-v_{i,j-1}}{2\Delta y}\right) - \frac{u_{i+1,j}-u_{i-1,j}}{2\Delta x}\frac{u_{i+1,j}-u_{i-1,j}}{2\Delta x} - 2\frac{u_{i,j+1}-u_{i,j-1}}{2\Delta y}\frac{v_{i+1,j}-v_{i-1,j}}{2\Delta x} - \frac{v_{i,j+1}-v_{i,j-1}}{2\Delta y}\frac{v_{i,j+1}-v_{i,j-1}}{2\Delta y}\right]
\end{align}
$$

Langkah selanjutnya adalah merapikan persamaan untuk mendapat persamaan dari apa yang kita cari. Di sini kita akan mencari  $u_{i,j}^{n+1}$ , $v_{i,j}^{n+1}$ dan $p_{i,j}^{n}$. Sehingga ketiga persamaan tersebut menjadi

$$
\begin{align}
u_{i,j}^{n+1} = u_{i,j}^{n} - u_{i,j}^{n} \frac{\Delta t}{\Delta x} \left(u_{i,j}^{n}-u_{i-1,j}^{n}\right) - v_{i,j}^{n} \frac{\Delta t}{\Delta y} \left(u_{i,j}^{n}-u_{i,j-1}^{n}\right) - \frac{\Delta t}{\rho 2\Delta x} \left(p_{i+1,j}^{n}-p_{i-1,j}^{n}\right) + \nu\left[\frac{\Delta t}{\Delta x^2} \left(u_{i+1,j}^{n}-2u_{i,j}^{n}+u_{i-1,j}^{n}\right) + \frac{\Delta t}{\Delta y^2} \left(u_{i,j+1}^{n}-2u_{i,j}^{n}+u_{i,j-1}^{n}\right)\right] + \Delta t F
\end{align}
$$

$$
\begin{align}
v_{i,j}^{n+1} = v_{i,j}^{n} - u_{i,j}^{n} \frac{\Delta t}{\Delta x} \left(v_{i,j}^{n}-v_{i-1,j}^{n}\right) - v_{i,j}^{n} \frac{\Delta t}{\Delta y} \left(v_{i,j}^{n}-v_{i,j-1}^{n}\right) - \frac{\Delta t}{\rho 2\Delta y} \left(p_{i,j+1}^{n}-p_{i,j-1}^{n}\right) + \nu\left[\frac{\Delta t}{\Delta x^2} \left(v_{i+1,j}^{n}-2v_{i,j}^{n}+v_{i-1,j}^{n}\right) + \frac{\Delta t}{\Delta y^2} \left(v_{i,j+1}^{n}-2v_{i,j}^{n}+v_{i,j-1}^{n}\right)\right]
\end{align}
$$

$$
\begin{align}
p_{i,j}^{n} = \frac{\left(p_{i+1,j}^{n}+p_{i-1,j}^{n}\right) \Delta y^2 + \left(p_{i,j+1}^{n}+p_{i,j-1}^{n}\right) \Delta x^2}{2(\Delta x^2+\Delta y^2)} -\frac{\rho\Delta x^2\Delta y^2}{2\left(\Delta x^2+\Delta y^2\right)} \times \left[\frac{1}{\Delta t}\left(\frac{u_{i+1,j}-u_{i-1,j}}{2\Delta x}+\frac{v_{i,j+1}-v_{i,j-1}}{2\Delta y}\right) - \left(\frac{u_{i+1,j}-u_{i-1,j}}{2\Delta x}\right)^2 - 2\frac{u_{i,j+1}-u_{i,j-1}}{2\Delta y}\frac{v_{i+1,j}-v_{i-1,j}}{2\Delta x} - \left(\frac{v_{i,j+1}-v_{i,j-1}}{2\Delta y}\right)^2\right]
\end{align}
$$

Dari Persamaan 10, dimisalkan bahwa

$$
\begin{align}
b =\rho\left[\frac{1}{\Delta t}\left(\frac{u_{i+1,j}-u_{i-1,j}}{2\Delta x}+\frac{v_{i,j+1}-v_{i,j-1}}{2\Delta y}\right) - \left(\frac{u_{i+1,j}-u_{i-1,j}}{2\Delta x}\right)^2 - 2\frac{u_{i,j+1}-u_{i,j-1}}{2\Delta y}\frac{v_{i+1,j}-v_{i-1,j}}{2\Delta x} - \left(\frac{v_{i,j+1}-v_{i,j-1}}{2\Delta y}\right)^2\right]
\end{align}
$$

Sehingga

$$
\begin{align}
p^n_{i,j} = \frac{\left(p_{i+1,j}^{n}+p_{i-1,j}^{n}\right) \Delta y^2 + \left(p_{i,j+1}^{n}+p_{i,j-1}^{n}\right) \Delta x^2}{2(\Delta x^2+\Delta y^2)} -\frac{b\Delta x^2\Delta y^2}{2\left(\Delta x^2+\Delta y^2\right)}
\end{align}
$$

## Penentuan Kondisi Awal dan Kondisi Batas

Kondisi awal ditentukan pada semua titik $u,v,p =0$. Dan ruang ditentukan pada Dengan $0\leq x \leq2$ dan $0 \leq y \leq 2$. Untuk kondisi batas ditentukan sebagai berikut :

- $u,v = 0$ pada $y = 0;2$
- $\frac{\partial p}{\partial y} = 0$ pada $y = 0;2$

Serta nilai dari $F=1$ di semua titik ruang. $\rho=1;\  \nu=0,1;\ \ dt=0.01$

## Implementasi dalam Python

Yang harus dilakukan di sini adalah membuat fungsi yang membuat dimensi ruang (box) yang akan diisi oleh aliran fluida. Digunakan persamaan Tekanan-Poisson yang telah didiskretisasi. Persamaan yang ada dalam fungsi ini diambil dari persamaan 11. Digunakan indeks `[i,j]`, di mana `i` merepresentasikan node pada sumbu `y`dan `j` merepresentasikan node pada sumbu `x`. Persamaan pada batas sumbu-x dihitung secara eksplisit

```python
import numpy as np

def build_up_b(rho, dt, dx, dy, u, v):
    b = np.zeros_like(u) ## Membuat matriks dengan ukuran yang sama dengan u

    ## b untuk semua titik kecuali titik pertama dan terakhir pada semua sumbu
    b[1:-1, 1:-1] = (rho * (1 / dt * ((u[1:-1, 2:] - u[1:-1, 0:-2]) / (2 * dx) +
                                      (v[2:, 1:-1] - v[0:-2, 1:-1]) / (2 * dy)) -
                            ((u[1:-1, 2:] - u[1:-1, 0:-2]) / (2 * dx))**2 -
                            2 * ((u[2:, 1:-1] - u[0:-2, 1:-1]) / (2 * dy) *
                                 (v[1:-1, 2:] - v[1:-1, 0:-2]) / (2 * dx))-
                            ((v[2:, 1:-1] - v[0:-2, 1:-1]) / (2 * dy))**2))

		## Untuk kondisi syarat batas, di kiri dan kanan pipa (inflow dan outflow)
    ## Khusus pada x = 2
    b[1:-1, -1] = (rho * (1 / dt * ((u[1:-1, 0] - u[1:-1,-2]) / (2 * dx) +
                                    (v[2:, -1] - v[0:-2, -1]) / (2 * dy)) -
                          ((u[1:-1, 0] - u[1:-1, -2]) / (2 * dx))**2 -
                          2 * ((u[2:, -1] - u[0:-2, -1]) / (2 * dy) *
                               (v[1:-1, 0] - v[1:-1, -2]) / (2 * dx)) -
                          ((v[2:, -1] - v[0:-2, -1]) / (2 * dy))**2))

    ## Khusus pada x = 0
    b[1:-1, 0] = (rho * (1 / dt * ((u[1:-1, 1] - u[1:-1, -1]) / (2 * dx) +
                                   (v[2:, 0] - v[0:-2, 0]) / (2 * dy)) -
                         ((u[1:-1, 1] - u[1:-1, -1]) / (2 * dx))**2 -
                         2 * ((u[2:, 0] - u[0:-2, 0]) / (2 * dy) *
                              (v[1:-1, 1] - v[1:-1, -1]) / (2 * dx))-
                         ((v[2:, 0] - v[0:-2, 0]) / (2 * dy))**2))

    return b
```

Selanjutnya adalah mengimplementasikan persamaan 12 pada semua titik, termasuk titik yang ada batas sumbu-x (batas kiri dan kanan) dan juga batas atas dan bawah. Perhatikan keberadaan `nit` yaitu variabel pseudo-time. Sub-iterasi dalam perhitungan Poisson ini membantu memastikan bidang bebas dari divergensi.

```python
import numpy as np

def pressure_poisson_periodic(p, b, dx, dy, nit):
    pn = np.empty_like(p) ## membuat matriks dengan ukuran dan tipe yang sama dengan p

    for q in range(nit):
        pn = p.copy() ## menduplikat segala isi dari p

        ## p untuk semua titik kecuali titik pertama dan terakhir pada semua sumbu
        p[1:-1, 1:-1] = (((pn[1:-1, 2:] + pn[1:-1, 0:-2]) * dy**2 +
                          (pn[2:, 1:-1] + pn[0:-2, 1:-1]) * dx**2) /
                         (2 * (dx**2 + dy**2)) -
                         dx**2 * dy**2 / (2 * (dx**2 + dy**2)) * b[1:-1, 1:-1])

        ## Khusus pada x = 2
        p[1:-1, -1] = (((pn[1:-1, 0] + pn[1:-1, -2])* dy**2 +
                        (pn[2:, -1] + pn[0:-2, -1]) * dx**2) /
                       (2 * (dx**2 + dy**2)) -
                       dx**2 * dy**2 / (2 * (dx**2 + dy**2)) * b[1:-1, -1])

        ## Khusus pada x = 0
        p[1:-1, 0] = (((pn[1:-1, 1] + pn[1:-1, -1])* dy**2 +
                       (pn[2:, 0] + pn[0:-2, 0]) * dx**2) /
                      (2 * (dx**2 + dy**2)) -
                      dx**2 * dy**2 / (2 * (dx**2 + dy**2)) * b[1:-1, 0])

        ## Kondisi batas pada pinggir atas dan bawah pipa
        p[-1, :] =p[-2, :]  # dp/dy = 0 pada y = 2
        p[0, :] = p[1, :]  # dp/dy = 0 pada y = 0

    return p
```

Deklarasi Variabel dilakukan

```python
nx, ny = 41, 41
nt = 10
nit = 50 ## Variabel pseudo-time
c = 1
dx = 2 / (nx - 1)
dy = 2 / (ny - 1)
x = numpy.linspace(0, 2, nx)
y = numpy.linspace(0, 2, ny)
X, Y = numpy.meshgrid(x, y)

## Variabel Fisis
rho = 1
nu = 0.1
F = 1
dt = 0.01

## Kondisi Mula-Mula
u = numpy.zeros((ny, nx))
un = numpy.zeros((ny, nx))

v = numpy.zeros((ny, nx))
vn = numpy.zeros((ny, nx))

p = numpy.ones((ny, nx))
pn = numpy.ones((ny, nx))

b = numpy.zeros((ny, nx))

udiff = 1
```

Loop Utama, menghitung $u$ dan $v$ dari persamaan 8 dan 9 yang ada di atas

```python
while udiff > .001:
    un = u.copy()
    vn = v.copy()

    b = build_up_b(rho, dt, dx, dy, u, v)
    p = pressure_poisson_periodic(p, b, dx, dy, nit)

    u[1:-1, 1:-1] = (un[1:-1, 1:-1] -
                     un[1:-1, 1:-1] * dt / dx *
                    (un[1:-1, 1:-1] - un[1:-1, 0:-2]) -
                     vn[1:-1, 1:-1] * dt / dy *
                    (un[1:-1, 1:-1] - un[0:-2, 1:-1]) -
                     dt / (2 * rho * dx) *
                    (p[1:-1, 2:] - p[1:-1, 0:-2]) +
                     nu * (dt / dx**2 *
                    (un[1:-1, 2:] - 2 * un[1:-1, 1:-1] + un[1:-1, 0:-2]) +
                     dt / dy**2 *
                    (un[2:, 1:-1] - 2 * un[1:-1, 1:-1] + un[0:-2, 1:-1])) +
                     F * dt)

    v[1:-1, 1:-1] = (vn[1:-1, 1:-1] -
                     un[1:-1, 1:-1] * dt / dx *
                    (vn[1:-1, 1:-1] - vn[1:-1, 0:-2]) -
                     vn[1:-1, 1:-1] * dt / dy *
                    (vn[1:-1, 1:-1] - vn[0:-2, 1:-1]) -
                     dt / (2 * rho * dy) *
                    (p[2:, 1:-1] - p[0:-2, 1:-1]) +
                     nu * (dt / dx**2 *
                    (vn[1:-1, 2:] - 2 * vn[1:-1, 1:-1] + vn[1:-1, 0:-2]) +
                     dt / dy**2 *
                    (vn[2:, 1:-1] - 2 * vn[1:-1, 1:-1] + vn[0:-2, 1:-1])))

    # Menghitung u, Khusus pada x = 2
    u[1:-1, -1] = (un[1:-1, -1] - un[1:-1, -1] * dt / dx *
                  (un[1:-1, -1] - un[1:-1, -2]) -
                   vn[1:-1, -1] * dt / dy *
                  (un[1:-1, -1] - un[0:-2, -1]) -
                   dt / (2 * rho * dx) *
                  (p[1:-1, 0] - p[1:-1, -2]) +
                   nu * (dt / dx**2 *
                  (un[1:-1, 0] - 2 * un[1:-1,-1] + un[1:-1, -2]) +
                   dt / dy**2 *
                  (un[2:, -1] - 2 * un[1:-1, -1] + un[0:-2, -1])) + F * dt)

    # Menghitung u, Khusus pada x = 0
    u[1:-1, 0] = (un[1:-1, 0] - un[1:-1, 0] * dt / dx *
                 (un[1:-1, 0] - un[1:-1, -1]) -
                  vn[1:-1, 0] * dt / dy *
                 (un[1:-1, 0] - un[0:-2, 0]) -
                  dt / (2 * rho * dx) *
                 (p[1:-1, 1] - p[1:-1, -1]) +
                  nu * (dt / dx**2 *
                 (un[1:-1, 1] - 2 * un[1:-1, 0] + un[1:-1, -1]) +
                  dt / dy**2 *
                 (un[2:, 0] - 2 * un[1:-1, 0] + un[0:-2, 0])) + F * dt)

    # Menghitung v, Khusus pada x = 2
    v[1:-1, -1] = (vn[1:-1, -1] - un[1:-1, -1] * dt / dx *
                  (vn[1:-1, -1] - vn[1:-1, -2]) -
                   vn[1:-1, -1] * dt / dy *
                  (vn[1:-1, -1] - vn[0:-2, -1]) -
                   dt / (2 * rho * dy) *
                  (p[2:, -1] - p[0:-2, -1]) +
                   nu * (dt / dx**2 *
                  (vn[1:-1, 0] - 2 * vn[1:-1, -1] + vn[1:-1, -2]) +
                   dt / dy**2 *
                  (vn[2:, -1] - 2 * vn[1:-1, -1] + vn[0:-2, -1])))

    # Menghitung v, Khusus pada x = 0
    v[1:-1, 0] = (vn[1:-1, 0] - un[1:-1, 0] * dt / dx *
                 (vn[1:-1, 0] - vn[1:-1, -1]) -
                  vn[1:-1, 0] * dt / dy *
                 (vn[1:-1, 0] - vn[0:-2, 0]) -
                  dt / (2 * rho * dy) *
                 (p[2:, 0] - p[0:-2, 0]) +
                  nu * (dt / dx**2 *
                 (vn[1:-1, 1] - 2 * vn[1:-1, 0] + vn[1:-1, -1]) +
                  dt / dy**2 *
                 (vn[2:, 0] - 2 * vn[1:-1, 0] + vn[0:-2, 0])))

    # Untuk batas atas dan batas bawah
    u[0, :] = 0
    u[-1, :] = 0
    v[0, :] = 0
    v[-1, :]=0

    udiff = (numpy.sum(u) - numpy.sum(un)) / numpy.sum(u)
```

Menampilkan Grafik

```python
fig = plt.figure(figsize = (11,7))
plt.quiver(X, Y, u, v)
plt.show()
```

## Hasil

![Figure_1.png](/Aliran%20Fluida%20Dalam%20Bidang%20Penampang%20Pipa/fig.png)

Plot grafik `quiver` di atas menggambarkan kecepatan aliran fluida di dalam pipa. Diketahui pada batas atas dan bawah kecepatan aliran cairan adalah 0, dikarenakan terdapat gaya gesek antara fluida dan juga pipa. Kecepatan aliran fluida meningkat semakin ke tengah pipa dikarenakan pengaruh dari gaya gesek pinggiran pipa semakin menurun. Hasil ini menggambarkan keadaan fisis yang real pada pipa yang dialiri fluida.
