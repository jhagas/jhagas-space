---
title: "Metode FDTD Gelombang Elektromagnetik (Additive Source dan TFSF) Penurunan Rumus dan Kode Python"
desc: "Implementasi simulasi Finite-Difference Time-Domain (FDTD) untuk gelombang elektomagnetik 1-dimensi dengan sumber tambahan dan TFSF. Metode FDTF banyak digunakan dalam bidang elektromagnetik, terutama dalam desain dan analisis antena"
tags: "Computational Physics"
coverImage: "/FDTD%20Gelombang%20EM%201%20Dimensi%206820ddbef44344b090c601449f81f063/cover.png"
date: "2023-05-27"
author:
  name: Jhagas Hana Winaya
ogImage:
  url: "/FDTD%20Gelombang%20EM%201%20Dimensi%206820ddbef44344b090c601449f81f063/cover.png"
---

## Permasalahan Sumber Tetap (Fixed Source)

Pada kasus gelombang EM dalam medium bahan 1 dimensi (penjalaran gelombang elektromagnetik pada **sumbu-x** dan komponen medan elektriknya pada **sumbu-z**), sehingga Hukum Faraday untuk Persamaan Maxwell dapat ditulis sebagai

$$
\begin{align}
-\mu \frac{\partial\vec{H}}{\partial t} = \vec\nabla\times \vec E =
\begin{vmatrix}
\hat{a}_x & \hat{a}_y & \hat{a}_z \\
\frac{\partial}{\partial x} & 0 & 0 \\
0 & 0 & E_z
\end{vmatrix}
= -\hat{a}_y\frac{\partial E_z}{\partial x}
\end{align}
$$

Medan magnet dapat memiliki nilai yang tidak nol pada arah $x$ dan $z$, tetapi nilainya statis, sehingga dapat diabaikan. Sehingga $H_y$ menjadi satu-satunya komponen ruang dari medan magnet yang bervariasi terhadap waktu. Maka Hukum Ampere dalam Persamaan Maxwell dapat ditulis sebagai

$$
\begin{align}
\epsilon \frac{\partial\vec{E}}{\partial t} = \vec\nabla\times \vec H =
\begin{vmatrix}
\hat{a}_x & \hat{a}_y & \hat{a}_z \\
\frac{\partial}{\partial x} & 0 & 0 \\
0 & H_y & 0
\end{vmatrix}
= \hat{a}_z\frac{\partial H_y}{\partial x}
\end{align}
$$

Persamaan 1 dan persamaan 2 dapat ditulis ulang dalam bentuk persamaan skalar sebagai

$$
\begin{align}
\mu \frac{\partial H_y}{\partial t} &= \frac{\partial E_z}{\partial x} \\

\epsilon \frac{\partial E_z}{\partial t} &= \frac{\partial H_y}{\partial x}

\end{align}
$$

Persamaan 3 memberikan turunan medan magnet terhadap waktu dalam kaitannya dengan turunan medan listrik terhadap ruang. Sedangkan, persamaan 4 memberikan turunan medan listrik terhadap waktu dalam kaitannya dengan turunan medan magnet terhadap ruang.

### Diskretisasi Hukum Faraday dan Hukum Ampere

Persamaan pertama akan digunakan untuk menghitung medan magnet dari waktu ke waktu sedangkan yang kedua akan digunakan untuk menghitung medan listrik. Digunakan metode _leap-frog_ di mana satu medan dihitung terlebih dahulu lalu medan yang lain dihitung, lalu proses diulang-ulang. Langkah selanjutnya dilakukan diskretisasi pada komponen ruang dan waktu pada persamaan 3 dan persamaan 4

$$
\begin{align}
E_z(x,t)=E_z(m\Delta x, q\Delta t)=E^q_z[m]\\

H_y(x,t)=H_y(m\Delta x, q\Delta t)=H^q_y[m]\\
\end{align}
$$

Di mana $\Delta x$ adalah selisih di antara titik-titik dalam komponen ruang dan $\Delta t$ adalah selisih di antara titik-titik dalam komponen waktu. Indeks $m$ adalah dengan langkah dalam komponen ruang, yang bersama dengan $\Delta x$ menggambarkan lokasi ruang. Sedangkan indeks $q$ adalah langkah dalam komponen waktu. Sehingga dapat digambarkan susunan titik-titik medan listrik (bulat) dan medan magnet (segitiga) pada ruang dan waktu sebagai berikut

