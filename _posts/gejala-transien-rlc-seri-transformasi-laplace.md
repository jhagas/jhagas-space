---
title: 'Penyelesaian Gejala Transien Rangkaian RLC Seri dengan Transformasi Laplace'
desc: 'Penyelesaian dengan transformasi Laplace pada kasus gejala transien rangkaian RLC seri, dari hukum tegangan kirchhoff (KVL) hingga ke fungsi respons dari rangkaian RLC seri'
tags: 'Electronics'
coverImage: '/Gejala%20Transien%20Rangkaian%20RLC%20Seri%20dengan%20Transfor%209b4d8b5a8167419281fa7982d8a1be34/cover.png'
date: '2023-11-18'
author:
  name: Jhagas Hana Winaya
ogImage:
  url: '/Gejala%20Transien%20Rangkaian%20RLC%20Seri%20dengan%20Transfor%209b4d8b5a8167419281fa7982d8a1be34/cover.png'
---

Transformasi Laplace adalah alat matematika yang digunakan untuk mentransformasikan suatu fungsi waktu menjadi domain frekuensi kompleks. Dalam konteks rangkaian listrik, transformasi Laplace sangat berguna dalam menganalisis gejala transien pada rangkaian RLC seri.

Rangkaian RLC seri terdiri dari resistor $(R)$, induktor $(L)$, dan kapasitor $(C)$ yang disusun secara seri. Gejala transien terjadi saat rangkaian mengalami perubahan tiba-tiba, seperti ketika sumber listrik diputuskan. Penerapan transformasi Laplace pada rangkaian RLC seri memungkinkan kita untuk memprediksi dan memahami perilaku rangkaian saat mengalami gejala transien.

Dalam artikel blog ini, kita akan membahas lebih lanjut mengenai transformasi Laplace dan penerapannya pada rangkaian RLC seri. Kita akan menjelaskan konsep dasar transformasi Laplace, langkah-langkah penyelesaian gejala transien pada rangkaian RLC seri dengan transformasi Laplace.

## Transformasi Laplace

Transformasi Laplace adalah metode matematika yang digunakan dalam analisis sistem yang berubah terhadap waktu. Transformasi ini mengonversi fungsi waktu dari suatu sistem ke dalam domain frekuensi kompleks, yang disebut domain Laplace. Penerapannya dalam kehidupan sehari-hari juga dapat dilihat pada beberapa contoh, seperti:

1. Sistem pengolahan sinyal: Transformasi Laplace digunakan dalam pengolahan sinyal untuk menganalisis dan memproses sinyal analog. Dengan menggunakan transformasi Laplace, sinyal dapat diubah menjadi domain frekuensi yang lebih mudah untuk diproses dan dipahami.
2. Analisis rangkaian listrik kompleks: Transformasi Laplace memungkinkan insinyur listrik untuk menganalisis dan merancang rangkaian listrik yang kompleks, seperti filter, amplifier, dan sistem kontrol. Dengan menggunakan transformasi Laplace, karakteristik dan respons rangkaian dapat dipelajari dengan lebih efisien.

Transformasi Laplace didefinisikan oleh rumus berikut

$$
\begin{align*}
F(s) = \mathscr{L} \{ f(t) \} = \int_0^\infty e^{-st} f(t) \ dt
\end{align*}
$$

Sementara invers tranformasi laplace didefinisikan oleh rumus berikut

$$
\begin{align*}
f(t) = \mathscr{L}^{-1}\left [F(s) \right] = \int_{\sigma -j\infty }^{\sigma + j\infty } F\left ( s \right )e^{st}\ ds
\end{align*}
$$

di mana:

- $F(s)$ adalah transformasi Laplace dari fungsi $*f(t)*$ terhadap variabel waktu $*t*$,
- $s$ adalah variabel kompleks,
- $t$ adalah waktu,
- $\mathscr{L}$ adalah operator transformasi Laplace.

