# Eliza (เอไลซ่า) 🤖

<div align="center">
  <img src="./docs/static/img/eliza_banner.jpg" alt="Eliza Banner" width="100%" />
</div>

<div align="center">

  📖 [คู่มือ](https://ai16z.github.io/eliza/) | 🎯 [ตัวอย่าง](https://github.com/thejoven/awesome-eliza)

</div>

## ✨ ฟีเจอร์

-   🛠️ ตัวเชื่อมต่อ Discord, Twitter และ Telegram (Connector)
-   🔗 ซัพพอร์ตสำหรับทุกตัวโมเดล (Llama, Grok, OpenAI, Anthropic, ฯลฯ)
-   👥 มัลติเอเจนต์และห้องสนทนา
-   📚 ง่ายต่อการดึงข้อมูลและการเข้าถึงเอกสาร
-   💾 หน่วยความจำที่สามารถดึงข้อมูลได้
-   🚀 สามารถสร้างตัวละครและตัวเชื่อมต่อของตัวเองได้
-   ☁️ รองรับหลายตัวโมเดล (local Llama, OpenAI, Anthropic, Groq, ฯลฯ)
-   📦 มันแค่เวิร์ค!

## 🎯 การใช้งาน

-   🤖 แชทบอท
-   🕵️ เอเจนต์ที่พึ่งตัวเองได้
-   📈 การจัดการกระบวนการธุรการ
-   🎮 ตัวละครในเกมส์ (NPC)
-   🧠 การเทรด

## 🚀 เริ่มต้นการใช้งาน

### ข้อกำหนดก่อนการติดตั้ง

-   [Python 2.7+](https://www.python.org/downloads/)
-   [Node.js 23+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
-   [pnpm](https://pnpm.io/installation)

> **หมายเหตุสำหรับผู้ใช้ Windows:** [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install-manual) จำเป็น

### ใช้ Starter (แนะนำ)

```bash
git clone https://github.com/ai16z/eliza-starter.git

cp .env.example .env

pnpm i && pnpm start
```

จากนั้นอ่าน [คู่มือ](https://ai16z.github.io/eliza/) เพื่อศึกษาวิธีการปรับแต่ง Eliza

### เริ่มใช้งาน Eliza แบบแมนนวล (แนะนำสำหรับคนที่รู้ว่าทำอะไรอยู่)

```bash
# โคลน repo
git clone https://github.com/ai16z/eliza.git

# Checkout release ล่าสุด
# โปรเจกต์นี้มีการอัปเดตค่อนด้างรวดเร็ว แนะนำให้ checkout release ล่าสุดเสมอ
git checkout $(git describe --tags --abbrev=0)
```

### เริ่มใช้งาน Eliza ผ่าน Gitpod

[![เปิดใน Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ai16z/eliza/tree/main)

### แก้ไขไฟล์ .env

คัดลอก .env.example ไปเป็น .env และระบุค่าที่เหมาะสม

```
cp .env.example .env
```

หทายเหตุ: .env ไม่จำเป็น หากคุณอยากใช้งานเอเจนต์หลายๆตัวพร้อมกันคุณสามารถส่ง secrets ผ่าน JSON ของตัวละครได้

### เริ่มใช้งาน Eliza แบบอัตโนมัติ

มันจำการติดตั้งทั้งหมดแล้วเริ่มต้นการทำงานของเอเจนต์ด้วยตัวละครค่าเริ่มต้น

```bash
sh scripts/start.sh
```

### แก้ไขไฟล์ตัวละคร

1. เปิด `agent/src/character.ts` เพื่อแก้ไขตัวละครค่าเริ่มต้น เอาคอมเม้นออกและแก้ไข


2. เพื่อโหลดตัวละครที่ custom มา
    - ใช้ `pnpm start --characters="path/to/your/character.json"`
    - สามารถโหลดหลายๆตัวละครพร้อมกันได้
3. เชื่อมต่อกับ X (Twitter)
    - เปลี่ยน `"clients": []` เป็น `"clients": ["twitter"]` ในไฟล์ตัวละครเพื่อเชื่อมต่อกับ X

### เริ่มใช้งาน Eliza ด้วยตนเอง

```bash
pnpm i
pnpm build
pnpm start

# The project iterates fast, sometimes you need to clean the project if you are coming back to the project
pnpm clean
```

#### ความต้องการเพิ่มเติม

คุณอาจต้องติดตั้ง Sharp ถ้าคุณเห็นข้อความผิดพลาดเมื่อเริ่มต้น ลองติดตั้งด้วยคำสั่งต่อไปนี้:

```
pnpm install --include=optional sharp
```

### คอมูและการติดต่อ

-   [GitHub Issues](https://github.com/ai16z/eliza/issues). ดีสำหรับ: ปัญหาที่พบเมื่อใช้ Eliza และความคิดเห็นเกี่ยวกับฟีเจอร์
-   [Discord](https://discord.gg/ai16z). ดีสำหรับ: แชร์การใช้งานแอปพลิเคชั่นและพบปะกับคอมมู

## คอนทริบิวเตอร์

<a href="https://github.com/ai16z/eliza/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ai16z/eliza" />
</a>

## ประวัติดาว

[![Star History Chart](https://api.star-history.com/svg?repos=ai16z/eliza&type=Date)](https://star-history.com/#ai16z/eliza&Date)
