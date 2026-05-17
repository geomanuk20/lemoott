import os
import re

pages_dir = 'client/src/pages'
for filename in os.listdir(pages_dir):
    if not filename.endswith('.jsx'):
        continue
        
    filepath = os.path.join(pages_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Check if there are raw image patterns for lists
    # E.g. <img src={movie.posterImage || movie.poster || movie.thumbnail || 'https://via.placeholder.com/300x450'}
    
    img_pattern = re.compile(r'<img\s+src=\{([^}]+poster[^}]*)\}')
    
    if img_pattern.search(content) and 'formatImageUrl' not in content:
        # Import formatImageUrl
        if 'import Loader' in content:
            content = content.replace("import Loader from '../components/Loader';", "import Loader from '../components/Loader';\nimport { formatImageUrl } from '../utils/image';")
        else:
            # Just add it after the last import
            imports = re.findall(r'^import .*;', content, re.MULTILINE)
            if imports:
                last_import = imports[-1]
                content = content.replace(last_import, f"{last_import}\nimport {{ formatImageUrl }} from '../utils/image';")
        
        # Replace image src
        # This is tricky because the variable name (movie, show, actor) varies.
        def replacer(match):
            inner = match.group(1)
            # Find the variable name, usually the first word before a dot
            var_match = re.search(r'([a-zA-Z0-9_]+)\.(?:posterImage|poster|thumbnail|logo)', inner)
            if var_match:
                var_name = var_match.group(1)
                return f'<img src={{formatImageUrl({var_name}, \'poster\') || \'https://via.placeholder.com/300x450\'}}'
            return match.group(0)
            
        new_content = img_pattern.sub(replacer, content)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filename}")

