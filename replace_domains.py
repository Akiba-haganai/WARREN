import os

files_to_process = ['index.html']
for d in ['src', 'api', 'public']:
    if os.path.exists(d):
        for root, dirs, files in os.walk(d):
            for f in files:
                files_to_process.append(os.path.join(root, f))

c = 0
for f in files_to_process:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        if 'wave-515.vercel.app' in content or 'warren-gold.vercel.app' in content:
            content = content.replace('wave-515.vercel.app', 'warren-515.vercel.app')
            content = content.replace('warren-gold.vercel.app', 'warren-515.vercel.app')
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            c += 1
            print(f'Updated {f}')
    except Exception as e:
        pass
print(f'Total updated: {c}')
