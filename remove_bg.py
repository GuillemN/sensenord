from PIL import Image

def remove_white_background(input_path, output_path, tolerance=50):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is close to white
        if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent logo to {output_path}")

input_file = r"c:\Users\gnavalon-admin\.gemini\antigravity\scratch\sensenord\logo_raw.png"
output_file = r"c:\Users\gnavalon-admin\.gemini\antigravity\scratch\sensenord\public\logo.png"

try:
    remove_white_background(input_file, output_file)
except Exception as e:
    print(f"Error: {e}")
