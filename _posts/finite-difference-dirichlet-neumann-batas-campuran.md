---
title: "Metode Finite Difference Untuk Persamaan Poisson 2 Dimensi Batas Campuran"
desc: "Persamaan Poisson 2 Dimensi dengan batas campuran (Neumann dan Dirichlet) yang diselesaikan dengan metode Finite Difference menggunakan Python beserta penurunan rumus matriksnya"
tags: "Computational Physics"
coverImage: "/2D%20Mixed%20Boundaries%20Poisson%E2%80%99s%20Equation%20de5e218b0f8748d4bebb49adba7f6844/cover.png"
date: "2023-04-18"
author:
  name: Jhagas Hana Winaya
ogImage:
  url: "/2D%20Mixed%20Boundaries%20Poisson%E2%80%99s%20Equation%20de5e218b0f8748d4bebb49adba7f6844/cover.png"
---

## Persoalan

Selesaikan persamaan berikut

$$
\begin{align*}
\frac{\partial^2u}{\partial x^2} + \frac{\partial^2u}{\partial y^2} = f(x, y)
\end{align*}
$$

Dengan $f(x,y) = \frac{y}{x}+\frac{x}{y}$. Dari $1<x<2$ dan $1<y<2$. Dengan syarat batas

| Persamaan                                | Lokasi Dalam Grid |
| ---------------------------------------- | ----------------- |
| $\frac{\partial u(1,y)}{\partial y} = 0$ | Grid Kiri         |
| $\frac{\partial u(x,1)}{\partial x} = 0$ | Grid Bawah        |
| $u(2,y) = h(y)$                          | Grid Kanan        |
| $u(x,2) = g(x)$                          | Grid Atas         |

Dengan $g(x)=x\ln(4x^2)$ dan $h(y)=2y\ln(2y)$ serta $\Delta x = \Delta y = 10^{-2}$. **Beruntungnya**, nilai $g(x)$ dan $h(y)$ masing-masing pada $x = 2$ dan $y = 2$ adalah sama.

## _Gridding_ Model (Metode Center)

Ingat bahwa sumbu horizontal adalah $y$ dan sumbu vertikal adalah $x$. Dengan mempertimbangkan pendekatan deret Taylor metode *center*, maka didapat suku-suku dari persamaan di atas

$$
\begin{align*}
\frac{\partial^2u}{\partial x^2}
\approx
\frac{u_{i+1, j}-2u_{i, j}+u_{i-1, j}}{\Delta x^2}
\end{align*}
$$

$$
\begin{align*}
\frac{\partial^2u}{\partial y^2}
\approx
\frac{u_{i, j+1}-2u_{i, j}+u_{i, j-1}}{\Delta y^2}
\end{align*}
$$

Yang apabila dimasukkan kembali ke persamaan pada persoalan, menjadi

$$
\begin{align*}
\frac{u_{i+1, j}-2u_{i, j}+u_{i-1, j}}{\Delta x^2} + \frac{u_{i, j+1}-2u_{i, j}+u_{i, j-1}}{\Delta y^2} = f(x, y)
\end{align*}
$$

Yang apabila dipersingkat, menjadi

$$
\begin{align*}
\left(\frac{1}{\Delta x^2}\right)u_{i+1, j} + \left(\frac{1}{\Delta x^2}\right)u_{i-1, j}+\left(\frac{-2}{\Delta x^2}+\frac{-2}{\Delta y^2}\right)u_{i, j}+\left(\frac{1}{\Delta y^2}\right)u_{i, j+1}+\left(\frac{1}{\Delta y^2}\right)u_{i, j-1} = f(x, y)
\end{align*}
$$

Dimisalkan bahwa

$$
\begin{align*}
\left(\frac1{\Delta x^2}\right)=a,\ \ \
\left(\frac{-2}{\Delta x^2}+\frac{-2}{\Delta y^2}\right)=b,\ \ \
\left(\frac1{\Delta y^2}\right)=c
\end{align*}
$$

Sehingga

