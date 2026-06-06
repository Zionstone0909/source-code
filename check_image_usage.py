from pathlib import Path
import re
root = Path(r'c:/Users/hp/Downloads/source-code')
text = (root/'src'/'lib'/'site-shared.tsx').read_text(encoding='utf-8')
imports = re.findall(r'import\s+(\w+)\s+from\s+"@/assets/([^"]+)";', text)
print('imports:')
for var, path in imports:
    print(var, path)
proj_entries = re.findall(r'\{\s*num: "(\d+)", title: "([^"]+)", [^}]*?image: ([^,]+),', text)
print('\nprojects:')
for num, title, image in proj_entries:
    print(num, title, image)
from collections import Counter
c = Counter(image.strip() for _,_,image in proj_entries)
print('\nrepeated images:')
for img,count in c.items():
    if count>1:
        print(count, img)