Transformasi Laplace berguna karena dapat mengubah persamaan diferensial biasa (ODE) atau sistem persamaan diferensial parsial (PDE) menjadi persamaan aljabar dalam variabel $s$, yang jauh lebih mudah untuk diselesaikan.

Penyelesaian juga bisa dilakukan dengan menggunakan tabel umum transformasi Laplace. Berikut beberapa penyelesaian transformasi Laplace yang akan digunakan pada artikel ini

| Fungsi Waktu | Fungsi Frekuensi |
| --- | --- |
| $f(t)$ | $F(s)$ |
| 0 | 0 |
| $\frac{df(t)}{dt}$ | $sF(s) - F(0)$ |
| $\int_0^t f(t)\ dt$ | $\frac{F(s)}{s}$ |
| $\frac{1}{b-a} \left( e^{-at} - e^{-bt} \right)$ | $\frac{1}{(s+a)(s+b)}$ |

## Penyelesaian Gejala Transien RLC Seri Dengan Transformasi Laplace

Untuk menyelesaikan Digunakan Hukum Tegangan Kirchhoff untuk menyelesaikan loop dari rangkaian RLC Seri

![Cuplikan layar 2023-11-18 093347.png](/Gejala%20Transien%20Rangkaian%20RLC%20Seri%20dengan%20Transfor%209b4d8b5a8167419281fa7982d8a1be34/Cuplikan_layar_2023-11-18_093347.png)

Karena pada $t=0$, rangkaian di putus, maka tidak ada sumber listrik yang ada pada rangkaian. $\epsilon = 0 \ V$. Sehingga Hukum Tegangan Kirchhoff menghasilkan persamaan sebagai berikut

$$
\begin{align*}
\sum V &= 0\\
Ri(t) + \frac1C \int i(t)\ dt\ + L\frac{di(t)}{dt} &= 0
\end{align*}
$$

Kita lakukan transformasi Laplace untuk menyelesaikan persamaan dari Hukum Tegangan Kirchhoff

$$
\begin{align*}
\mathscr{L}\left[ Ri(t) + \frac1C \int i(t)\ dt\ + L\frac{di(t)}{dt} \right] = \mathscr{L}\left[0\right]
\end{align*}
$$

Seperti yang telah dijelaskan di atas, transformasi Laplace dapat dilakukan dengan cara menyelesaikan integral transformasi Laplace, atau dengan tabel penyelesaian. Agar lebih mudah, digunakan tabel untuk menyelesaikan transformasi Laplace. Apabila diurai persukunya, hasil transformasinya adalah

1. **Untuk suku tegangan resistor**

$$
\begin{align*}
\mathscr{L}\left[ Ri(t) \right] = RI(s)
\end{align*}
$$

1. **Untuk suku tegangan kapasitor**
    
    $$
    \begin{align*}
    \mathscr{L}\left[ \frac1C \int i(t)\ dt\ \right] = \frac{I(t)}{Cs} + \frac{V(0)}{s}
    \end{align*}
    $$
    
    $\frac{V(0)}{s}$ adalah suku tambahan yang merepresentasikan tegangan awal dari sebuah kapasitor, karena saklar diputuskan pada $t=0$
    
2. **Untuk suku tegangan induktor**
    
    $$
    \begin{align*}
    \mathscr{L}\left[ L\frac{di(t)}{dt} \right] = L sI(s) - Li(0)
    \end{align*}
    $$
    
    Karena saklar diputus pada $t=0$, maka tidak ada lagi arus yang mengalir pada rangkaian pada $t=0$. Sehingga $i(0) = 0$, maka
    
    $$
    \begin{align*}
    \mathscr{L}\left[ L\frac{di(t)}{dt} \right] = L sI(s)
    \end{align*}
    $$
    

Selanjutnya, hasil keseluruhan dari transformasi Laplace pada gejala transien rangkaian RLC seri adalah

$$
\begin{align*}
RI(s)+ \frac{I(s)}{Cs} + \frac{V(0)}{s} + L sI(s) = 0
\end{align*}
$$

