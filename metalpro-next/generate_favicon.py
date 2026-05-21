#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Создаем простое изображение 64x64
size = 64
img = Image.new('RGBA', (size, size), (255, 115, 0, 255))  # оранжевый фон
draw = ImageDraw.Draw(img)

# Рисуем текст "СМ" (Стиль Мастер)
try:
    font = ImageFont.truetype("DejaVuSans-Bold.ttf", 32)
except:
    font = ImageFont.load_default()

text = "СМ"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
x = (size - text_width) // 2
y = (size - text_height) // 2
draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)

# Сохраняем как ICO
ico_path = "app/favicon.ico"
img.save(ico_path, format="ICO", sizes=[(64, 64), (32, 32), (16, 16)])
print(f"Favicon создан: {ico_path}")