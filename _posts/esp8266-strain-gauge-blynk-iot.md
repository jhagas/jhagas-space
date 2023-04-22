---
title: 'Integrasi Strain Gauge dan Modul HX711 dengan Platform IoT Blynk'
desc: 'Dalam artikel ini, kami akan memandu Anda melalui proses persiapan dan kalibrasi strain gauge menggunakan modul HX711 dan mengintegrasikannya dengan platform IoT Blynk. Kami akan memberikan penjelasan tentang cara menginstal library ESP8266 di Arduino IDE, membuat akun Blynk, dan menginstal library HX711 Blynk di Arduino IDE. Akhirnya, kami akan memberikan contoh kode untuk membaca data dari sensor dan mengirimkannya ke Blynk.'
tags: 'Internet of Things'
coverImage: '/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/cover.png'
date: '2023-04-20'
author:
  name: Jhagas Hana Winaya
ogImage:
  url: '/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/cover.png'
---

Strain gauge dan modul HX711 (ADC dan Amplifier) sangat cocok mengukur berat pada berbagai aplikasi. Ketika dikombinasikan dengan platform IoT Blynk, kemungkinan analisis dan visualisasi data menjadi tak terbatas. Dalam artikel ini, kami akan memandu Anda melalui proses persiapan dan kalibrasi strain gauge menggunakan modul HX711 dan mengintegrasikannya dengan platform IoT Blynk. Kami juga akan memberikan penjelasan terperinci tentang cara menginstal library ESP8266 di Arduino IDE, membuat akun Blynk, dan menginstal library HX711 Blynk di Arduino IDE. Akhirnya, kami akan memberikan contoh kode yang dapat digunakan untuk membaca data dari sensor dan mengirimkannya ke Blynk.

## Persiapan

1. Setup pemasangan library ESP8266 di Arduino IDE
    - Pada Arduino IDE, pergi menuju **File** > **Preferences**
        
        ![Untitled](/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/Untitled.png)
        
    - Masukkan `http://arduino.esp8266.com/stable/package_esp8266com_index.json` **** pada form **“Additional Boards Manager URLs”** seperti gambar berikut. Lalu, klik tombol “OK”
        
        ![Untitled](/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/Untitled%201.png)
        
    - Buka Boards Manager. Menuju ke **Tools** > **Board** > **Boards Manager…**
        
        ![Untitled](/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/Untitled%202.png)
        
    - Ketik pada pencarian **ESP8266** dan tekan tombol install pada “**ESP8266 by ESP8266 Community”**
        
        ![Untitled](/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/Untitled%203.png)
        
    - Tunggu beberapa menit hingga terinstall seperti berikut
        
        ![Untitled](/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/Untitled%204.png)
        