Selanjutnya kita isolasi $I(s)$ dari persamaan, sehingga hasilnya adalah

$$
\begin{align*}
I(s) &= - \frac{V(0)}{Rs + Ls^2 +\frac1C}\\
I(s)&= -\frac{V(0)}{L} \left( \frac{1}{s^2+\frac{R}{L}s+\frac{1}{LC}} \right)\\
I(s)&= -\frac{V(0)}{L} \left( \frac{1}{(s+a)(s+b)} \right)
\end{align*}
$$

Dengan rumus ABC (penyelesaian persamaan kuadratik), nilai dari $a$ dan $b$ adalah

$$
\begin{align*}
a, b = -\frac{R}{2L} \pm \frac1{2L} \sqrt{R^2 - \frac{4L}{C}}
\end{align*}
$$

Selanjutnya, pada persamaan $I(s)$ dilakukan invers transformasi Laplace

$$
\begin{align*}
\mathscr{L}^{-1} [I(s)] = \mathscr{L}^{-1} \left[ -\frac{V(0)}{L} \left( \frac{1}{(s+a)(s+b)} \right) \right]
\end{align*}
$$

yang hasilnya adalah

$$
\begin{align*}
i(t) = -\frac{V(0)}{L\ (b-a)} \left( e^{-at} - e^{-bt} \right)
\end{align*}
$$

Kita dapat misalkan, karena suku di luar kurung adalah koefisien yang konstan maka

$$
\begin{align*}
A = \frac{V(0)}{L\ (b-a)}
\end{align*}
$$

Selanjutnya kita masukkan permisalan $a$ dan $b$ yang telah kita buat tadi

$$
\begin{align*}
i(t) &= -A\left( e^{\frac{Rt}{2L} - \frac{t}{2L} \sqrt{R^2 - \frac{4L}{C}}} - e^{\frac{R}{2L} + \frac{t}{2L} \sqrt{R^2 - \frac{4L}{C}}} \right)\\
i(t) &= -A e^{-\frac{Rt}{2L}} \left( e^{\frac{t}{2L} \sqrt{R^2 - \frac{4L}{C}}} - e^{- \frac{t}{2L} \sqrt{R^2 - \frac{4L}{C}}} \right)\\
\end{align*}
$$

Dan persamaan terakhir ini adalah fungsi transfer dari gejala transien pada rangkaian RLC seri. 

## Interpretasi Fisis

Apabila ditelisik lebih jauh, persamaan di atas sangat mirip dengan persamaan getaran teredam dengan 3 kemungkinan yang sama pula. Kita coba interpretasikan setiap bagian dalam persamaan tersebut

- $i(t)$ adalah arus dalam rangkaian sebagai fungsi waktu $(t)$.
- $A$ merupakan amplitudo arus maksimum dalam rangkaian.
- $e^{-\frac{Rt}{2L}}$ adalah faktor eksponensial yang mengekspresikan perubahan arus seiring dengan waktu. bagian ini menyebabkan arus terus menurun (mendekati nol) seiring dengan berjalannya waktu, dan laju penurunannya ditentukan oleh nilai resistansi $(R)$ dan induktansi $(L)$.

Yang paling menarik dari interpretasi fisis persamaan respons ini adalah bagian terakhirnya, di mana nilai-nilai komponen penyusun rangkaian akan sangat mempengaruhi dengan apa yang akan terjadi pada rangkaian.

$$
\begin{align*}
e^{\frac{t}{2L} \sqrt{R^2 - \frac{4L}{C}}} - e^{- \frac{t}{2L} \sqrt{R^2 - \frac{4L}{C}}}
\end{align*}
$$

Sebelumnya perlu diingat lagi tentang persamaan Euler

$$
\begin{align*}
e^{j\omega t} = \cos(\omega t) + j \sin(\omega t)
\end{align*}
$$

