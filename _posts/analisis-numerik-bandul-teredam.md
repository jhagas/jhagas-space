---
title: "Analisis Numerik Persamaan Diferensial Bandul Teredam"
desc: "Analisis dilakukan dengan metode Titik Tengah, Euler Termodifikasi, Runge-Kutta Orde 4, Adam-Bashforth Orde 4"
tags: "Computational Physics"
coverImage: "/Damped_Pendulum_files/cover.png"
date: "2023-04-23"
author:
  name: Jhagas Hana Winaya
ogImage:
  url: "/Damped_Pendulum_files/cover.png"
---

Gaya yang bekerja pada bandul adalah

1. Gaya Berat, diambil hanya bagian tangensial (tegak lurus dengan arah ayunan). Negatif karena arahnya selalu berkebalikan dengan arah geraknya

   $$
   \begin{align*}
   W_T = -mg \sin \theta
   \end{align*}
   $$

2. Gaya gesek udara, bergantung pada kecepatan sudut

   $$
   \begin{align*}
   F_D = -cL\dot\theta
   \end{align*}
   $$

3. Gaya Tegang Tali, yang saling menghilangkan dengan bagian normal pada gaya gravitasi

   $$
   \begin{align*}
   W_n-T=0
   \end{align*}
   $$

Sehingga total dari gayanya menurut Hukum Newton II adalah

$$
\begin{align*}
  \sum F_T &= ma \\
  -mg \sin \theta - cL\dot\theta &= ma \\
\end{align*}
$$

Karena digunakan $\theta$ sebagai variabel utama, dan $a = \ddot t$ (**CATATAN**: $\ddot t$ adalah percepatan pada sumbu tangensial dari gerak ayunan, selanjutnya $t$ akan didefinisikan sebagai waktu). Maka agar percepatan $a$ bisa menjadi percepatan sudut, harus dibagi $L$ yang merupakan panjang tali (radius ayunan)

$$
    \begin{align*}
a = L\frac{d^2\theta}{dt^2}
    \end{align*}
$$

Sehingga persamaan gaya menjadi

$$
    \begin{align*}
-mg \sin \theta - cL\frac{d\theta}{dt} = mL\frac{d^2\theta}{dt^2}
    \end{align*}
$$

yang dapat disusun ulang sebagai

$$
    \begin{align*}
\frac{d^2\theta}{dt^2} = -\frac{c}{m} \frac{d\theta}{dt} - \frac{g}{L} \sin \theta
    \end{align*}
$$

## Kondisi & Persoalan

Diketahui bahwa:

1. Koefisien redaman, $c = 0,16\ \text{N.s/m}$
2. Massa bandul, $m = 0,5\  \text{kg}$
3. Panjang tali, $L = 1,2\ \text{m}$
4. Percepatan gravitasi, $g = 9,81\  \text{m}/\text{s}^2$
5. Langkah waktu, $h=0,02$ dan _$h=0,001$_

**Kondisi awal** (pada $t=0$) adalah…

1. $\theta(0) = 90\degree = \frac{\pi}{2} \text{ rad}$
2. $\dot \theta(0) = 0 \text{ rad/s}$

Artinya bandul disimpangkan sebesar 90 derajat dan dilepaskan dari keadaan diam.

> CATATAN: Semakin kecil _timestep_ maka hasil aproksimasi akan semakin baik. Karena metode iterasi digunakan untuk menghitung pada keadaan pada waktu saat ini dari keadaan pada waktu sebelumnya

Carilah sudut bandul dalam fungsi waktu untuk **18 detik pertama!**

## Solusi

Untuk menyelesaikan Persamaan Diferensial Biasa (PDB) orde-2, bisa dianggap sebagai 2 persamaan PDB orde-1. Maka dimisalkan bahwa

$$
\begin{align*}
w=\frac{d\theta}{dt} \text{\ \ \ sehingga\ \ \ } \frac{dw}{dt} = -\frac{c}{m}w - \frac{g}{L} \sin \theta
\end{align*}
$$

> ⚠️ Sayangnya pada permasalahan ini, **tidak ada solusi eksak (dari metode analitik)** yang bisa dijadikan perbandingan galat dari metode numerik yang akan digunakan.

## Kode Python dan Analisis

Jadi konsep utama dari metode numerik adalah untuk menghitung nilai $y$ maka dibutuhkan nilai $y’$ dari iterasi sebelumnya yang dikalikan dengan $h$ atau _timestep_, dan untuk menghitung $y’$ maka dibutuhkan nilai $y’’$ dari iterasi sebelumnya yang juga dikalikan dengan $h$. $y’’$ merupakan hasil dari persamaan diferensial biasa dari persoalan di atas.

