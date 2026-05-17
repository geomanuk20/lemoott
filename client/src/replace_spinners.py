import os
import re

def replace_spinners():
    client_src = '/Users/geomanuk/video/client/src'
    
    for root, dirs, files in os.walk(client_src):
        for file in files:
            if file.endswith('.jsx'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                changed = False
                
                # Case 1: Lucide Loader2
                if 'Loader2' in content:
                    # Determine relative path to components/Loader
                    depth = root.replace(client_src, '').count(os.sep)
                    # If in pages folder, depth is 1
                    # components is at same level as pages
                    rel_path = '../components/Loader'
                    if root == client_src:
                        rel_path = './components/Loader'
                    elif 'components' in root:
                        rel_path = './Loader'
                    
                    if 'import Loader from' not in content:
                        # Find any lucide-react import (multiline supported)
                        import_pattern = re.compile(r"import\s+\{[^}]*?Loader2[^}]*?\}\s+from\s+'lucide-react';", re.DOTALL)
                        if import_pattern.search(content):
                            content = import_pattern.sub(lambda m: m.group(0) + f"\nimport Loader from '{rel_path}';", content)
                            changed = True
                        else:
                            # Try general lucide-react import
                            general_import = re.compile(r"import\s+.*?from\s+'lucide-react';", re.DOTALL)
                            content = general_import.sub(lambda m: m.group(0) + f"\nimport Loader from '{rel_path}';", content)
                            changed = True
                    
                    # Replace JSX components
                    # Use a more flexible regex for <Loader2 ... />
                    new_content = re.sub(r'<Loader2[^>]*?/>', r'<Loader size="small" />', content)
                    if new_content != content:
                        content = new_content
                        changed = True
                
                if changed:
                    with open(path, 'w') as f:
                        f.write(content)
                    print(f"Updated: {path}")

if __name__ == "__main__":
    replace_spinners()
