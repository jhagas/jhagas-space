---
title: 'Optimasi Terkonstrain dengan Pengali Lagrange Pada Python'
desc: 'Implementasi metode pengali lagrange dalam permasalahan optimasi terkonstrain dengan manipulasi fungsi objektif dan matriks jacobian menggunakan bahasa pemrograman MATLAB'
tags: 'Computational Physics'
coverImage: '/optimasi-terkonstrain/cover.png'
date: '2023-05-29'
author:
  name: Jhagas Hana Winaya
ogImage:
  url: '/optimasi-terkonstrain/cover.png'
---

Optimasi terkonstrain adalah suatu metode yang digunakan untuk mencari nilai maksimum atau minimum suatu fungsi dengan mempertimbangkan adanya batasan atau kendala pada variabel-variabel yang terlibat. Batasan ini dapat berupa persamaan atau ketidaksetaraan.

Salah satu teknik yang dapat digunakan dalam optimasi terkonstrain adalah metode pengali Lagrange. Metode ini melibatkan penggunaan suatu fungsi baru yang disebut fungsi Lagrange yang menggabungkan fungsi objektif dan batasan sebagai suatu kesatuan. Kemudian fungsi Lagrange tersebut dioptimalkan untuk mencari nilai optimal variabel-variabel yang terlibat.

Dalam metode pengali Lagrange, terdapat suatu variabel baru yang disebut pengali Lagrange. Pengali Lagrange ini digunakan untuk mempertimbangkan batasan dalam fungsi Lagrange. Dengan cara ini, kita dapat menentukan nilai optimal dari variabel-variabel yang terlibat yang memenuhi batasan yang ada. Dalam praktiknya, metode pengali Lagrange dapat digunakan dalam berbagai masalah optimasi terkonstrain, seperti optimasi ekonomi, optimasi teknik, dan sebagainya.

## Persoalan

Diberikan suatu fungsi $f(x,y)=2x+3y-x^3-2y^2$ dan beberapa pertidaksamaan konstrain yang harus terpenuhi, yaitu

$$
\begin{align}
x+3y-\frac{x^2}{2} &\le \frac{11}{2}\\

5x+2y+\frac{x^2}{10} &\le 10\\
x &\ge 0\\
y &\ge 0\\
\end{align}
$$

Cari titik minimum fungsi tersebut pada konstrain yang diberikan.

## ****Pembentukan Lagrangian Dari Fungsi Objektif Persoalan****

Dalam kasus ini terdapat 2 *inequality constrain* (batas pertidaksamaan) dari persamaan 1 dan persamaan 2 sehingga batasan tersebut perlu diubah menjadi *equality constrain* (batas persamaan). Kita bisa menganggap ada satu variabel pada tiap batasan yang menyebabkan adanya pertidaksamaan tersebut, yaitu $\theta_1^2$ dan $\theta_2^2$. Dengan demikian, kedua batasan tersebut menjadi

$$
\begin{align}
\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2} &= 0\\

\theta_2^2+5x+2y+\frac{x^2}{10}-10 &= 0
\end{align}
$$

Persamaan Lagrangian dari fungsi objektif serta persamaan 5 dan persamaan 6 adalah

$$
\begin{align}
L=(2x+3y-x^3-2y^2)+\lambda_1(\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2})+\lambda_2(\theta_2^2+5x+2y+\frac{x^2}{10}-10)
\end{align}
$$

Untuk mendapatkan nilai optimum masing-masing parameter, turunan parsial pertama dari persamaan 7 pada setiap parameter harus bernilai nol

$$
\begin{align}
\frac{\partial L}{\partial x} &= 2-3x^2+\lambda_1(1-x)+\lambda_2(5+\frac{x}{5}) = 0\\

\frac{\partial L}{\partial y} &= 3-4y+3\lambda_1+2\lambda_2 = 0\\

\frac{\partial L}{\partial \lambda_1} &= \theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2}=0\\

\frac{\partial L}{\partial \lambda_2} &= \theta_2^2+5x+2y+\frac{x^2}
{10}-10=0\\

\frac{\partial L}{\partial \theta_1} &= 2{\lambda_1}{\theta_1}=0\\

