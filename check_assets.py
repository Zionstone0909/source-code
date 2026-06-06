import re, pathlib
root = pathlib.Path(r'c:/Users/hp/Downloads/source-code')
imports = []
for p in root.rglob('*.tsx'):
    text = p.read_text(encoding='utf-8')
    for m in re.finditer(r'import\s+[^;]+?from\s+["\'](@/assets/[^"\']+)["\']', text):
        imports.append((p.relative_to(root).as_posix(), m.group(1)))
print('found', len(imports), 'asset imports')
for path, imp in imports:
    print(path, imp)
asset_files = {f.name for f in root.joinpath('src','assets').iterdir() if f.is_file()}
missing = []
for _, imp in imports:
    fn = imp.split('/')[-1]
    if fn not in asset_files:
        missing.append((imp, fn))
print('')
if missing:
    print('MISSING FILES:')
    for imp, fn in missing:
        print(imp, '->', fn)
else:
    print('all imports have a matching asset file name')