$j$ di sini adalah **imajiner**, yang ditulis demikian agar tidak rancu dengan $i$ sebagai arus. Secara definisi, $j = \sqrt{-1}$. Sehingga apabila di dalam akar nilainya negatif, maka pasti akan muncul $j$ atau nilainya imajiner. Sehingga apabila bilangan Euler $(e)$ dipangkatkan nilai imajiner, pasti akan terjadi osilasi atau getaran, karena ada $\cos$  dan $\sin$, sesuai dengan definisi persamaan Euler.

Sehingga pada bagian terakhir ini terdapat 3 kemungkinan keadaan yang berpengaruh ke fungsi respons rangkaian

![Untitled](/Gejala%20Transien%20Rangkaian%20RLC%20Seri%20dengan%20Transfor%209b4d8b5a8167419281fa7982d8a1be34/Untitled.png)

### Kemungkinan pertama : ***Underdamped***

Hal ini terjadi ketika di dalam akar $\sqrt{R^2 - \frac{4L}{c}}$ nilainya negatif, atau $R^2 < \frac{4L}{C}$. Karena di dalam akar nilainya negatif, maka pada keadaan ini akan terjadi osilasi pada rangkaian. Seperti yang sudah dijelaskan di atas. Kecepatan sudut osilasi pada keadaan ini adalah

$$
\begin{align*}
\omega = \frac{1}{2L} \sqrt{\frac{4L}{C} - R^2}
\end{align*}
$$

Sehingga frekuensi dari keadaan ini adalah

$$
\begin{align*}
\omega &= 2\pi f\\
f &= \frac{\omega}{2\pi}\\
f &= \frac{1}{4\pi L} \sqrt{\frac{4L}{C} - R^2}
\end{align*}

$$

### Kemungkinan kedua : ***Critical damped***

Hal ini terjadi ketika di dalam akar $\sqrt{R^2 - \frac{4L}{c}}$ nilainya nol, atau $R^2 = \frac{4L}{C}$. Karena di dalam akar nilainya nol, dan tidak ada nilai imajiner di sini, maka pada keadaan ini **TIDAK AKAN** terjadi osilasi pada rangkaian.

### Kemungkinan ketiga : ***Overdamped***

Hal ini terjadi ketika di dalam akar $\sqrt{R^2 - \frac{4L}{c}}$ nilainya positif, atau $R^2 > \frac{4L}{C}$. Karena di dalam akar nilainya positif, dan tidak ada nilai imajiner di sini, maka pada keadaan ini **TIDAK AKAN** terjadi osilasi pada rangkaian.

## Kesimpulan

Dalam artikel ini, kita telah membahas tentang transformasi Laplace dan penerapannya dalam menganalisis gejala transien pada rangkaian RLC seri. Transformasi Laplace adalah alat yang sangat berguna dalam mentransformasikan fungsi waktu menjadi domain frekuensi kompleks, memungkinkan kita untuk memprediksi dan memahami perilaku rangkaian saat mengalami perubahan tiba-tiba (gejala transien).

Dalam konteks rangkaian RLC seri, kita telah menjelaskan langkah-langkah penyelesaian gejala transien menggunakan transformasi Laplace. Dengan menggabungkan hukum Kirchhoff dan transformasi Laplace, kita dapat menganalisis respons rangkaian terhadap perubahan tiba-tiba, seperti ketika sumber listrik diputuskan.

Penerapan transformasi Laplace dalam kehidupan sehari-hari juga sangat luas. Contohnya, dalam sistem pengolahan sinyal, transformasi Laplace digunakan untuk menganalisis dan memproses sinyal analog. Selain itu, transformasi Laplace juga memungkinkan insinyur listrik untuk merancang rangkaian listrik kompleks, seperti filter, amplifier, dan sistem kontrol.

Dengan memahami konsep dasar transformasi Laplace dan langkah-langkah penyelesaian gejala transien pada rangkaian RLC seri, kita dapat lebih memahami dan menerapkan prinsip-prinsip ini dalam pengembangan dan analisis rangkaian listrik.