2. Buat akun [Blynk](https://blynk.io/)
3. Install library pada Arduino IDE sebagai berikut
    - [https://github.com/bogde/HX711](https://github.com/bogde/HX711)
    - [https://github.com/blynkkk/blynk-library](https://github.com/blynkkk/blynk-library)
    

### Alat dan Bahan

1. **ESP8266** [NodeMCU 1.0 (ESP-12E Module)]
2. **LED Merah**
3. **Kabel Micro-USB**
4. ***Strain Gauge*** dan **HX711** (Modul ADC untuk konversi nilai resistansi *strain gauge* ke berat)
5. Siapkan koneksi Wi-Fi dengan mode 2.4Ghz

### Pin ESP8266

| PIN | Fungsi |
| --- | --- |
| D5 | DT HX711 (Strain Gauge) |
| D6 | SCK HX711 (Strain Gauge) |

![hx711.png](/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/hx711.png)
![Untitled](/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/Untitled%205.png)

## Proses Kalibrasi

1. Panggil fungsi `set_scale()` tanpa parameter.
2. Panggil fungsi `tare()` tanpa parameter.
3. Tempatkan beban yang telah diketahui beratnya pada timbangan dan panggil `get_units(10)`.
4. Bagi hasil pada langkah 3 dengan beban yang diketahui. Anda seharusnya mendapatkan parameter yang perlu Anda masukkan ke `set_scale()`.
5. Sesuaikan parameter pada langkah 4 sampai Anda mendapatkan bacaan yang akurat.

## Penyiapan Template (Virtual Pin) dan Device Pada Blynk

1. Buka aplikasi Blynk dan klik **New Project**.
2. Isi nama proyek dan pilih perangkat yang akan digunakan.
3. Pilih mode **Advanced** dan klik **Create**.
4. Klik **+ Widget** untuk menambahkan widget baru.
5. Pilih **Value Display** dan tarik ke area kerja.
6. Pilih **Virtual** dan pilih nomor **V0** (dengan tipe data `double`). Sesuaikan dengan kode pada bagian **Full Code (Arduino)** di bawah.
7. Copy dan Paste nilai `BLYNK_TEMPLATE_ID`, `BLYNK_TEMPLATE_NAME`, `BLYNK_AUTH_TOKEN` pada kode Arduino IDE anda
    
    ![Screenshot from 2023-04-20 19-49-54.png](/Technical%20Details%20Project%20Elka%2007de03e54f6142b4bdcfa3c385aadce3/Screenshot_from_2023-04-20_19-49-54.png)
    

## Full Code (Arduino)

```arduino
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include "HX711.h"

// HX711 circuit wiring
#define LOADCELL_DOUT_PIN D5
#define LOADCELL_SCK_PIN D6

#define BLYNK_TEMPLATE_ID "YOUR TEMPLATE ID"
#define BLYNK_TEMPLATE_NAME "YOUR TEMPLATE NAME"
#define BLYNK_AUTH_TOKEN "Your Auth Token"
#define BLYNK_PRINT Serial

char auth[] = BLYNK_AUTH_TOKEN;
char ssid[] = "SSID Wifi";
char pass[] = "Sandi Wifi";

BlynkTimer timer;
HX711 scale;

void myTimerEvent()
{
    Blynk.virtualWrite(V0, scale.get_units(10));
    Serial.println("SENDING DATA...");
}

void setup()
{
    Serial.begin(9600);
    Blynk.begin(auth, ssid, pass, "blynk.cloud", 80);

    Serial.println("Initializing the scale");
    scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
    scale.set_scale(747.7734); // nilai dari kalibrasi
    scale.tare();

    pinMode(D8, OUTPUT);

    timer.setInterval(3000L, myTimerEvent); // mengirim data tiap 3 detik
}

void loop()
{
    Blynk.run();
    timer.run(); // Initiates BlynkTimer
}
```

## Penjelasan Bagian-Bagian Code

1. Deklarasi Library yang digunakan
    
    ```arduino
    #include <Arduino.h>
    #include <ESP8266WiFi.h>
    #include <BlynkSimpleEsp8266.h>
    #include "HX711.h"
    ```
    
    Library `<Arduino.h>`, `<ESP8266WiFi.h>` dan `<BlynkSimpleEsp8266.h>` sudah diinstall pada tahap persiapan di atas.
    
2. Definisikan pin untuk memasang modul HX711
    
    ```arduino
    #define LOADCELL_DOUT_PIN D5
    #define LOADCELL_SCK_PIN D6
    
    HX711 scale;
    ```
    
3. Definisikan token dari Blynk dan Wifi yang akan disambungkan
    
    ```arduino
    #define BLYNK_TEMPLATE_ID "YOUR TEMPLATE ID"
    #define BLYNK_TEMPLATE_NAME "YOUR TEMPLATE NAME"
    #define BLYNK_AUTH_TOKEN "Your Auth Token"
    #define BLYNK_PRINT Serial
    
    char auth[] = BLYNK_AUTH_TOKEN;
    
    // Wifi yang akan disambungkan
    char ssid[] = "SSID Wifi";
    char pass[] = "Sandi Wifi";
    
    BlynkTimer timer;
    ```
    
4. Fungsi yang membaca data dari sensor dan mengirim data tersebut ke Blynk
    
    ```arduino
    void myTimerEvent()
    {
        Blynk.virtualWrite(V0, scale.get_units(10));
        Serial.println("SENDING DATA...");
    }
    ```
    
5. Void Setup
    
    ```arduino
    void setup()
    {
        Serial.begin(9600);
        Blynk.begin(auth, ssid, pass, "blynk.cloud", 80);
    
        Serial.println("Initializing the scale");
        scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
        scale.set_scale(747.7734);
        scale.tare();
    
        pinMode(D8, OUTPUT);
        timer.setInterval(3000L, myTimerEvent);
    }
    ```
    
    Banyak yang dilakukan di sini, secara garis besar adalah
    
    1. Penyambungan ke Wifi dan ke server Blynk, `"blynk.cloud:80"`
    2. Melakukan Zero Set awal pada strain gauge, `scale.tare();`
    3. Menjalankan fungsi `myTimerEvent` dalam interval 3 detik (3000 milidetik)
6. Void Loop
    
    ```arduino
    void loop()
    {
        Blynk.run();
        timer.run(); // Initiates BlynkTimer
    }
    ```
    
    Berguna untuk memastikan ESP8266 tetap tersambung ke blynk dan fungsi-fungsi di atas tetap berjalan sebagaimana mestinya.
    
## Kesimpulan

Dalam artikel ini, kami telah membahas bagaimana menggunakan strain gauge dan modul HX711 untuk mengukur berat pada berbagai aplikasi. Dalam kombinasi dengan platform IoT Blynk, kemungkinan analisis dan visualisasi data menjadi tak terbatas. Kami telah menjelaskan cara menginstal library ESP8266 di Arduino IDE, membuat akun Blynk, dan menginstal library HX711 Blynk di Arduino IDE. Kami juga memberikan contoh kode yang dapat digunakan untuk membaca data dari sensor dan mengirimkannya ke Blynk.

Dengan begitu, Anda sudah siap untuk memulai proyek Anda sendiri menggunakan strain gauge, modul HX711, dan platform IoT Blynk. Selamat mencoba!