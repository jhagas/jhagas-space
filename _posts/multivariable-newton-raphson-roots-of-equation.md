---
title: "Penyelesaian Akar dari 3 Persamaan (3 variabel) Menggunakan Metode Newton-Raphson"
desc: "Implementasi metode Newton-Raphson untuk menemukan akar persamaan multivariabel dengan bahasa pemrograman python"
tags: "Computational Physics"
coverImage: "/multivariable-newton-raphson/cover.png"
date: "2023-12-15"
author:
  name: Jhagas Hana Winaya
ogImage:
  url: "/multivariable-newton-raphson/cover.png"
---

Dalam dunia sains dan teknik, sering kali kita dihadapkan pada tantangan untuk menemukan akar dari suatu sistem persamaan. Salah satu metode yang efektif dan populer untuk menyelesaikan sistem persamaan non-linier adalah metode Newton-Raphson.

Artikel ini akan membahas bagaimana metode Newton-Raphson, yang awalnya dikembangkan untuk mencari akar persamaan dengan variabel tunggal, dapat diperluas untuk menyelesaikan sistem persamaan non-linier dengan tiga variabel. Kunci dari perluasan ini adalah penggunaan matriks Jacobian, yang merupakan matriks turunan parsial pertama dari fungsi yang diberikan.

Dengan memahami dan menerapkan metode Newton-Raphson dan matriks Jacobian, kita dapat menemukan solusi yang tepat dan efisien untuk sistem persamaan nonlinier.

## Persoalan

Diberikan 3 persamaan sebagai berikut

$$
\begin{align*}
f(x,y,z) &= x^2 + y^2 + z^2 - 14 = 0\\
g(x,y,z) &= x^2 + 2y^2 - 9 = 0\\
h(x,y,z) &= x - 3y^2 + z^2 = 0
\end{align*}
$$

Selesaikan ketiga persamaan tersebut secara simultan untuk mengestimasi nilai $x$, $y$, $z$!

## Definisi Permasalahan Secara Numerik

Pertama-tama kita buat satu matriks yang mendefinisikan ketiga persamaan di atas dalam satu wadah yang sama.

$$
\begin{align*}
F(m_k)=\left[\begin{matrix}f\left(x_k,y_k,z_k\right)\\g\left(x_k,y_k,z_k\right)\\h\left(x_k,y_k,z_k\right)\\\end{matrix}\right]
\end{align*}
$$

Lalu kita definisikan $m_k$ sebagai solusi dari ketiga persamaan di atas, sekaligus masukan dari fungsi $F(m_k)$.

$$
\begin{align*}
m_k=\left[\begin{matrix}x_k\\y_k\\z_k\\\end{matrix}\right]
\end{align*}
$$

Selanjutnya kita definisikan matriks **Jacobian**, atau matriks turunan dari ketiga persamaan pada persoalan di atas.

$$
\begin{align*}
J(m_k)=\left(\begin{matrix}\frac{\partial f\left(x_k,y_k,z_k\right)}{\partial x}&\frac{\partial f\left(x_k,y_k,z_k\right)}{\partial y}&\frac{\partial f\left(x_k,y_k,z_k\right)}{\partial z}\\\frac{\partial g\left(x_k,y_k,z_k\right)}{\partial x}&\frac{\partial g\left(x_k,y_k,z_k\right)}{\partial y}&\frac{\partial g\left(x_k,y_k,z_k\right)}{\partial z}\\\frac{\partial h\left(x_k,y_k,z_k\right)}{\partial x}&\frac{\partial h\left(x_k,y_k,z_k\right)}{\partial y}&\frac{\partial h\left(x_k,y_k,z_k\right)}{\partial z}\\\end{matrix}\right)
\end{align*}
$$

Bila dihitung, turunan parsial untuk fungsi **Jacobian** menjadi

$$
\begin{align*}
J(m_k)
=\left(
\begin{matrix}
2x&2y&2z\\
2x&4y&0\\
1&-6y&2z\\\end{matrix}\right)
\end{align*}
$$

Dikarenakan jumlah **unknowns** harus sama dengan jumlah persamaan yang ada (dalam soal ini 3 **unknowns** dan 3 persamaan), matriks **Jacobian** pasti merupakan matriks dengan jumlah baris dan kolom yang sama. Jumlah kolom merepresentasikan jumlah **unknowns** dan jumlah baris merepresentasikan jumlah persamaan.

<aside>
⚠️ Perlu diketahui pula bahwa determinan dari matriks **Jacobian** tidak boleh nol, agar bisa dilakukan invers

</aside>

Karena akan dilakukan pendekatan numerik Newton-Raphson, maka perlu didefinisikan persamaan pembaharuan dari setiap iterasi. Di mana $k$ adalah iterator dari fungsi pengulangan.

$$
\begin{align*}
m_k(x,y,z) = m_{k-1}(x,y,z) -J(m_{k-1})^{-1}\ F(m_{k-1})
\end{align*}
$$

## Penjelasan Komputasi Numerik dengan Python

Sebelum melangkah pada penerapannya di Python, secara umum Pseudo-code dari permasalahan ini adalah sebagai berikut

