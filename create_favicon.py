from PIL import Image
import os

def create_favicon(input_path, output_path):
    try:
        img = Image.open(input_path)
        # Assume the icon is the square on the left. Use height to determine the square size.
        width, height = img.size
        
        # Crop the leftmost square
        # (left, top, right, bottom)
        icon_crop = img.crop((0, 0, height, height))
        
        # Resize to standard favicon size (optional, but good for specific favicon.ico, here we use png)
        # keeping it high res is fine for modern browsers
        
        icon_crop.save(output_path, "PNG")
        print(f"Successfully created favicon at {output_path}")
        
    except Exception as e:
        print(f"Error creating favicon: {e}")

input_file = r"c:\Users\gnavalon-admin\.gemini\antigravity\scratch\sensenord\public\logo.png"
output_file = r"c:\Users\gnavalon-admin\.gemini\antigravity\scratch\sensenord\public\favicon.png"

create_favicon(input_file, output_file)
