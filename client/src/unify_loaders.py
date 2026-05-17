import os
import re

def process_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # 1. Ensure all sizes are small
    new_content = content.replace('size="large"', 'size="small"')
    
    # 2. Add inline={true} ONLY if inside a <button> tag
    # Use re.DOTALL and a more flexible pattern for content inside buttons
    new_content = re.sub(r'(<button[^>]*?>.*?)(<Loader\s+size="small"\s*)(inline={true}\s*)?(/>)', r'\1\2inline={true} \4', new_content, flags=re.DOTALL)
    
    # 3. Ensure section-level loaders (not in button) are CENTERED (no inline)
    # Match loaders inside {loading ? ...} but NOT inside <button>
    # Actually, the simplest way is to check if it's followed by a </div> or preceded by {loading ?
    # But wait! If it's inside a button, it's ALREADY handled by the previous re.sub.
    
    # I'll just clean up the ones that shouldn't be inline
    # Pattern: {loading ? <Loader size="small" inline={true} />
    # We only want it inline if it's literally inside a button's CHILDREN.
    
    # I'll use a safer approach: First remove all inline={true}, then add it back ONLY to buttons.
    new_content = new_content.replace('inline={true}', '')
    new_content = re.sub(r'(<button[^>]*?>.*?)(<Loader\s+size="small"\s*)(/>)', r'\1\2inline={true} \3', new_content, flags=re.DOTALL)

    # Clean up double spaces
    new_content = new_content.replace('  ', ' ')

    with open(file_path, 'w') as f:
        f.write(new_content)

pages_dir = 'client/src/pages'
for root, dirs, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))

if os.path.exists('client/src/pages/Dashboard.jsx'):
    process_file('client/src/pages/Dashboard.jsx')