![Untitled](/FDTD%20Gelombang%20EM%201%20Dimensi%206820ddbef44344b090c601449f81f063/Untitled.png)

Dari gambar di atas diketahui bahwa pendekatan 2 dimensi digunakan pada perhitungan _finite difference_ (dianggap dimensi waktu merupakan dimensi lain selain dimensi ruang). Semua titik medan di bawah garis putus-putus adalah waktu yang telah lampau dan telah diketahui dan di atas garis putus-putus adalah medan pada waktu yang akan datang. Sehingga dapat dihitung medan di waktu yang akan mendatang dengan algoritma FDTD.

### Persamaan Update Hukum Faraday

Ditinjau Hukum Faraday (dari persamaan 3) pada titik ruang-waktu $((m+\frac12)\Delta x, q\Delta t)$ yang ditunjukkan dengan persamaan

$$
\begin{align*}
\mu \left.
\frac{\partial H_y}{\partial t}  \right |_{(m+\frac12)\Delta x, q\Delta t}
=
\left.
\frac{\partial E_z}{\partial x}
\right |_{(m+\frac12)\Delta x, q\Delta t}
\end{align*}
$$

Karena kita melakukan diskretisasi _finite difference_, maka turunan medan magnet terhadap waktu pada digantikan dengan pendekatan metode center, $H^{q+\frac12}_y[m+\frac12]$ dan $H^{q-\frac12}_y[m+\frac12]$ dan turunan medan listrik berupa ruang digantikan dengan $E^q_z[m+1]$ dan $E^q_z[m]$ sehingga

$$
\begin{align*}
\mu \frac{H^{q+\frac12}_y[m+\frac12] - H^{q-\frac12}_y[m+\frac12]}{\Delta t}

=

\frac{E^q_z[m+1] - E^q_z[m]}{\Delta x}
\end{align*}
$$

yang apabila persamaan di atas ditata ulang untuk mencari _update equation_ untuk $H_y$ didapatkan persamaan

$$
\begin{align}
H^{q+\frac12}_y\left[m+\frac12\right] =
H^{q-\frac12}_y\left[m+\frac12\right] +
\frac{\Delta t}{\mu\Delta x} (E^q_z[m+1] - E^q_z[m])

\end{align}
$$

### Persamaan Update Hukum Ampere

Ditinjau Hukum Faraday (dari persamaan 4) pada titik ruang-waktu $(m\Delta x, (q+\frac12)\Delta t)$ yang ditunjukkan dengan persamaan

$$
\begin{align*}
\epsilon \left.
\frac{\partial E_z}{\partial t}
\right |_{m\Delta x, (q+\frac12)\Delta t}
 =
\left.
\frac{\partial H_y}{\partial x}
\right |_{m\Delta x, (q+\frac12)\Delta t}
\end{align*}
$$

Seperti yang telah kita lakukan sebelumnya pada Update Equation Hukum Faraday, kita mengganti turunan medan listrik terhadap waktu dengan $E^{q+\frac12}_z[m]$ dan $E^{q}_z[m]$, serta turunan medan magnet terhadap ruang digantikan dengan $H^{q+\frac12}_y[m+\frac12]$ dan $H^{q+\frac12}_y[m-\frac12]$ sehingga

$$
\begin{align*}
\epsilon
\frac{E^{q+\frac12}_z[m] - E^{q}_z[m]}{\Delta t}

=

\frac{H^{q+\frac12}_y[m+\frac12] - H^{q+\frac12}_y[m-\frac12]}{\Delta x}
\end{align*}
$$

yang apabila persamaan di atas ditata ulang untuk mencari _update equation_ untuk $E_z$ didapatkan persamaan

$$
\begin{align}
E^{q+1}_z[m] =
E^{q}_z[m] +
\frac{\Delta t}{\epsilon\Delta x} \left
(H^{q+\frac12}_y
\left[ m+\frac12 \right] -
H^{q+\frac12}_y
\left[ m-\frac12 \right]
\right)

\end{align}
$$

## Permasalahan Sumber Tambahan (Additive Source)

Menggunakan sumber tetap memberi masalah di mana energi tidak dapat melewati titik sumber (titik awal) dan gelombang EM dikatakan lenyap. Masalah ini dapat diselesaikan dengan membuat sumber tambahan, sehingga lebih menggambarkan keadaan fisis asli di mana batas terbentuk dari sebuah bahan tertentu. Hal ini dapat dilakukan dengan menambah suku yang memuat rapat arus pada persamaan Hukum Ampere, sehingga persamaan menjadi

