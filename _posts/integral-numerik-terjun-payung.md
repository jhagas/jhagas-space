---
title: "Perbandingan 2 Metode Integral Numerik (Trapezoidal dan Simpson) Untuk Kasus Terjun Payung"
desc: "Penggunaan Integral Numerik Metode Trapezoidal dan Metode Simpson Pada Kasus Terjun Payung. Juga dijabarkan selisih (eror) kedua metode tersebut dari solusi eksak permasalahan"
tags: "Computational Physics"
coverImage: "/Terjun%20Payung%201aee79d9be594c1698a0e4512f6db34a/cover.png"
date: "2023-04-17"
author:
  name: Jhagas Hana Winaya
ogImage:
  url: "/Terjun%20Payung%201aee79d9be594c1698a0e4512f6db34a/cover.png"
---

Diketahui gaya yang bekerja pada benda yang terjatuh dengan medium udara adalah gaya berat serta gaya gesek yang merupakan fungsi kecepatan. Gaya berat dirumuskan secara matematis sebagai

$$
\begin{align*}
W = mg
\end{align*}
$$

Dengan $m$ adalah massa benda dan $g$ adalah percepatan gravitasi pada bumi yang bernilai $9,81\ m^2/s$. Sedangkan gaya gesek fluida (dalam kasus ini adalah udara) secara matematis dijabarkan sebagai berikut.

$$
\begin{align*}
f = -cv
\end{align*}
$$

Dengan $c$ adalah koefisien gesekan fluida (yang bergantung pada dimensi dan bentuk dari benda yang bergerak dan juga viskositas medium fluida) dan $v$ adalah kecepatan gerak benda. Nilai negatif selalu menandakan gaya gesek fluida arah vektornya selalu berkebalikan dengan arah vektor kecepatannya. Sehingga persamaan Hukum 2 Newton menjadi

$$
\begin{align*}
ma-mg+cv = 0
\end{align*}
$$

Yang merupakan persamaan diferensial orde pertama karena yang dicari adalah kecepatan dalam fungsi waktu. Maka persamaan menjadi

$$
\begin{align*}
\frac{dv}{dt}+\frac{c}{m}v = g
\end{align*}
$$

Penyelesaian persmaan diferensial di atas apabila kecepatan mula-mula bernilai nol adalah

$$
\begin{align*}
v(t) = \frac{mg}{c}(1-e^{-ct/m})
\end{align*}
$$

Diketahui kecepatan adalah turunan jarak terhadap waktu

$$
\begin{align*}
\frac{dx}{dt} &= \frac{mg}{c}(1-e^{-ct/m})\\
dx &= \frac{mg}{c}(1-e^{-ct/m}) \ dt
\end{align*}
$$

Lalu untuk mencari jarak yang ditempuh, dilakukan integral. Sehingga persamaan gerak menjadi

$$
\begin{align}
x(t) &= \frac{mg}{c} \int_0^t 1-e^{-ct/m} \ dt
\end{align}
$$

Dari persamaan dapat dicari posisi tiap satuan waktu menggunakan metode numerik, yakni menggunakan metode simpson dan trapezoida.

## PERMASALAHAN

Seorang penerjun penerjun turun dari pesawat dari ketinggian $1000\ m$ dengan kecepatan mengikuti persamaan. Diketahui massa penerjun $70\ kg$ dan koefisien gesek udara ($c=20\ kg/s$). cari posisi penerjun payung dari pesawat setelah 8 detik. dengan interval waktu 6.

## PENYELESAIAN

### Metode Eksak

$$
\begin{align*}
v(t)&=\int_a^bf(x)\ dt
\\
v(t)&= \frac{mg}{c}\int_0^t [1-e^{-ct/m}]\ dt
\\x(t)&= \frac{mg}{c}-\left[t+\frac{m}{c}e^{-ct/m}\right]^t_0
\\x(t)&= \frac{mg}{c}-\left[t+\frac{m}{c}e^{-ct/m}-\frac {m}c\right]
\\x(8)&= \frac{70 \times 9,8}{20}-\left[8+\frac{70}{20}e^{-20 \times 8/70}-\frac {70}{20}\right]
\\x(8)&=166,55925 \end{align*}


$$

#### Metode trapesium

$$
\begin{align*}
\int_a^bf(x)dx &\approx\sum_{i=1}^1c_if(x_i)
\\&=c_0f(x_0)+c_1f(x_1)
\\
&=\frac{h}{2}\left[f(x_0)+f(x_1)\right]
\end{align*}
$$

$$
\begin{align*}
\int_a^bf(x)dx&=\int_{N_0}^{N_1}f(x)dx+\int_{N_1}^{N_2}f(x)dx+...+\int_{N_{n-1}}^{N_n}f(x)dx

\\&=\frac{h}{2}[f(x_0)+f(x_1)]+\frac{h}{2}[f(x_1)+f(x_2)]+...\frac{h}{2}[f(x_{n-1})+f(x_n)]

\\&=\frac{h}{2}[f(x_0)+2f(x_1)+...+2f(x_i)+...+2f(x_{n-1})+2f(x_{n})]
\end{align*}
$$

Dengan

$$
\begin{align*}
h=\frac{b-c}{n}
\end{align*}
$$

Sehingga

$$
\begin{align*}
L_i&=\frac{1}{2}(f_i+f_{i+1})\ \Delta{x_i}
\\L&=\sum_{i=0}^{n-1}L_i
\end{align*}
$$

