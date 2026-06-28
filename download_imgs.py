import urllib.request
import os

images = {
    "paracetamol.jpg": "https://images.unsplash.com/photo-1584308666744-24d59ce8720b?q=80&w=1000&auto=format&fit=crop",
    "antibiotic.jpg": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1000&auto=format&fit=crop",
    "vitamins.jpg": "https://images.unsplash.com/photo-1550572017-edb79a78eb99?q=80&w=1000&auto=format&fit=crop",
    "stomach.jpg": "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000&auto=format&fit=crop",
    "syrup.jpg": "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop",
    "ayurvedic.jpg": "https://images.unsplash.com/photo-1512069772995-ec65e75e11df?q=80&w=1000&auto=format&fit=crop"
}

output_dir = "/Applications/XAMPP/xamppfiles/htdocs/Medicine /AVIJIT MEDICARE/images/medicines"

req_headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

for filename, url in images.items():
    filepath = os.path.join(output_dir, filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"Saved to {filepath}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

print("Done downloading images.")