```text
Definisikan fungsi
Definisikan matriks Jacobian
Buat array untuk nilai mula-mula solusi: solusi
Atur nilai toleransi: tol

FOR I=1, MAXITER
  1. Hitung F(solusi)
  2. Jika NORM(F(solusi)) < tol, maka konvergen & keluar. Selain itu lanjut.
  3. Hitung matriks Jacobian df = J(solusi)
  4. Jika DETERMINAN(df) == 0, Terjadi eror & keluar. Selain itu lanjut
  5. Hitung solusi = solusi - INVERS(df)*f(solusi)
ENDDO
```

### Penerapan pada Python

Sebelumnya, kita masukkan library yang akan digunakan, yakni `numpy{:python}`.

```python
import numpy as np
```

Hal pertama yang harus dilakukan adalah mendefinisikan fungsi $F(m_k)$ dalam python.

```python
def F(solusi):
  x, y, z = solusi

  f = x**2 + y**2 + z**2 - 14
  g = x**2 + 2*y**2 - 9
  h = x - 3*y**2 + z**2

  return np.array([f, g, h])
```

Selanjutnya, definisikan matriks **Jacobian** yang telah dibuat pada bagian sebelumnya.

```python
def J(solusi):
  x, y, z = solusi

  dpfx = 2*x
  dpfy = 2*y
  dpfz = 2*z

  dpgx = 2*x
  dpgy = 4*y
  dpgz = 0

  dphx = 1
  dphy = -6*y
  dphz = 2*z

  return np.array([[dpfx, dpfy, dpfz],
                   [dpgx, dpgy, dpgz],
                   [dphx, dphy, dphz]])
```

Selanjutnya, adalah membuat nilai awal dari solusi yang kita cari dengan metode Newton-Raphson. Penting untuk tidak menaruh nilai nol pada solusi awal, yang dapat mengakibatkan determinan dari matriks **Jacobian** bernilai nol, sehingga tidak bisa dilakukan invers pada matriks tersebut. Dengan pertimbangan tersebut, maka nilai solusi awal yang digunakan adalah

$$
\begin{align*}
m_k=\left[\begin{matrix}x_k\\y_k\\z_k\\\end{matrix}\right]=\left[\begin{matrix}1\\1\\1\\\end{matrix}\right]
\end{align*}
$$

Sehingga, dalam python dibuat matriks solusi dengan `np.ones{:python}` yang akan menghasilkan matriks 1 dimensi dengan 3 item bernilai 1. Kode ditampilkan sebagai berikut

```python
solusi = np.ones(3)
```

Selanjutnya definisikan berapa toleransi yang diperbolehkan, dan maksimal iterasi _loop_ yang perlu dijalankan.

```python
tol = 1e-3
maxiter = 10
```

Untuk _loop_ utamanya, akan dijabarkan sebagai berikut

```python
# Untuk mempercantik hasil print
val_print = ["x", "y", "z"]

for ii in range(maxiter):
	# Hitung F(solusi)
  val_F = F(solusi)

	# Jika NORM(F(solusi)) < tol, nilai konvergen. Print hasil
  if (np.linalg.norm(val_F) < tol):
    print("Nilai Konvergen pada iterasi ke", ii)
    for i in range(len(solusi)):
      print(val_print[i], "=", solusi[i])
    break

	# Hitung matriks Jacobian, J(solusi)
  df = J(solusi)

	# Jika DETERMINAN(df) == 0, Terjadi eror & keluar
  if (np.linalg.det(df) == 0):
    print("ERROR! Determinant is Zero")
    break

	# Hitung, solusi = solusi - INVERS(df).f(solusi)
  solusi -= np.matmul(np.linalg.inv(df), val_F)
```

Dari kode loop utama di atas pasti anda muncul pertanyaan, apa itu NORM dalam matriks. Norm dalam matriks adalah suatu fungsi yang mengukur besarnya seluruh nilai yang ada dalam matriks. Norm matriks didefinisikan sebagai nilai maksimum dari hasil perkalian matriks dengan vektor unit. Dalam matematika, norm matriks sering digunakan untuk mengukur kesalahan dalam suatu perhitungan matriks. Yang digunakan dalam pustaka `numpy{:python}` adalah metode NORM Frobenius.

## Hasil

Dari perhitungan menggunakan python yang telah dijabarkan di atas, ditemukan hasil bahwa

| Variabel | Hasil              |
| -------- | ------------------ |
| $x$      | 1.5615528128094316 |
| $y$      | 1.8112913796272616 |
| $z$      | 2.877691460669404  |

Nilai solusi konvergen (lebih kecil daripada toleransi) pada iterasi ke-4

## Kesimpulan

Dalam artikel ini, kita telah membahas bagaimana metode Newton-Raphson dan matriks Jacobian dapat digunakan untuk menyelesaikan sistem persamaan nonlinier dengan tiga variabel. Kita telah belajar bahwa metode Newton-Raphson, meskipun sederhana, adalah metode yang aktif dalam menemukan akar persamaan. Dengan bantuan matriks Jacobian, kita dapat menerapkan metode ini pada sistem persamaan dengan lebih dari satu variabel.

Secara keseluruhan, penggunaan metode Newton-Raphson dengan matriks Jacobian dalam Python menawarkan solusi yang efisien dan akurat untuk menyelesaikan sistem persamaan non-linier. Ini membuka banyak kemungkinan untuk penelitian dan aplikasi lebih lanjut dalam berbagai bidang.