\frac{\partial L}{\partial \theta_2} &= 2{\lambda_2}{\theta_2}=0
\end{align}
$$

Pada persamaan 12 dan persamaan 13, kita bisa mengasumsikan pembuat nol persamaan-persamaan tersebut dengan beberapa kemungkinan kasus yang bisa diselesaikan dengan algoritma pemrograman

### Kasus Pertama

Pada kasus pertama, fungsi objektif dapat dibentuk dengan mensubstitusikan $\theta_1=\lambda_2=0$ pada persamaan 8-11 sehingga

$$
f=\begin{bmatrix}{2-3x^2+\lambda_1(1-x)}\\{3-4y+3\lambda_1}\\{x+3y-\frac{x^2}{2}-\frac{11}{2}}\\{\theta_2^2+5x+2y+\frac{x^2}{10}-10}\end{bmatrix}
$$

yang didefinisikan dengan fungsi objektif pada Python dengan

```python
def funcobj(x):
    a = 2 - 3*x[0]**2 + x[2] * (1-x[0])
    b = 3 - 4*x[1] + 3*x[2]
    c = x[0] + 3*x[1] - ((x[0]**2)/2) - 11/2
    d = x[3]**2 + 5*x[0] + 2*x[1] + (x[0]**2)/10 - 10

    return np.array([a, b, c, d])
```

Di mana `x[0]` adalah $x$, `x[1]` adalah $y$, `x[2]` adalah $\lambda_1$ dan yang terakhir `x[3]` adalah $\theta_2$. Sehingga urutan indeks keluaran dari pemrograman yang telah dilakukan akan sama dengan indeks yang telah disebutkan sebelumnya.

### Kasus Kedua

Pada kasus ketiga, fungsi objektif dapat dibentuk dengan mensubstitusikan $\lambda_1=\theta_2=0$ pada persamaan 8-11 sehingga

$$
f=\begin{bmatrix}{2-3x^2+\lambda_2(5+\frac{x}{5})}\\{3-4y+2\lambda_2}\\{\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2}}\\{5x+2y+\frac{x^2}{10}-10}\end{bmatrix}
$$

```python
def funcobj(x):
    a = 2 - 3*x[0]**2 + x[2] * ( 5 - x[0]/5 )
    b = 3 - 4*x[1] + 2*x[2]
    c = x[3]**2 + x[0] + 3*x[1] - ((x[0]**2)/2) - 11/2
    d = 5*x[0] + 2*x[1] + (x[0]**2)/10 - 10

    return np.array([a, b, c, d])
```

Di mana `x[0]` adalah $x$, `x[1]` adalah $y$, `x[2]` adalah $\lambda_2$ dan yang terakhir `x[3]` adalah $\theta_1$. Sehingga urutan indeks keluaran dari pemrograman yang telah dilakukan akan sama dengan indeks yang telah disebutkan sebelumnya.

### Kasus Ketiga

Pada kasus ketiga, fungsi objektif dapat dibentuk dengan mensubstitusikan $\lambda_1=\lambda_2=0$ pada persamaan 8-11 sehingga

$$
f=\begin{bmatrix}{2-3x^2}\\{3-4y}\\{\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2}}\\{\theta_2^2+5x+2y+\frac{x^2}{10}-10}\end{bmatrix}
$$

```python
def funcobj(x):
    a = 2 - 3*x[0]**2
    b = 3 - 4*x[1]
    c = x[2]**2 + x[0] + 3*x[1] - ((x[0]**2)/2) - 11/2
    d = x[3]**2 + 5*x[0] + 2*x[1] + (x[0]**2)/10 - 10

    return np.array([a, b, c, d])
```

Di mana `x[0]` adalah $x$, `x[1]` adalah $y$, `x[2]` adalah $\theta_1$ dan yang terakhir `x[3]` adalah $\theta_2$. Sehingga urutan indeks keluaran dari pemrograman yang telah dilakukan akan sama dengan indeks yang telah disebutkan sebelumnya.

## Program Untuk Menyelesaikan Permasalahan Optimasi Terkonstrain