### Inisiasi Library Numpy dan Matplotlib Serta Mengatur Ukuran Grafik

```python
import numpy as np
import matplotlib.pyplot as plt
plt.rcParams["figure.figsize"] = (12,7)
```

### Inisiasi Tetapan dan Nilai Awal

```python
g = 9.81   # percepatan gravitasi (m/s^2)
L = 1.2    # panjang tali (m)
m = 0.5    # massa (kg)
c = 0.16   # koefisien redaman (N.s/m)
t0 = 0     # waktu awal (s)
tf = 18    # waktu akhir (s)
```

```python
theta0 = np.pi/2    # posisi awal (rad)
omega0 = 0          # kecepatan awal (rad/s)
```

### Inisiasi Fungsi Persamaan Diferensial Orde 2 Yang Akan Didekati Solusinya

Terdapat tiga masukan yaitu **_t_** (waktu), **_theta_** (nilai sudut simpangan) pada waktu tertentu, **_omega_** (kecepatan sudut) pada waktu tertentu.

```python
f = lambda t, theta, omega: -c/m * omega - g/L * np.sin(theta)
```

### Inisiasi Fungsi-fungsi Metode Numerik

Fungsi-fungsi ini menyelesaikan persamaan diferensial orde dua dari bentuk $y'' = f(t,\ y,\ y')$ dengan kondisi awal $y(0)$ = `y0` dan $y'(0)$ = `y_dot_0`. Semua fungsi-fungsi di bawah membutuhkan enam masukan:

- **`f{:.fn}`**: sebuah fungsi yang menghitung turunan $y'' = f(t, y, y')$ untuk nilai `t`, `y`, dan `y'` tertentu.
- **`y0`**: nilai awal $y$ pada $t=0$
- **`y_dot_0`**: nilai awal $y'$ pada $t=0$
- **`xmin`**: nilai minimum t untuk menyelesaikan persamaan diferensial
- **`xmax`**: nilai maksimum t untuk menyelesaikan persamaan diferensial
- **`h`**: ukuran langkah numerik

#### Metode Titik Tengah

Fungsi ini menghitung nilai `y` pada setiap titik pada interval yang diberikan dengan menggunakan metode Midpoint. Solusi numerik dari persamaan diferensial dihitung menggunakan rumus iteratif, dimulai dari nilai awal `y0` dan `y_dot_0` pada titik `xmin`. Nilai `y` dan `y'` pada setiap iterasi dihitung berdasarkan nilai-nilai pada iterasi sebelumnya. Setelah mencapai `xmax`, fungsi mengembalikan **Array NumPy** yang berisi nilai-nilai `y` pada setiap titik dalam interval yang diberikan.

```python
def MidPointODE(f, y0, y_dot_0, xmin, xmax, h):
  # by default xmax is not included, we add h to address this
  t = np.arange(xmin, xmax + h, h)
  N = len(t)
  y = np.zeros((N,2))
  y[0] = [y0, y_dot_0]

  for i in range(1, N):
    tm = t[i-1] + h/2
    ym = y[i-1] + h/2 * np.array([f(t[i-1], h * y[i-1, 0], y[i-1, 1]),
                                  f(t[i-1], h * y[i-1, 0], y[i-1, 1])])

    y[i] = y[i-1] + h * np.array([y[i-1, 1],
                                  f(tm, ym[0], ym[1])])

  return t, y

```

#### Metode Euler Termodifikasi (Metode Heun)

Fungsi ini menghitung nilai `y` pada setiap titik pada interval yang diberikan dengan menggunakan metode Modified Euler. Solusi numerik dari persamaan diferensial dihitung menggunakan rumus iteratif, dimulai dari nilai awal `y0` dan `y_dot_0` pada titik `xmin`. Nilai `y` dan `y'` pada setiap iterasi dihitung berdasarkan nilai-nilai pada iterasi sebelumnya. Setelah mencapai `xmax`, fungsi mengembalikan **Array NumPy** yang berisi nilai-nilai `y` pada setiap titik dalam interval yang diberikan.

```python
def ModEulerODE(f, y0, y_dot_0, xmin, xmax, h):
  # by default xmax is not included, we add h to address this
  t = np.arange(xmin, xmax + h, h)
  N = len(t)
  y = np.zeros((N,2))
  y[0] = [y0, y_dot_0]

  for i in range(1, N):
    slopeStart = np.array([y[i-1, 1],
                           f(t[i-1], y[i-1, 0], y[i-1, 1])])

    yk1 = y[i-1, 0] + h * slopeStart[0]
    yk2 =y[i-1, 1] + h * slopeStart[1]

    slopeEnd   = np.array([y[i-1, 1],
                           f(t[i], yk1, yk2)])

    y[i] = y[i-1] + h/2 * (slopeStart + slopeEnd)

  return t, y
```

#### Metode Runge-Kutta Orde 4

Algoritma fungsi:

1. Buat sebuah _array_ nilai t menggunakan fungsi `arange` dari NumPy, dimulai dari `xmin` dan berakhir di `xmax` dengan ukuran langkah sebesar `h`
2. Kemudian, inisialisasi sebuah matriks nol **`y`**, dengan bentuk **`(N, 2)` (N baris, 2 kolom)**, di mana **`N`** adalah panjang _array_ **`t`**
3. Baris pertama **`y`** diatur ke nilai awal **`y0`** dan **`y_dot_0`**, dan baris selanjutnya dihitung menggunakan metode Runge-Kutta orde keempat
4. Untuk setiap baris **`i`** (iterasi pengulangan _for_) dalam **`y`**, fungsi menghitung empat kemiringan **`k1`**, **`k2`**, **`k3`**, dan **`k4`** menggunakan nilai **`y`** sebelumnya dan fungsi turunan **`f`**
5. Kemiringan ini kemudian digabungkan menggunakan rata-rata berbobot untuk mendapatkan nilai baru **`y`** pada langkah waktu berikutnya
6. Bobot yang digunakan untuk rata-rata adalah 1/6, 1/3, 1/3, dan 1/6, sesuai dengan metode Runge-Kutta orde keempat. Akhirnya, fungsi mengembalikan _array_ **`t`** dan **`y`**

```python
def RungeKutta4(f, y0, y_dot_0, xmin, xmax, h):
  # by default xmax is not included, we add h to address this
  t = np.arange(xmin, xmax + h, h)
  N = len(t)
  y = np.zeros((N, 2))
  y[0] = [y0, y_dot_0]

  for i in range(1, N):
    k1 = h * np.array([y[i-1, 1], f(t[i-1], y[i-1, 0], y[i-1, 1])])
    k2 = h * np.array([y[i-1, 1] + k1[1]/2, f(t[i-1] + h/2, y[i-1, 0] + k1[0]/2, y[i-1, 1] + k1[1]/2)])
    k3 = h * np.array([y[i-1, 1] + k2[1]/2, f(t[i-1] + h/2, y[i-1, 0] + k2[0]/2, y[i-1, 1] + k2[1]/2)])
    k4 = h * np.array([y[i-1, 1] + k3[1], f(t[i-1] + h, y[i-1, 0] + k3[0], y[i-1, 1] + k3[1])])

    y[i] = y[i-1] + (k1 + 2*k2 + 2*k3 + k4) / 6

  return t, y
```

#### Metode Adam-Bashford Orde 4

Algoritma Fungsi:

1. `t`: merupakan array yang memuat nilai-nilai waktu pada setiap langkah waktu yang diperoleh dengan `np.arange()`
2. `N`: merupakan jumlah langkah waktu yang dilakukan
3. `y`: merupakan array yang memuat nilai-nilai y dan turunannya pada tiap langkah waktu, yang diinisialisasi dengan kondisi awal
4. `for i in range(1,4)`: merupakan loop for pertama yang digunakan untuk menghitung nilai-nilai `y` pada 4 langkah waktu pertama menggunakan metode Runge-Kutta Orde 4. Penjelasan dijabarkan pada fungsi Runge-Kutta Orde 4 di atas
5. `for i in range(4,N)`: merupakan loop for kedua yang digunakan untuk menghitung nilai-nilai `y` pada langkah waktu selanjutnya menggunakan metode Adams-Bashforth orde 4
6. `thm`: merupakan variabel yang digunakan untuk menghitung nilai `y` pada langkah waktu ke-`i+1`
7. `wm`: merupakan variabel yang digunakan untuk menghitung nilai turunan y pada langkah waktu ke-`i+1`
8. `return t, y`: mengembalikan nilai array t dan y sebagai hasil dari perhitungan pendekatan

```python
def AdamsBashforth4(f, y0, y_dot_0, xmin, xmax, h):
  # by default xmax is not included, we add h to address this
  t = np.arange(xmin, xmax + h, h)
  N = len(t)
  y = np.zeros((N, 2))
  y[0] = [y0, y_dot_0]

  for i in range(1, 4):
    k1 = h * np.array([y[i-1, 1], f(t[i-1], y[i-1, 0], y[i-1, 1])])
    k2 = h * np.array([y[i-1, 1] + k1[1]/2, f(t[i-1] + h/2, y[i-1, 0] + k1[0]/2, y[i-1, 1] + k1[1]/2)])
    k3 = h * np.array([y[i-1, 1] + k2[1]/2, f(t[i-1] + h/2, y[i-1, 0] + k2[0]/2, y[i-1, 1] + k2[1]/2)])
    k4 = h * np.array([y[i-1, 1] + k3[1], f(t[i-1] + h, y[i-1, 0] + k3[0], y[i-1, 1] + k3[1])])

    y[i] = y[i-1] + (k1 + 2*k2 + 2*k3 + k4) / 6

  for i in range(4,N):
    thm = 55 * y[i-1, 1] - 59 * y[i-2, 1] + 37 * y[i-3, 1] - 9 * y[i-4, 1]
    wm = 55 * f(t[i-1], y[i-1, 0], y[i-1, 1]) - 59 * f(t[i-2], y[i-2, 0], y[i-2, 1]) + 37 * f(t[i-3], y[i-3, 0], y[i-3, 1]) - 9 * f(t[i-4], y[i-4, 0], y[i-4, 1])
    y[i] =  y[i-1] + h/24 * np.array([thm, wm])

  return t, y
```

### Aproksimasi Hitungan dan Plot Grafik

Di mana `t` adalah array dari waktu dari detik ke-0 sampai detik ke-18. Sementara, `data[:,0]` (kolom ke-0) adalah array dari sudut simpangan dari detik ke-0 sampai detik ke-18. Dan kolom ke-1 dari `data` adalah array kecepatan sudut dari detik ke-0 sampai detik ke-18. Di mana `data` adalah hasil pendekatan dari beberapa metode

#### Digunakan Langkah Waktu 0.02

```python
h = 0.02   # langkah waktu

t, modEuler = ModEulerODE(f, theta0, omega0, t0, tf, h)
t, midPoint = MidPointODE(f, theta0, omega0, t0, tf, h)
t, rk4 = RungeKutta4(f, theta0, omega0, t0, tf, h)
t, ab4 = AdamsBashforth4(f, theta0, omega0, t0, tf, h)

plt.plot(t, midPoint[:,0], label="Midpoint Method")
plt.plot(t, modEuler[:,0], label="Modified Euler's Method")
plt.plot(t, rk4[:,0], label="4th Order Runge-Kutta Method")
plt.plot(t, ab4[:,0], label="4th Order Adam-Bashford Method")

plt.legend()
plt.title("Grafik Sudut Simpangan Terhadap Waktu Pada Bandul Matematis Teredam")
plt.xlabel("Waktu (s)")
plt.ylabel("Simpangan (rad)")
plt.show()
```

![png](/Damped_Pendulum_files/Damped_Pendulum_19_0.png)

#### Digunakan langkah waktu 0.001

```python
h = 0.001 # langkah waktu

t, modEuler = ModEulerODE(f, theta0, omega0, t0, tf, h)
t, midPoint = MidPointODE(f, theta0, omega0, t0, tf, h)
t, rk4 = RungeKutta4(f, theta0, omega0, t0, tf, h)
t, ab4 = AdamsBashforth4(f, theta0, omega0, t0, tf, h)

plt.plot(t, midPoint[:,0], label="Midpoint Method")
plt.plot(t, modEuler[:,0], label="Modified Euler's Method")
plt.plot(t, rk4[:,0], label="4th Order Runge-Kutta Method")
plt.plot(t, ab4[:,0], label="4th Order Adam-Bashford Method")

plt.legend()
plt.title("Grafik Sudut Simpangan Terhadap Waktu Pada Bandul Matematis Teredam")
plt.xlabel("Waktu (s)")
plt.ylabel("Simpangan (rad)")
plt.show()
```

![png](/Damped_Pendulum_files/Damped_Pendulum_21_0.png)

Bisa dilihat bahwa dengan langkah waktu yang lebih kecil, selisih dari keempat metode sangat kecil, dan grafik yang dihasilkan berhimpitan.
