---
title: 'Optimasi Terkonstrain dengan Pengali Lagrange Pada MATLAB'
desc: 'Implementasi metode pengali lagrange dalam permasalahan optimasi terkonstrain dengan manipulasi fungsi objektif dan matriks jacobian menggunakan bahasa pemrograman MATLAB'
tags: 'Computational Physics'
coverImage: '/optimasi-terkonstrain/cover.png'
date: '2023-05-19'
author:
  name: Naufal Dhyaudin Hibatulah
ogImage:
  url: '/optimasi-terkonstrain/cover.png'
---

## Persoalan

Diberikan suatu fungsi $f(x,y)=2x+3y-x^3-2y^2$ dan beberapa konstrain yang harus terpenuhi, yaitu

$$
x+3y-\frac{x^2}{2}\le\frac{11}{2}
$$

$$
5x+2y+\frac{x^2}{10}\le10
$$

Cari titik minimum fungsi tersebut pada konstrain yang diberikan.

## Pembentukan Lagrangian dan Fungsi Objektif

Dalam kasus ini terdapat 2 *********************inequality constrain********************* sehingga konstrain tersebut perlu diubah menjadi ******************equality constrain******************. Kita bisa menganggap ada satu variabel pada tiap konstrain yang menyebabkan **********inequality********** tersebut, yaitu $\theta_1^2$ dan $\theta_2^2$. Dengan demikian, kedua konstrain tersebut menjadi

$$
\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2}=0
$$

$$
\theta_2^2+5x+2y+\frac{x^2}{10}-10=0
$$

Lagrangian fungsi dengan kedua konstrain tersebut adalah

$$
L=(2x+3y-x^3-2y^2)+\lambda_1(\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2})+\lambda_2(\theta_2^2+5x+2y+\frac{x^2}{10}-10)
$$

Dalam rangka mendapatkan nilai optimum masing-masing parameter, turunan pertama lagrangian pada setiap parameter harus bernilai nol.

$$
\frac{\partial L}{\partial x}=2-3x^2+\lambda_1(1-x)+\lambda_2(5+\frac{x}{5})=0
$$

$$
\frac{\partial L}{\partial y}=3-4y+3\lambda_1+2\lambda_2=0
$$

$$
\frac{\partial L}{\partial \lambda_1}=\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2}=0
$$

$$
\frac{\partial L}{\partial \lambda_2}=\theta_2^2+5x+2y+\frac{x^2}{10}-10=0
$$

$$
\frac{\partial L}{\partial \theta_1}=2{\lambda_1}{\theta_1}=0
$$

$$
\frac{\partial L}{\partial \theta_2}=2{\lambda_2}{\theta_2}=0
$$

Pada persamaan $2{\lambda_1}{\theta_1}=0$ dan $2{\lambda_2}{\theta_2}=0$, kita bisa mengasumsikan pembuat nol masing-masing *********statement********* dengan beberapa kasus, yaitu $\theta_1=\theta_2=0$, $\theta_1=\lambda_2=0$, $\lambda_1=\theta_2=0$, dan $\lambda_1=\lambda_2=0$.

Fungsi objektif dalam penyelesaian dengan optimasi terkonstrain terbentuk dari 6 persamaan di atas. Pada kasus pertama, fungsi objektif dapat dibentuk dengan mensubstitusikan $\theta_1=\theta_2=0$ sehingga

$$
f=\begin{bmatrix}{2-3x^2+\lambda_1(1-x)+\lambda_2(5+\frac{x}{5})}\\{3-4y+3\lambda_1+2\lambda_2}\\{x+3y-\frac{x^2}{2}-\frac{11}{2}}\\{5x+2y+\frac{x^2}{10}-10}\end{bmatrix}
$$

Pada kasus kedua, fungsi objektif dapat dibentuk dengan mensubstitusikan $\theta_1=\lambda_2=0$ sehingga

$$
f=\begin{bmatrix}{2-3x^2+\lambda_1(1-x)}\\{3-4y+3\lambda_1}\\{x+3y-\frac{x^2}{2}-\frac{11}{2}}\\{\theta_2^2+5x+2y+\frac{x^2}{10}-10}\end{bmatrix}
$$

Pada kasus ketiga, fungsi objektif dapat dibentuk dengan mensubstitusikan $\lambda_1=\theta_2=0$ sehingga

$$
f=\begin{bmatrix}{2-3x^2+\lambda_2(5+\frac{x}{5})}\\{3-4y+2\lambda_2}\\{\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2}}\\{5x+2y+\frac{x^2}{10}-10}\end{bmatrix}
$$

Terakhir, pada kasus ketiga, fungsi objektif dapat dibentuk dengan mensubstitusikan $\lambda_1=\lambda_2=0$ sehingga

$$
f=\begin{bmatrix}{2-3x^2}\\{3-4y}\\{\theta_1^2+x+3y-\frac{x^2}{2}-\frac{11}{2}}\\{\theta_2^2+5x+2y+\frac{x^2}{10}-10}\end{bmatrix}
$$

