---
title: 'Monitoring dan Data Logging Sensor dengan Platform Database Supabase dan Aplikasi Web React.js '
desc: 'Dalam artikel ini, akan dijelaskan secara mendetail bagaimana cara melakukan monitoring dan data logging sensor dengan menggunakan IoT dan platform database Supabase.'
tags: 'Internet of Things'
coverImage: '/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/cover.png'
date: '2023-04-24'
author:
  name: Jhagas Hana Winaya
ogImage:
  url: '/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/cover.png'
---

Dalam era digital seperti sekarang ini, Internet of Things (IoT) semakin populer dan banyak digunakan dalam berbagai bidang. Salah satu aplikasi IoT yang sering digunakan adalah dalam monitoring dan data logging sensor. Dengan menggunakan IoT, kita dapat mengakses data sensor dari jarak jauh dan melakukan pengolahan data secara real-time.

Namun, untuk melakukan monitoring dan logging data sensor dengan IoT, dibutuhkan platform database yang dapat menyimpan data tersebut. Salah satu platform database yang dapat digunakan adalah Supabase. Supabase adalah platform open source yang menyediakan layanan database dan authentication. Keunggulan Supabase daripada blynk adalah fleksibilitas yang ditawarkan. Serta dari segi biaya, Supabase menggratiskan penggunaan fitur data logging yang bisa disesuaikan dengan kebutuhan kita.

Dalam artikel ini, akan dijelaskan bagaimana cara melakukan monitoring dan data logging sensor dengan menggunakan IoT dan platform database Supabase.

## Persiapan

1. Buat akun/Sign-up [GitHub](https://github.com/) (Ingat email dan kata sandi anda pakai untuk mendaftar). Lewati jika sudah memiliki akun GitHub.
2. Siapkan **ESP8266** sebagai perangkat IoT berbasis mikrokontroler, **DHT22** sebagai sensor suhu dan kelembaban.
3. Koneksi internet Wi-Fi 2.45 GHz untuk disambungkan pada ESP8266, bisa menggunakan hotspot pribadi dari ponsel pintar.
4. Koneksi internet yang lancar pada komputer anda.
5. Install Arduino IDE dan dukungan untuk ESP8266
    1. Pada Arduino IDE, pergi menuju **File** > **Preferences**
        
        ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled.png)
        
    2. Masukkan `http://arduino.esp8266.com/stable/package_esp8266com_index.json` **** pada form **“Additional Boards Manager URLs”** seperti gambar berikut. Lalu, klik tombol “OK”
        
        ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%201.png)
        
    3. Buka Boards Manager. Menuju ke **Tools** > **Board** > **Boards Manager…**
        
        ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%202.png)
        
    4. Ketik pada pencarian **ESP8266** dan tekan tombol install pada “**ESP8266 by ESP8266 Community”**
        
        ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%203.png)
        
    5. Tunggu beberapa menit hingga terinstall seperti berikut
        
        ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%204.png)
        

## Persiapan Supabase

- Buat akun [Supabase](https://supabase.com) (login melalui GitHub) dan buat project baru (New Project) lalu pilih ***free tier*** dan **server Singapura,** tunggu beberapa saat hingga project selesai dibuat
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%205.png)
    
- Setelah project selesai dibuat, masuk ke bagian ini (lihat gambar)
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%206.png)
    
- Lalu pilih **New Query** dan masukkan nama query anda. Sebagai contoh, “**buat tabel**”
- Masukkan kode berikut pada editor dan klik RUN

```sql
create table data (
  time timestamp with time zone default timezone('utc'::text, now()) not null PRIMARY KEY,
  data json,
  refresh int4
);

alter publication supabase_realtime add table data;
```

---

- Langkah terakhir adalah untuk mencatat Project URL dan API KEY
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%207.png)
    
    dalam contoh ini (project yang saya buat)
    
| PROJECT_URL | https://pmtntcvniacqbzuafytw.supabase.co                                                                                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API_KEY     | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdG50Y3ZuaWFjcWJ6dWFmeXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEzNTgyOTUsImV4cCI6MTk4NjkzNDI5NX0.HbRBJwbgQgZc1xhnoC8z1nRsF7_8YtX-p2ZChtCVXKM |

## Device ESP8266

![gambar.png](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/gambar.png)

### Library Yang Diperlukan

Dibutuhkan beberapa library untuk menjalankan kode untuk ESP8266, install melalui Tools > Manage Libraries. Dan lakukan pencarian sesuai dengan library yang dibutuhkan

![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%208.png)

![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%209.png)

![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2010.png)

![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2011.png)

![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2012.png)

![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2013.png)

### Kode Arduino

Pastikan untuk mengganti `PROJECT_URL` dan `API_KEY` sesuai dengan apa yang telah dicatat pada proses pembuatan database supabase sebelumnya

