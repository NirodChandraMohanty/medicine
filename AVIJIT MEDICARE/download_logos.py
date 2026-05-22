import urllib.request
import os

os.makedirs("images/partners", exist_ok=True)

downloads = {
    "iso.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/ISO_Logo_Red.svg/250px-ISO_Logo_Red.svg.png",
    "sunpharma.png": "https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Sun_Pharma_logo.svg/250px-Sun_Pharma_logo.svg.png",
    "cipla.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cipla_logo.svg/250px-Cipla_logo.svg.png",
    "apollo.png": "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Apollo_Hospitals_Logo.svg/250px-Apollo_Hospitals_Logo.svg.png",
    "fssai.png": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/FSSAI_logo.png/250px-FSSAI_logo.png",
    "pfizer.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pfizer_logo.svg/250px-Pfizer_logo.svg.png",
    "who.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/World_Health_Organization_Logo.svg/250px-World_Health_Organization_Logo.svg.png",
    "jnj.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/JNJ_Logo_New.svg/250px-JNJ_Logo_New.svg.png",
    "bayer.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Bayer_Logo.svg/250px-Bayer_Logo.svg.png",
    "novartis.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Novartis-Logo-2023.svg/250px-Novartis-Logo-2023.svg.png"
}

for name, url in downloads.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(f"images/partners/{name}", 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")