$$
\begin{align*}
L&=\sum_{i=0}^{n-1}\frac{1}{2}h(f_i+f_{i+1})\\
L&=\frac{h}{2}(f_i+2f_1+2f_2+...+2f_{n-1}+f_n)

\\L&=\frac{h}{2}(f_0+2\sum_{i=1}^{n-1}f_i+f_n)
\end{align*}
$$

##### Penyelesaian Menggunakan Metode Trapesium

1. Fungsi didefinisikan `y=f(t)`
2. Batas atas dan batas bawah ditentukan `a = [a(1), a(2)]`
3. Jumlah pembaginya ditentukan
4. Nilai `h = [a(1), a(2)] / 2`
5. Diketahui pada posisi $x(t)=L$, berlaku

   $$
   \begin{align*}
   L=\frac{h}{2}(f_0+2\sum_{i=1}^{n-1}f_i+f_n)

   \end{align*}
   $$

6. _Source code_ metode trapesium

   ```matlab
   c=20; m=70; g=9.8;
   a = [0,8]; %batasnya (xawal,xakhir)
   n = 4; %interval yang dipakai
   h = (a(2)-a(1)) / n;
   fff = 0;

   f = @(t)(m*g/c)*(1-exp(-c*t/m ));

   for i=1:n+1
   	if i == 1 || i == n+1
   		fff = fff + f(a(1));
   	else
   		fff = fff + 2*f(a(1));
   	end

   	a(1) = a(1) + h;
   end

   posisi = h/2*fff
   ```

   ![Untitled](/Terjun%20Payung%201aee79d9be594c1698a0e4512f6db34a/Untitled%201.png)

#### Metode Simpson 1/3

$$
\begin{align*}
L=\frac {h}{2} [f_0+4\sum_{i=ganjil}f_i+2\sum_{i=genap}f_i+f_n]
\end{align*}
$$

Dengan

$$
\begin{align*}
h=\frac {b-a} {n}
\end{align*}
$$

##### Penyelesaian menggunakan menggunakan metode simpson 1/3

1. fungsi didefinisikan `y = f(t)`
2. batas atas dan batas bawah ditentukan `a = [a(1), a(2)]`
3. jumlah pembaginya ditentukan
4. Nilai `h = [a(1), a(2)] / 2`
5. Diketahui pada posisi $x(t)=L$, berlaku

   $$
   \begin{align*}
   L=\frac {h}{2} [f_0+4\sum_{i=ganjil}f_i+2\sum_{i=genap}f_i+f_n]
   \end{align*}


   $$

6. _Source Code_ Metode Simpson

   ```matlab
   c=20; m=70; g=9.8;

   a = [0,8]; %batasnya
   n = 60; %intervalnya
   h = (a(2)-a(1)) / n;
   fff = 0;

   f = @(t)(m*g/c)*(1-exp(-c*t/m ));

   for i=1:n+1
   	if i == 1 || i == n+1
   		fff = fff + f(a(1));
   	elseif mod(i,2) == 0
   		fff = fff + 4*f(a(1));
   	elseif mod(i,2) == 1
   		fff = fff + 2*f(a(1));
   	end

   	a(1) = a(1) + h;
   end

   posisi = h/3*fff
   ```

   ![Untitled](/Terjun%20Payung%201aee79d9be594c1698a0e4512f6db34a/Untitled%202.png)

## PERHITUNGAN ERROR

$$
\begin{align*}
\text{Error} = \left|\frac{f_{\text{eksak}} - f_{\text{numerik}}} {f_{\text{eksak}}}\right| \times 100 \%
\end{align*}
$$

Dari hasil perhitungan, diketahui

$$
\begin{align*}
f_{\text{eksak}} &= 166,55925\ m\\
f_{\text{trapesium}} &= 163,640\ m\\
f_{\text{simpson}} &= 166,5593\ m\\

\end{align*}
$$

Sehingga dapat dihitung error

$$
\begin{align*}
\text{Error Metode Trapesium} = \left|\frac{166.55925 - 163.640}{166.55925}\right| \times 100\%
=1.7522\%
\end{align*}
$$

$$
\begin{align*}
\text{Error Metode Simpson} = \left|\frac{166.55925 - 166.640}{166.55925}\right| \times 100\%
=0.00002868\%
\end{align*}
$$

## PERBANDINGAN METODE TRAPESIUM DAN SIMPSON

![Pendekatan Menggunakan Metode Trapesium](/Terjun%20Payung%201aee79d9be594c1698a0e4512f6db34a/Untitled%203.png)

Pendekatan Menggunakan Metode Trapesium

![Pendekatan Menggunakan Metode Simpson](/Terjun%20Payung%201aee79d9be594c1698a0e4512f6db34a/Untitled%204.png)

Pendekatan Menggunakan Metode Simpson

Dari hasil integral yang diperoleh dengan menggunakan metode pendekatan trapesium dan simpson disimpulkan bahwa metode simpson jauh lebih akurat dengan error $0.00002868%$ dibandingkan dengan metode trapesium dengan error $1.7522%$. Hal tersebut diakibatkan karena metode simpson menggunakan pendekatan fungsi parabola sehingga jarak fungsi `x` dan fungsi pendekatan jarak nya hampir berhimpit (nilai pendekatan sangat mendekati nilai fungsi `x` ) yang diperjelas pada gambar perbandingan metode.
