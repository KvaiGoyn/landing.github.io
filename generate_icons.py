#!/usr/bin/env python3
"""
Generate favicon and icon files for the landing page.
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_favicon(size, filename):
    """Create a simple favicon with gear icon."""
    img = Image.new('RGBA', (size, size), (255, 107, 53, 255))  # orange background
    draw = ImageDraw.Draw(img)
    
    # Draw a simple gear shape (simplified as a circle with teeth)
    center = size // 2
    radius = size // 3
    draw.ellipse([center - radius, center - radius, center + radius, center + radius],
                 fill=(255, 255, 255, 255))
    
    # Draw text "MP" (MetalPro) if size >= 32
    if size >= 32:
        try:
            font = ImageFont.truetype("arial.ttf", size // 3)
        except:
            font = ImageFont.load_default()
        text = "MP"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        draw.text((center - text_width // 2, center - text_height // 2),
                  text, fill=(255, 107, 53, 255), font=font)
    
    img.save(filename, 'PNG')
    print(f"Created {filename} ({size}x{size})")

def create_apple_touch_icon():
    """Create apple-touch-icon.png (180x180)."""
    img = Image.new('RGBA', (180, 180), (255, 107, 53, 255))
    draw = ImageDraw.Draw(img)
    center = 90
    radius = 60
    draw.ellipse([center - radius, center - radius, center + radius, center + radius],
                 fill=(255, 255, 255, 255))
    try:
        font = ImageFont.truetype("arial.ttf", 50)
    except:
        font = ImageFont.load_default()
    text = "MP"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    draw.text((center - text_width // 2, center - text_height // 2),
              text, fill=(255, 107, 53, 255), font=font)
    img.save('apple-touch-icon.png', 'PNG')
    print("Created apple-touch-icon.png (180x180)")

def create_og_image():
    """Create og-image.png (1200x630) for social sharing."""
    width, height = 1200, 630
    img = Image.new('RGB', (width, height), (30, 30, 30))
    draw = ImageDraw.Draw(img)
    
    # Draw a large gear icon
    center_x, center_y = width // 2, height // 2
    radius = 150
    draw.ellipse([center_x - radius, center_y - radius, center_x + radius, center_y + radius],
                 fill=(255, 107, 53))
    
    # Draw title text
    try:
        font_large = ImageFont.truetype("arial.ttf", 72)
        font_medium = ImageFont.truetype("arial.ttf", 48)
    except:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
    
    title = "МеталлПро"
    subtitle = "Производство металлоизделий под ключ"
    
    bbox = draw.textbbox((0, 0), title, font=font_large)
    title_width = bbox[2] - bbox[0]
    draw.text((center_x - title_width // 2, center_y - 200),
              title, fill=(255, 255, 255), font=font_large)
    
    bbox = draw.textbbox((0, 0), subtitle, font=font_medium)
    subtitle_width = bbox[2] - bbox[0]
    draw.text((center_x - subtitle_width // 2, center_y + 100),
              subtitle, fill=(200, 200, 200), font=font_medium)
    
    img.save('og-image.png', 'PNG')
    print("Created og-image.png (1200x630)")

def create_favicon_ico():
    """Create favicon.ico by combining 16x16 and 32x32."""
    # Create 16x16 and 32x32 images
    img16 = Image.new('RGBA', (16, 16), (255, 107, 53, 255))
    img32 = Image.new('RGBA', (32, 32), (255, 107, 53, 255))
    
    # Draw simple dot for 16x16
    draw16 = ImageDraw.Draw(img16)
    draw16.ellipse([4, 4, 12, 12], fill=(255, 255, 255, 255))
    
    draw32 = ImageDraw.Draw(img32)
    draw32.ellipse([8, 8, 24, 24], fill=(255, 255, 255, 255))
    
    # Save as ICO (PIL supports ICO)
    img32.save('favicon.ico', sizes=[(32, 32), (16, 16)])
    print("Created favicon.ico (16x16, 32x32)")

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    create_favicon(16, 'favicon-16x16.png')
    create_favicon(32, 'favicon-32x32.png')
    create_apple_touch_icon()
    create_og_image()
    create_favicon_ico()
    print("All icons generated successfully.")