$$
\begin{align*}
au_{i+1, j} + au_{i-1, j}+bu_{i, j}+cu_{i, j+1}+cu_{i, j-1} = f(x, y)
\end{align*}
$$

Untuk menyelesaikan persoalan batas Neumann (Batas kiri dan atas) serta Dirichlet (Batas kanan dan bawah), diperlukan model _gridding_ sebagai berikut

![Frame (1).png](</2D%20Mixed%20Boundaries%20Poisson%E2%80%99s%20Equation%20de5e218b0f8748d4bebb49adba7f6844/Frame_(1).png>)

Diperlukan pula _grid_ “hantu” untuk menyelesaikan persoalan batas Neumann pada batas-batas yang turunan pertamanya adalah nol. _Grid_ hantu diperlukan untuk menggunakan _finite difference_ metode pendekatan _center_. Sehingga pada $i=0$ (Batas kiri) berlaku

$$
\begin{align*}
\frac{\partial u}{\partial y} \approx \frac{u_{-1,j} - u_{1,j}}{2\Delta y} &= 0 \\
u_{-1,j} &= u_{1,j}
\end{align*}
$$

Sehingga dengan cara yang sama didapatkan batas untuk $j=0$ (Batas bawah)

$$
\begin{align*}
u_{i,-1} = u_{i,1}
\end{align*}
$$

Akan berlaku 16 persamaan pada model $N = 4$. Maka didapat

$$
\begin{align}
2au_{1,j}+bu_{0,j}+cu_{0,j+1}+cu_{0,j-1}&=f(x, y)\\

au_{i+1, j} + au_{i-1, j}+bu_{i, j}+cu_{i, j+1}+cu_{i, j-1} &=f(x, y)\\

au_{i+1, 0} + au_{i-1, 0}+bu_{i, 0}+2cu_{i, 1} &= f(x, y)\\

0\times 2u_{1, 0} +0\times u_{0, 0}+0 \times 2u_{0, 1} &= 0\\

\end{align}
$$

1. **Persamaan 1** berlaku untuk $i=0$ dengan $j=1,2,3$ (Batas kiri)
2. **Persamaan 2** berlaku pada $i=1,2$ dan $j=1,2$ (Grid tengah)
3. **Persamaan 3** berlaku pada $j=0$ dengan $i=1,2,3$ (Batas bawah)
4. **Persamaan 4** berlaku pada $i=0$ dengan $j=0$

Sehingga kombinasinya menghasilkan 11 persamaan yang berbeda. 5 persamaan terakhir adalah persamaan dari batas grid kanan dan atas. Dari keempat persamaan tersebut, dimasukkan nilai i dan j yang sesuai pada titi grid yang diinginkan.

---

Apabila dibentuk matriks koefisien, matriks besaran yang tidak diketahui (_unknown_) dan matriks hasil, terbentuk matriks sebagai berikut yang dapat dicari polanya

$$
\begin{align*}
 \begin{pmatrix}
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
c & b & c & 0 & 0 & 2a & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & c & b & c & 0 & 0 & 2a & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & c & b & c & 0 & 0 & 2a & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
a & 0 & 0 & 0 & b & 2c & 0 & 0 & a & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & a & 0 & 0 & c & b & c & 0 & 0 & a & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & a & 0 & 0 & c & b & c & 0 & 0 & a & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & a & 0 & 0 & 0 & b & 2c & 0 & 0 & a & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & a & 0 & 0 & c & b & c & 0 & 0 & a & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & a & 0 & 0 & c & b & c & 0 & 0 & a & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & a & 0 & 0 & 0 & b & 2c & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
u_{0,0} \\
u_{0,1} \\
u_{0,2} \\
u_{0,3} \\
u_{1,0} \\
u_{1,1} \\
u_{1,2} \\
u_{1,3} \\
u_{2,0} \\
u_{2,1} \\
u_{2,2} \\
u_{2,3} \\
u_{3,0} \\
u_{3,1} \\
u_{3,2} \\
u_{3,3}
\end{pmatrix}
=
\begin{pmatrix}
0 \\
f(x,y) \\
f(x,y) \\
f(x,y) \\
f(x,y) \\
f(x,y) \\
f(x,y) \\
g(x) \\
f(x,y) \\
f(x,y) \\
f(x,y) \\
g(x) \\
f(x,y) \\
h(y) \\
h(y) \\
h(y)
\end{pmatrix}
\end{align*}
$$