```arduino
#include <WiFiManager.h>
#include "ArduinoJson.h"
#include "DHT.h"
#include <ESP32_Supabase.h>
#include <arduino-timer.h>

const String url = "PROJECT_URL";
const String apikey = "API_KEY";

// Memulai library untuk sensor
#define DHTPIN D6
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

Supabase db;
auto timer = timer_create_default();

const unsigned long timeDelay = 30 * 1000; // pengiriman data tiap 30 detik

// tambahkan/kurangi sensor sesuai kebutuhan anda
const int jumlahSensor = 2;
String name[jumlahSensor] = {"Suhu", "Kelembapan Relatif"};
String type[jumlahSensor] = {"temperature", "relativeHumidity"};
String unit[jumlahSensor] = {"°C", "%"};
float value[jumlahSensor];

bool dataSend(void *argument)
{
  value[0] = dht.readTemperature();
  value[1] = dht.readHumidity();

  String httpReqData = "";
  StaticJsonDocument<1024> doc;
  doc["refresh"] = timeDelay;
  JsonArray data = doc.createNestedArray("data");

  for (int i = 0; i < jumlahSensor; i++)
  {
    JsonObject sensor = data.createNestedObject();
    sensor["name"] = name[i];
    sensor["type"] = type[i];
    sensor["unit"] = unit[i];
    sensor["value"] = value[i];
  }
  serializeJson(doc, httpReqData);
  int code = db.insert("record", httpReqData, false);
  Serial.println(code);

  return true;
}

void setup()
{
  Serial.begin(9600);

  WiFiManager wm;
  bool res;
  res = wm.autoConnect("Sensormu", "sensormu");
  if (!res)
  {
    Serial.println("Koneksi gagal, restart perangkat Sensormu");
    ESP.restart();
  }

  dht.begin();
  db.begin(url, apikey);

  timer.every(timeDelay, dataSend);
}

void loop()
{
  timer.tick(); // tick the timer
}
```

## Hosting Website Tampilan Data Via Netlify

1. Masuk ke akun GitHub anda lewat laptop/PC anda (lewati jika sudah)
2. Buka halaman repository [GitHub](https://github.com/jhagas/greenhouse-ui) ini dan fork agar repository di gandakan menuju akun GitHub anda
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2014.png)
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2015.png)
    
3. Buka [https://app.netlify.com](https://app.netlify.com/) dan Login dengan GitHub. Lalu otorisasi Netlify untuk membaca repository publik anda, seperti gambar berikut
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2016.png)
    
4. Lalu pilih “School”, scroll lalu klik “Save and Continue”
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2017.png)
    
5. Klik “Import from Git” lalu pilih GitHub. Setelah itu, klik “Authorize Netlify”
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2018.png)
    
6. Isi “All Repository” lalu klik “Install”
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2019.png)
    
7. Pilih repository anda, dalam hal ini “greenhouse-ui”
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2020.png)
    
8. Klik “Costumize Build Setting”
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2021.png)
    
9. dan klik “Costumize More Setting”
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2022.png)
    
10. Tambahkan dua Environment Variable dan masukkan nilainya dengan value yang telah didapat pada database pada part sebelumnya.
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2023.png)
    
    Key diisi seperti pada tabel berikut dengan value menyesuaikan dengan supabase anda
    
    | Key                         | Value                                                                                                                                                                                                            |
    | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | REACT_APP_SUPABASE_URL      | https://pmtntcvniacqbzuafytw.supabase.co                                                                 |
    | REACT_APP_SUPABASE_ANON_KEY | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdG50Y3ZuaWFjcWJ6dWFmeXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEzNTgyOTUsImV4cCI6MTk4NjkzNDI5NX0.HbRBJwbgQgZc1xhnoC8z1nRsF7_8YtX-p2ZChtCVXKM |
11. Lalu klik “Deploy Site”
12. Setelah selesai melakukan deployment, ubah domain situs anda (opsional)
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2024.png)
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2025.png)
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2026.png)
    
13. Klik bagian “Deploys” dan lakukan langkah sesuai pada gambar
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2027.png)
    
14. Setelah selesai akan ada tulisan **Site is live** seperti pada gambar berikut
    
    ![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2028.png)
    
15. Selamat, situs anda sudah dapat dibuka pada domain tautan yang anda tentukan. Perlu diperhatikan bahwa perlu setidaknya SATU data yang dikirim dari ESP8266 agar situs ini berfungsi optimal.

## Hasil Akhir Tampilan

![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2029.png)

![Untitled](/Monitoring%20dan%20Data%20Logging%20Sensor%20dengan%20IoT%20dan%20%200e06e2026cec46f295ca003142f51db3/Untitled%2030.png)

Dengan teknologi IoT dan database yang semakin berkembang, kita dapat mengembangkan berbagai aplikasi dan sistem yang dapat membantu memantau dan mengelola data secara efektif dan efisien. Dalam artikel ini, kita telah mengajarkan cara membuat sistem monitoring dan data logging sensor yang dapat diakses secara real-time dari mana saja, serta melakukan analisis data dengan cepat dan akurat. Semoga tutorial ini memberikan manfaat bagi pembaca untuk memulai proyek-proyek baru yang berkaitan dengan IoT dan database, serta mengembangkan solusi-solusi yang lebih baik di masa depan.
