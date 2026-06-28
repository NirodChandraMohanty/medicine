import urllib.request
import re
import json

companies = {
    'Pfizer': 'Pfizer',
    'Cipla': 'Cipla',
    'SunPharma': 'Sun_Pharma',
    'Apollo': 'Apollo_Hospitals',
    'WHO': 'World_Health_Organization',
    'Novartis': 'Novartis',
    'J&J': 'Johnson_%26_Johnson',
    'Bayer': 'Bayer',
    'GSK': 'GSK_plc',
    'FSSAI': 'Food_Safety_and_Standards_Authority_of_India'
}

results = {}
for key, title in companies.items():
    try:
        url = f"https://en.wikipedia.org/wiki/{title}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Look for the infobox image specifically
        match = re.search(r'class="infobox-image".*?src="(//upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+/(?:150|2[0-9]{2}|300)px-[^"]+)"', html, re.DOTALL)
        if match:
            results[key] = "https:" + match.group(1)
        else:
            # Fallback to the first logo-like image
            match = re.search(r'src="(//upload\.wikimedia\.org/wikipedia/(?:commons|en)/thumb/[^"]+/[^"]+px-[^"]+logo[^"]*\.png)"', html, re.IGNORECASE)
            if match:
                results[key] = "https:" + match.group(1)
            else:
                results[key] = "NOT_FOUND"
    except Exception as e:
        results[key] = str(e)

print(json.dumps(results, indent=2))