$$
\begin{align}
\vec\nabla \times \vec H = \vec J + \epsilon \frac{\partial\vec{E}}{\partial t}
\end{align}
$$

Rapat arus $\vec J$ secara fisis dapat menggambarkan arus konduksi akibat aliran muatan dalam suatu bahan dalam pengaruh medan listrik. Dengan menata ulang persamaan 9 didapatkan

$$
\begin{align}
\epsilon \frac{\partial\vec{E}}{\partial t} = \left(\vec\nabla \times \vec H\right) - \vec J
\end{align}
$$

Seperti halnya dengan persamaan 4, persamaan di atas memberikan turunan medan listrik terhadap waktu dalam kaitannya dengan turunan medan magnet terhadap ruang. Suku tambahan menggambarkan fungsi pemaksa (_forcing function_) yang juga merupakan sumber medan tambahan bagi sistem.

Medan magnet dapat memiliki nilai yang tidak nol pada arah $x$ dan $z$, tetapi nilainya statis, sehingga dapat diabaikan. Sehingga $H_y$ menjadi satu-satunya komponen ruang dari medan magnet yang bervariasi terhadap waktu. Untuk $J$ komponennya hanya ada pada sumbu $z$.

$$
\begin{align*}
\epsilon \frac{\partial\vec{E}}{\partial t} &=
\begin{vmatrix}
\hat{a}_x & \hat{a}_y & \hat{a}_z \\
\frac{\partial}{\partial x} & 0 & 0 \\
0 & H_y & 0
\end{vmatrix} - J_z\\

\epsilon \frac{\partial\vec{E}}{\partial t} &= \hat{a}_z\frac{\partial H_y}{\partial x} - J_z
\end{align*}
$$

Persamaan 12 dapat ditulis ulang dalam bentuk persamaan skalar sebagai

$$
\begin{align}
\epsilon \frac{\partial{E_z}}{\partial t}
&=
\frac{\partial H_y}{\partial x}-J_z

\end{align}
$$

### Diskritisasi Dan Persamaan Update Hukum Ampere Dengan Rapat Arus

Digunakan metode _leap-frog_ di mana satu medan dihitung terlebih dahulu lalu medan yang lain dihitung, lalu proses diulang-ulang. Ditinjau Hukum Faraday (dari persamaan 13) pada titik ruang-waktu $(m\Delta x, (q+\frac12)\Delta t)$ yang ditunjukkan dengan persamaan

$$
\begin{align*}
\epsilon \left.
\frac{\partial E_z}{\partial t}
\right |_{m\Delta x, (q+\frac12)\Delta t}
 =
\left [
\frac{\partial H_y}{\partial x}  -J_z
\right ]_{m\Delta x, (q+\frac12)\Delta t}
\end{align*}
$$

Seperti yang telah kita lakukan sebelumnya pada Update Equation Hukum Faraday, kita mengganti turunan medan listrik terhadap waktu dengan $E^{q+\frac12}_z[m]$ dan $E^{q}_z[m]$, serta turunan medan magnet terhadap ruang digantikan dengan $H^{q+\frac12}_y[m+\frac12]$ dan $H^{q+\frac12}_y[m-\frac12]$ sehingga

$$
\begin{align*}
\epsilon
\frac{E^{q+\frac12}_z[m] - E^{q}_z[m]}{\Delta t}

=

\frac{H^{q+\frac12}_y[m+\frac12] - H^{q+\frac12}_y[m-\frac12]}{\Delta x} - J_z^{q+\frac12}[m]
\end{align*}
$$

yang apabila persamaan di atas ditata ulang untuk mencari _update equation_ untuk $E_z$ didapatkan persamaan

$$
\begin{align}
E^{q+1}_z[m] =
E^{q}_z[m] +
\frac{\Delta t}{\epsilon\Delta x} \left
(H^{q+\frac12}_y
\left[ m+\frac12 \right] -
H^{q+\frac12}_y
\left[ m-\frac12 \right]
\right)
- \frac{\Delta t}{\epsilon}  J_z^{q+\frac12}[m]

\end{align}
$$

Persamaan 12 tentu saja sedikit berbeda dengan persamaan 8. Untuk mempertahankan fungsi update sebelumnya (yang berguna saat menulis kode _loop_), maka persamaan 12 dapat ditulis sebagai 2 langkah. Langkah pertama fungsi update seperti persamaan 8 dijalankan, lalu suku untuk sumber tambahan ditambahkan. Maka persamaan menjadi