### Penyiapan Awal

Untuk melakukan pemrograman, didefinisikan banyak variabel yang belum diketahui pada `nvar` sebanyak 4 variabel yang belum diketahui. Setelah itu kita masukkan `1` sebagai nilai awal dari variabel yang belum diketahui. Di sini kita akan melakukan **maksimal** 30 iterasi, apabila nilai keluaran masih lebih besar dari toleransi sebesar `1e-6`.

```python
nvar = 4
x = np.zeros([nvar, nvar])
x[0,:] = [1, 1, 1, 1]

niter=30
tol=1e-6
```

### Fungsi Matriks Jacobian

Dibuat fungsi Python `jacobian` yang menghitung matriks Jacobian dari vektor masukan yang diberikan, menggunakan metode selisih. Vektor masukan diteruskan ke fungsi objektif `funcobj` yang disesuaikan dengan masing-masing kasus, yang akan mengembalikan vektor dengan ukuran yang sama dengan vektor masukan. Matriks Jacobian dihitung secara numerik dengan mengevaluasi fungsi pada setiap komponen vektor masukan, kemudian menghitung turunan terhadap komponen tersebut menggunakan ukuran selisih langkah `h`. Matriks hasilnya dikembalikan sebagai daftar dua elemen: nilai fungsi pada vektor masukan (`f0`), dan matriks Jacobian (`jac`) itu sendiri.

```python
def jacobian(x):
    h = 1.0e-4
    n = x.shape
    jac = np.zeros([n[0], n[0]])
    f0 = funcobj(x)

    for i in range(n[0]):
        temp = x[i]
        x[i] = temp + h
        f1 = funcobj(x)
        x[i] = temp
        jac[:,i] = (f1 - f0)/h

    return [f0, jac]
```

### Iterasi Utama

Kode dibawah melakukan proses iteratif untuk menyelesaikan sistem persamaan menggunakan matriks Jacobian. Kode ini diinisialisasi dengan loop yang mengulang dari rentang `0` hingga `niter-1`. Dalam setiap iterasi, matriks Jacobian dihitung menggunakan fungsi `jacobian()`, dan kemudian digunakan untuk memecahkan vektor solusi `dx`. Vektor solusi baru kemudian dikurangi dari yang sebelumnya dan diteruskan ke `x[i+1,:]`. Kode kemudian memeriksa konvergensi dengan mengukur selisih absolut antara vektor solusi baru dan lama, dan jika selisihnya kurang dari nilai toleransi yang telah ditetapkan sebelumnya, kode keluar dari *loop* dan mencetak solusi yang konvergen. Jika tidak, vektor solusi baru ditambahkan ke matriks x menggunakan np.vstack().

Akhirnya, kode mencetak nomor iterasi dan solusi saat ini untuk setiap iterasi. Di mana solusi yang didapat dari program ini adalah pada iterasi yang terakhir dan urutan indeksnya akan sama dengan indeks yang telah ditetapkan pada proses membuat fungsi objektif.

```python
for i in range(niter-1):
    [f,dp] = jacobian( x[i,:] )
    dx = np.matmul(np.linalg.inv(dp), f)

    x[i+1,:] = x[i,:] - dx

    pesan = 'Iteration={i}: Solusi={sol}'
    print(pesan.format(i = i, sol = x[i+1]))

    if abs(x[i+1,:] - x[i,:]).any() < tol:
        r = x[i+1, :];
        print(r)
        print('Solusi konvergen')
        break
    else:
      x = np.vstack((x, np.zeros([1,nvar])))
```

## Hasil Optimasi Dari Ketiga Kasus

| Kasus | $x$ | $y$ | $\lambda_1$ | $\lambda_2$ | $\theta_1$ | $\theta_2$ | $f$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.85261369 | 1.67028712 | 1.22704949 | 0 | 0 | 1.52435636 | 0.516563 |
| 2 | 1.46741348 | 1.22380119 | 0 | 0.94760237 | 1.19909721 | 0 | 0.451067 |
| 3 | 0.81649658 | 0.75 | 0 | 0 | 1.66338112 | 2.08586923 | 2.213662 |