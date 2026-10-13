import os, zipfile, json, xml.etree.ElementTree as ET, random, string, sys

def gen_key():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=12))

def parse_docx(path):
    with zipfile.ZipFile(path) as docx:
        tree = ET.fromstring(docx.read('word/document.xml'))
        namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        lines = []
        for p in tree.iterfind('.//w:p', namespaces):
            p_text = ''.join(node.text for node in p.iterfind('.//w:t', namespaces) if node.text)
            if p_text.strip():
                lines.append(p_text.strip())
    
    title = lines[0] if lines else ''
    tagline = ''
    sector = ''
    country = ''
    year = ''
    scope = []
    core_idea = ''
    
    sector_idx = -1
    country_idx = -1
    year_idx = -1
    scope_idx = -1
    
    for i, l in enumerate(lines):
        u = l.upper()
        if u == 'SECTOR': sector_idx = i
        elif u == 'COUNTRY': country_idx = i
        elif u == 'YEAR': year_idx = i
        elif u.startswith('SCOPE'): scope_idx = i

    if sector_idx > 1:
        tagline = lines[1]
    
    if sector_idx != -1 and sector_idx + 1 < len(lines):
        sector = lines[sector_idx + 1]
    if country_idx != -1 and country_idx + 1 < len(lines):
        country = lines[country_idx + 1]
    if year_idx != -1 and year_idx + 1 < len(lines):
        year = lines[year_idx + 1]
    if scope_idx != -1 and scope_idx + 1 < len(lines):
        raw_scope = lines[scope_idx + 1]
        scope = [s.strip().rstrip('.') for s in raw_scope.split(',') if s.strip()]

    # Parse body lines
    max_meta_idx = max(sector_idx, country_idx, year_idx, scope_idx)
    raw_body = lines[max_meta_idx + 2:] if max_meta_idx != -1 else []
    
    # If tagline was empty before sector, check if first line of body is a tagline
    if not tagline and raw_body and len(raw_body[0]) < 60 and not raw_body[0].endswith('.'):
        tagline = raw_body[0]
        raw_body = raw_body[1:]

    lead_desc = ''
    body_blocks = []
    
    i = 0
    while i < len(raw_body):
        text = raw_body[i]
        
        if text.lower() == 'core brand idea':
            if i + 1 < len(raw_body):
                core_idea = raw_body[i + 1]
                i += 2
                continue
            i += 1
            continue
            
        # Determine if line is heading
        is_heading = len(text) < 75 and not text.endswith('.') and not text.endswith('?') and not text.endswith('!')
        
        style = 'h3' if is_heading else 'normal'
        
        if not lead_desc and style == 'normal':
            lead_desc = text

        body_blocks.append({
            '_type': 'block',
            '_key': gen_key(),
            'style': style,
            'children': [
                {
                    '_type': 'span',
                    '_key': gen_key(),
                    'text': text,
                    'marks': []
                }
            ],
            'markDefs': []
        })
        i += 1

    # Tags parsed from sector
    tags = [t.strip() for t in sector.split('/') if t.strip()] if sector else []

    return {
        'file': os.path.basename(path),
        'title': title,
        'tagline': tagline,
        'sector': sector,
        'tags': tags,
        'country': country,
        'year': year,
        'scope': scope,
        'coreIdea': core_idea,
        'description': lead_desc,
        'bodyBlocks': body_blocks
    }

base_dir = sys.argv[1] if len(sys.argv) > 1 else '/Users/jherie/Downloads/Website portfolio package'
results = []
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.docx') and not f.startswith('~$'):
            p = os.path.join(root, f)
            results.append(parse_docx(p))

print(json.dumps(results))