$$
\begin{align}
E^{q+1}_z[m] &=
E^{q}_z[m] +
\frac{\Delta t}{\epsilon\Delta x} \left
(H^{q+\frac12}_y
\left[ m+\frac12 \right] -
H^{q+\frac12}_y
\left[ m-\frac12 \right]
\right)\\

E^{q+1}_z[m] &=
E^{q+1}_z[m] - \frac{\Delta t}{\epsilon}  J_z^{q+\frac12}[m]

\end{align}
$$

## Program FDTD 1-Dimensi Untuk Gelombang Elektromagnetik dengan Sumber Tambahan

![ez.gif](/FDTD%20Gelombang%20EM%201%20Dimensi%206820ddbef44344b090c601449f81f063/ez.gif)

```python
## Import library yang akan digunakan
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

## Tentukan ukuran dari dimensi ruang
SIZE = 200
ez = np.zeros(SIZE)
hy = np.zeros(SIZE)
x = np.arange(SIZE)
imp0 = 377.0

## Tentukan ukuran dari dimensi waktu
maxTime = 400

fig, ax = plt.subplots()

def animate(qTime):
  # update magnetic field
  for mm in range(SIZE - 1):
    hy[mm] = hy[mm] + (ez[mm + 1] - ez[mm]) / imp0;

  # update electric field
  for mm in range(1, SIZE):
    ez[mm] = ez[mm] + (hy[mm] - hy[mm - 1]) * imp0;

  # Sumber tambahan pada titik t=100
  # Dengan fungsi J adalah e^( -(t-30) * (t-30) / 100 )
  ez[100] += np.exp(-(qTime - 30.) * (qTime - 30.) / 100.);

  ax.clear()
  ax.set_xlabel('x (m)')
  ax.set_ylabel('E (N/C)')
  ax.set_ylim([-1.2,1.2])
  ax.set_title('FDTD Gelombang Medan Listrik Additive Source', color='k')
  return ax.plot(x, ez)

## Lakukan for loop untuk waktu
anim = FuncAnimation(fig, animate, frames = maxTime, interval = 50, blit = True)

## Tampilkan Grafik
plt.show()
```

![hy.gif](/FDTD%20Gelombang%20EM%201%20Dimensi%206820ddbef44344b090c601449f81f063/hy.gif)

```python
## Import library yang akan digunakan
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

## Tentukan ukuran dari dimensi ruang
SIZE = 200
ez = np.zeros(SIZE)
hy = np.zeros(SIZE)
x = np.arange(SIZE)
imp0 = 377.0

## Tentukan ukuran dari dimensi waktu
maxTime = 400

fig, ax = plt.subplots()

def animate(qTime):
  # update magnetic field
  for mm in range(SIZE - 1):
    hy[mm] = hy[mm] + (ez[mm + 1] - ez[mm]) / imp0;

  # update electric field
  for mm in range(1, SIZE):
    ez[mm] = ez[mm] + (hy[mm] - hy[mm - 1]) * imp0;

  # Sumber tambahan pada titik t=100
  # Dengan fungsi J adalah e^( -(t-30) * (t-30) / 100 )
  ez[100] += np.exp(-(qTime - 30.) * (qTime - 30.) / 100.);

  ax.clear()
  ax.set_xlabel('x (m)')
  ax.set_ylabel('B (T)')
  ax.set_ylim([-0.0035,0.0035])
  ax.set_title('FDTD Gelombang Medan Magnet Additive Source', color='k')
  return ax.plot(x, hy)

## Lakukan for loop untuk waktu
anim = FuncAnimation(fig, animate, frames = maxTime, interval = 50, blit = True)

## Tampilkan Grafik
plt.show()
```

### Analisis Hasil

Kode ini merupakan implementasi dari simulasi Finite-Difference Time-Domain (FDTD) untuk gelombang medan listrik 1-dimensi dengan sumber tambahan pada t=100. FDTD adalah metode numerik yang digunakan untuk menyelesaikan persamaan diferensial yang mengatur propagasi dan penyebaran gelombang dalam sistem elektromagnetik. Ini adalah metode yang banyak digunakan dalam bidang elektromagnetik, terutama dalam desain dan analisis antena.