## Penyelesaian dengan Algoritma Pemrograman

Implementasi keempat fungsi objektif tersebut ke dalam source code adalah dengan mendefinisikan *********function funcobj(X)********* yang menerima parameter X. Untuk $\theta_1=\theta_2=0$,

```matlab
function f=funcobj(X)
f = [(2-3*X(1)^2+X(3)*(1-X(1))+X(4)*(5+X(1)/5));(3-4*X(2)+3*X(3)+2*X(4));
    (X(1)+3*X(2)-X(1).^2/2-5.5);(5*X(1)+2*X(2)+X(1).^2/10-10)];
end
```

Untuk $\theta_1=\lambda_2=0$,

```matlab
function f=funcobj(X)
f = [(2-3*X(1)^2+X(3)*(1-X(1)));(3-4*X(2)+3*X(3));
    (X(1)+3*X(2)-X(1).^2/2-5.5);(X(4)+5*X(1)+2*X(2)+X(1).^2/10-10)];
end
```

Untuk $\lambda_1=\theta_2=0$,

```matlab
function f=funcobj(X)
f = [(2-3*X(1)^2+X(4)*(5+X(1)/5));(3-4*X(2)+2*X(4));
    (X(3)+X(1)+3*X(2)-X(1).^2/2-5.5);(5*X(1)+2*X(2)+X(1).^2/10-10)];
end
```

Untuk $\lambda_1=\lambda_2=0$,

```matlab
function f=funcobj(X)
f = [(2-3*X(1)^2);(3-4*X(2));
    (X(3)+X(1)+3*X(2)-X(1).^2/2-5.5);(X(4)+5*X(1)+2*X(2)+X(1).^2/10-10)];
end
```

Metode optimasi terkonstrain dilakukan pada ************source code************ utama dengan memanggil ******************function jacobian(X)****************** yang menerima parameter X dan mengembalikan parameter **f0** dan matriks ***jac***. Kedua parameter tersebut akan di-*******passing******* ke dalam ************source code************  utama.

```matlab
function [f0,jac]=jacobian(x)
h = 1.0e-4;
n = length(x);
jac = zeros(n,n);
f0 = funcobj(x);
for i = 1:n
    temp = x(i);
    x(i) = temp + h;
    f1 = funcobj(x);
    x(i) = temp;
    jac(:,i) = (f1 - f0)/h;
end
```

```matlab
clc;close all;clear all;
X(1,:) = [1 1 1 1];
niter=30;tol=1e-6;
for i=1:niter-1
    [f,dp]=jacobian(X(i,:));
    dX=inv(dp)*f;
    X(i+1,:)=X(i,:)'-dX;
    fprintf('Iteration=%i Solusi=%.4f \n',i,X(i+1))
    if abs(X(i+1,:)-X(i,:))<tol
        r=X(i+1,:);
        disp('Solusi konvergence')
        break
    end
end
x=r(1);y=r(2);theta_1=r(3);theta_2=r(4);
f = 2*x+3*y-x^3-2*y^2;
disp('Case 4')
disp(['x=' num2str(x) ',y=' num2str(y),'f=' num2str(f)])
disp(['theta_1=' num2str(theta_1) ',theta_2=' num2str(theta_2)])
```

Solusi ****case**** 1 dimana $\theta_1=\theta_2=0$

```matlab
Iteration=1 Solusi=1.3013 
Iteration=2 Solusi=1.2941 
Iteration=3 Solusi=1.2941 
Iteration=4 Solusi=1.2941 
Solusi konvergence
Case 1
x=1.2941,y=1.6811f=-0.18777
lambda_1=0.82726,lambda_2=0.62127
```

Solusi ****case**** 2 dimana $\theta_1=\lambda_2=0$

```matlab
Iteration=1 Solusi=1.5079 
Iteration=2 Solusi=1.4826 
Iteration=3 Solusi=1.4826 
Iteration=4 Solusi=1.4826 
Solusi konvergence
Case 3
x=1.4826,y=1.1837f=0.45528
theta_1=1.5654,lambda_2=0.86737
```

Solusi *****case***** 3 dimana $\lambda_1=\theta_2=0$

```matlab
Iteration=1 Solusi=0.8571 
Iteration=2 Solusi=0.8526 
Iteration=3 Solusi=0.8526 
Iteration=4 Solusi=0.8526 
Solusi konvergence
Case 2
x=0.85261,y=1.6703f=0.51656
lambda_1=1.227,theta_2=2.3237
```

Solusi ******case****** 4 dimana $\lambda_1=\lambda_2=0$

```matlab
Iteration=1 Solusi=0.8333 
Iteration=2 Solusi=0.8167 
Iteration=3 Solusi=0.8165 
Iteration=4 Solusi=0.8165 
Solusi konvergence
Case 4
x=0.8165,y=0.75f=2.2137
theta_1=2.7668,theta_2=4.3509
```