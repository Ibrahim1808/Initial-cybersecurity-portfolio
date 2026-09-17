from PIL import Image, ImageOps
from pathlib import Path
import json, sys

source = Path(sys.argv[1])
root = Path(__file__).resolve().parents[1]
dest = root / 'public/images/projects'
dest.mkdir(parents=True, exist_ok=True)
excluded = {7:'Unrelated exterior door; lockbox visible',21:'Duplicate of 19',22:'Duplicate of 20',58:'Out of focus',61:'Motion blur',74:'Motion blur',89:'Motion blur',90:'Poor composition and shadow',96:'Motion blur',107:'Motion blur'}
process = {1,2,3,8,9,16,27,28,30,37,38,39,60,63,65,66,67,70,71,79,86,87,88,*range(104,127),129,130,131,132,133,134,135,136,138,139,140}
vinyl = {59,60,62,63,64,*range(91,103),*range(104,130)}
hardwood = set(range(130,141))
laminate = {11,12,13,14,15}
stairs = {76,77,136}
groups = [([4,5,6],'Gray-brown plank flooring beside a sliding glass door'),([10],'Light rectangular flooring beside wood cabinetry'),([11,12,13,14,15],'Rustic brown plank flooring with visible grain patterns'),([17],'Dark plank flooring along a hallway with white trim'),(list(range(18,27)),'Warm wood-look flooring around dining furniture'),(list(range(27,37)),'Wide warm-toned planks connecting residential rooms'),([40,41,42,43,44],'Light wood-look flooring in furnished living and dining spaces'),([45],'Dark textured plank flooring in a bright bedroom'),([46,47,48,49],'Amber-toned flooring in a residential utility room'),([50,51],'Pale plank flooring around built-in closet drawers'),(list(range(58,68)),'Dark brown plank flooring and installation details'),([68,69],'Blue-gray wood-look flooring with taped transition edges'),([72,73,74,75],'Warm wide-plank flooring beside white kitchen cabinets'),([76,77],'Warm wood-toned stair treads with white risers'),([78],'Gray plank flooring around a bathroom vanity'),([80,81],'Variegated brown and cream plank flooring'),(list(range(82,89)),'Light varied-tone flooring and room preparation'),(list(range(89,103)),'Gray and beige vinyl planks connecting residential rooms'),(list(range(104,130)),'Pale wide-plank vinyl flooring during an interior renovation'),(list(range(130,141)),'Brown hardwood flooring with pronounced natural grain')]
projects=[]; audit=[]
for p in sorted(source.glob('*.jpg'), key=lambda p:int(p.name.split('-')[0])):
    n=int(p.name.split('-')[0]); im=ImageOps.exif_transpose(Image.open(p)).convert('RGB')
    category='Stairs' if n in stairs else 'Hardwood' if n in hardwood else 'Laminate' if n in laminate else 'Vinyl' if n in vinyl else 'Uncategorized'
    alt=next((a for ids,a in groups if n in ids),'Floor preparation and installation details in a residential interior')
    if n in process: alt += ' — work in progress'
    audit.append({'source':p.name,'status':'excluded' if n in excluded else 'included','reason':excluded.get(n,'Installation detail' if n in process else 'Flooring portfolio'),'category':category})
    if n in excluded: continue
    name=f'project-{n:03d}'
    im.save(dest/f'{name}.webp','WEBP',quality=88,method=6)
    thumb=im.copy(); thumb.thumbnail((480,720)); thumb.save(dest/f'{name}-small.webp','WEBP',quality=82,method=6)
    projects.append({'id':n,'src':f'/images/projects/{name}.webp','thumb':f'/images/projects/{name}-small.webp','width':im.width,'height':im.height,'category':category,'stage':'In progress' if n in process else 'Installed flooring','alt':alt})
featured=[44,77,75,41,15,99,45,84,137,50]
projects.sort(key=lambda p:(featured.index(p['id']) if p['id'] in featured else 100+p['id']))
(root/'data').mkdir(exist_ok=True)
(root/'data/projects.json').write_text(json.dumps(projects,indent=2),encoding='utf-8')
(root/'docs').mkdir(exist_ok=True)
(root/'docs/image-audit.json').write_text(json.dumps(audit,indent=2),encoding='utf-8')
print(f'Inspected inventory: {len(audit)} photos; exported {len(projects)} photographs in two WebP sizes.')