Simulasi ini memerlukan penggunaan library `numpy` dan `matplotlib`, serta fungsi `FuncAnimation(){:python}` untuk membuat plot animasi. Kode ini menentukan ukuran dimensi ruang, yang diatur ke 200, dan menginisialisasi _array_ untuk medan listrik (`ez{:python}`), medan magnetik (`hy{:python}`), dan sumbu x (`x{:python}`). Variabel `imp0{:python}` diatur ke 377, yang merupakan impedansi ruang bebas. Simulasi juga menentukan ukuran dimensi waktu, yang diatur ke 400. Kemudian fungsi _`animate(){:python}`_ didefinisikan, yang memperbarui medan listrik dan magnetik pada setiap langkah waktu. Persamaan pembaruan untuk medan listrik dan magnetik masing-masing didasarkan pada persamaan Hukum Ampere dan Hukum Faraday.

Selain sumber awal pada $t=100 \ s$, simulasi ini juga menggabungkan fungsi untuk sumber kepadatan arus ($J_z$), yang ditambahkan ke persamaan pembaruan untuk medan listrik yang digunakan untuk menyimulasikan sumber arus. Digunakan fungsi rapat arus $J_z$ (sumber tambahan) pada titik $x=100 \ m$ sebagai berikut

$$
\begin{align*}
J_z= e^{ (-q+30) * (q/-30) / 100 }
\end{align*}
$$

Kode ini kemudian membuat dua plot animasi, satu untuk medan listrik dan satu untuk medan magnetik. Plot menunjukkan perubahan dalam medan listrik dan magnetik dalam ruang dan waktu, saat gelombang merambat melalui domain simulasi. Pada plot grafik, gelombang EM dimulai dari sumber tambahan yang dimulai pada $x=100 \ m$ dan menjalar ke kanan dan ke kiri sesuai yang diharapkan. Tampak pula letak gelombang listrik dan gelombang magnetik memiliki selisih (beda fase) sebesar 90 derajat. Ketika gelombang listrik ataupun gelombang magnetik mencapai batas ($x=0$ dan $x=200$), maka gelombang-gelombang tersebut akan memantul dan kembali ke dalam ruang yang telah dibuat. Diketahui pula bahwa besar dari medan magnet jauh lebih kecil dari medan listrik.

## Simulasi FDTD 1-Dimensi dengan batas TFSF antara hy[49] dan ez[50]

![ez.gif](/FDTD%20Gelombang%20EM%201%20Dimensi%206820ddbef44344b090c601449f81f063/ez%201.gif)

```python
## Import library yang akan digunakan
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

## Tentukan ukuran dari dimensi ruang
SIZE = 200
ez = np.zeros(SIZE)
hy = np.zeros(SIZE)
x = np.arange(SIZE)
imp0 = 377.0

## Tentukan ukuran dari dimensi waktu
maxTime = 400

fig, ax = plt.subplots()

def animate(qTime):
  # simple ABC for hy[size - 1]
  hy[SIZE - 1] = hy[SIZE - 2]

  # update magnetic field
  for mm in range(SIZE - 1):
    hy[mm] = hy[mm] + (ez[mm + 1] - ez[mm]) / imp0

  # correction for Hy adjacent to TFSF boundary
  hy[49] -= np.exp( -(qTime - 30) * (qTime - 30) / 100 ) / imp0

  # simple ABC for ez[0]
  ez[0] = ez[1];

  # update electric field
  for mm in range(1, SIZE):
    ez[mm] = ez[mm] + (hy[mm] - hy[mm - 1]) * imp0

  # correction for Ez adjacent to TFSF boundary
  ez[50] += np.exp(-(qTime + 0.5 - (-0.5) - 30.) * (qTime + 0.5 - (-0.5) - 30.) / 100.);

  ax.clear()
  ax.set_xlabel('x (m)')
  ax.set_ylabel('E (N/C)')
  ax.set_ylim([-1.2,1.2])
  ax.set_title('FDTD Gelombang Medan Listrik Batas TFSF', color='k')
  return ax.plot(x, ez)

## Lakukan for loop untuk waktu
anim = FuncAnimation(fig, animate, frames = maxTime, interval = 50, blit = True)

## Tampilkan Grafik
plt.show()
```

![hy.gif](/FDTD%20Gelombang%20EM%201%20Dimensi%206820ddbef44344b090c601449f81f063/hy%201.gif)