## Pencarian Pola

- Untuk batas kanan
  ```python
  ## Batas kanan
    for j in range(1, Ny):
      B[j + (shape - Ny)] = h(y[j])
  ```
- Untuk batas atas
  ```python
  ## Batas Atas
    for i in range(2, Nx + 1):
      B[i * Ny - 1] = g(x[i-1])
  ```
- Untuk batas bawah
  ```python
  # Batas Bawah
    for i in range(1, N):
      k = Ny * i
      B[k] = f(x[i],y[0])
      A[k, k] = b
      A[k, k+1] = 2*c
      if k+Ny < shape:
        A[k, k+Ny] = a
      A[k, k-Ny] = a
  ```
- Untuk batas kiri
  ```python
  ## Batas Kiri
    for j in range(1, Ny):
      B[j] = f(x[0],y[j])
      A[j, j] = b
      A[j, j+1] = c
      A[j, j-1] = c
      A[j, j+Ny] = 2*a
  ```
- Untuk Grid tengah
  ```python
  ## Grid Tengah
    for i in range(1, Nx - 1):
      for j in range(1, Ny - 1):
        k = i * Nx + j
        B[k] = f(x[i],y[j])
        A[k, k] = b
        A[k, k-1] = c
        A[k, k+1] = c
        A[k, k-Ny] = a
        A[k, k+Ny] = a
  ```

## Penyelesaian Sistem Persamaan Linier

Dalam kode yang diberikan, digunakan kode dari fungsi yang menyelesaikan sistem persamaan linier dengan metode Gauss-Jordan.

```python
def GaussJordan(A, b):
  Ab = np.column_stack((A, b))
  n, m = Ab.shape

  for i in range(n):
    # Divide the ith row by the ith pivot element
    pivot = Ab[i,i]
    Ab[i,:] /= pivot
    # Subtract multiples of the ith row from the other rows to eliminate their ith column entries
    for j in range(n):
      if j != i:
        factor = Ab[j,i]
        Ab[j,:] -= factor * Ab[i,:]

  # Extract the solution x from the transformed Ab
  x = Ab[:, -1]
  return x
```

Namun ketika diberi input yang banyak ($N_x$ dan $N_y$ yang sangat tinggi), maka kode tersebut akan sangat-sangat lama untuk menyelesaikan sistem persamaan linier. Maka digunakan fungsi bawaan dari library NumPy untuk menyelesaikan hal tersebut

```python
solx = np.linalg.solve(A, B)
```

Hal ini dapat terjadi karena pada dasarnya NumPy adalah kode C yang bisa berjalan dengan sangat cepat dan sangat dioptimasi untuk perhitungan matematis. Sedangkan fungsi Gauss-Jordan yang dibuat adalah _native python_, yang mana secara performa sangat jauh selisihnya dengan fungsi bawaan NumPy.

> Namun kedua kode tersebut akan memberikan hasil yang sama, tapi dengan waktu eksekusi fungsi NumPy yang jauh lebih pendek.

## Plot Grafik _Colormap_

![Untitled](/2D%20Mixed%20Boundaries%20Poisson%E2%80%99s%20Equation%20de5e218b0f8748d4bebb49adba7f6844/Untitled.png)

![Untitled](/2D%20Mixed%20Boundaries%20Poisson%E2%80%99s%20Equation%20de5e218b0f8748d4bebb49adba7f6844/Untitled%201.png)

## Resources

- Source Code : [Google Colaboratory](https://colab.research.google.com/drive/1pmpxk4d7EUaHkzbecqfWRdAwjhEa999z?usp=sharing)