```python
## Import library yang akan digunakan
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

## Tentukan ukuran dari dimensi ruang
SIZE = 200
ez = np.zeros(SIZE)
hy = np.zeros(SIZE)
x = np.arange(SIZE)
imp0 = 377.0

## Tentukan ukuran dari dimensi waktu
maxTime = 400

fig, ax = plt.subplots()

def animate(qTime):
  # simple ABC for hy[size - 1]
  hy[SIZE - 1] = hy[SIZE - 2]

  # update magnetic field
  for mm in range(SIZE - 1):
    hy[mm] = hy[mm] + (ez[mm + 1] - ez[mm]) / imp0

  # correction for Hy adjacent to TFSF boundary
  hy[49] -= np.exp( -(qTime - 30) * (qTime - 30) / 100 ) / imp0

  # simple ABC for ez[0]
  ez[0] = ez[1];

  # update electric field
  for mm in range(1, SIZE):
    ez[mm] = ez[mm] + (hy[mm] - hy[mm - 1]) * imp0

  # correction for Ez adjacent to TFSF boundary
  ez[50] += np.exp(-(qTime + 0.5 - (-0.5) - 30.) * (qTime + 0.5 - (-0.5) - 30.) / 100.);

  ax.clear()
  ax.set_xlabel('x (m)')
  ax.set_ylabel('B (T)')
  ax.set_ylim([-0.0035,0.0035])
  ax.set_title('FDTD Gelombang Medan Magnet Batas TFSF', color='k')
  return ax.plot(x, hy)

## Lakukan for loop untuk waktu
anim = FuncAnimation(fig, animate, frames = maxTime, interval = 50, blit = True)

## Tampilkan Grafik
plt.show()
```

### Analisis Hasil

Kode di atas ini mengimplementasikan metode _finite-difference time-domain_ (FDTD) untuk menyimulasikan perambatan gelombang elektromagnetik di dalam ruang satu dimensi. Blok pertama kode menyimulasikan komponen medan listrik dari gelombang elektromagnetik. Kode ini dimulai dengan mengimpor _library_ yang diperlukan: `numpy`, dan `matplotlib`. Ukuran domain simulasi diatur menjadi 200 unit, dan array `ez{:python}` dan `hy{:python}` diinisialisasi menjadi nol. Array `x{:python}` dibuat untuk merepresentasikan domain ruang. Variabel `imp0{:python}` diatur menjadi impedansi bahan, yang bernilai 377. Simulasi diatur untuk berjalan selama total 400 langkah waktu.

Fungsi `animate(){:python}` didefinisikan untuk memperbarui medan listrik pada setiap langkah waktu. Pembaruan dilakukan berdasarkan hukum Ampere dan hukum Faraday, yang menggambarkan hubungan antara medan magnetik dan arus listrik yang menghasilkannya. Medan listrik dan medan magnet yang dihasilkan kemudian di _plot_ sebagai grafik garis animasi menggunakan `matplotlib`. Kondisi batas TFSF (_total-field scattered-field_) juga diterapkan untuk menambahkan sumber gelombang datar. Kondisi batas diterapkan antara `hy[49]{:python}` dan `ez[50]{:python}`. Kondisi batas ini digunakan untuk menyimulasikan interaksi antara gelombang datar yang terjadi dan objek yang dipantulkan. Hal ini memungkinkan pemisahan medan total dan medan tersebar, yang diperlukan dalam banyak masalah penyebaran elektromagnetik. Fungsi koreksi pada $H_y$ yang digunakan adalah

$$
\begin{align*}
H_y(49) = H_y(49)- e^{ (-q+30) (q - 30) / 100 } / \ \text{imp0}
\end{align*}
$$

Sedangkan fungsi koreksi pada $E_z$ adalah

$$
\begin{align*}
E_z(50) = E_z(50)+ e^{-(q + 0.5 - (-0.5) - 30) (q + 0.5 - (-0.5) - 30) / 100}
\end{align*}
$$

Animasi yang dihasilkan menunjukkan evolusi waktu dari medan listrik dan magnetik ketika gelombang merambat melalui ruang. Animasi dimulai dengan sumber aditif pada waktu dan lokasi tertentu, yang menciptakan gangguan pada medan elektromagnetik. Gelombang kemudian merambat keluar dari sumber, seperti yang terlihat dalam animasi. Animasi juga menunjukkan pantulan gelombang pada batas domain simulasi, yang merupakan hasil dari gelombang yang bertemu dengan perubahan medium. Animasi memberikan representasi visual dari perilaku gelombang elektromagnetik dan dapat digunakan untuk mempelajari sifat dan interaksi gelombang dengan berbagai material.
