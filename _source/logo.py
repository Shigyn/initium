# Le logo d'Olivier (03/11) : du noir sur blanc vers de la transparence, pour qu'il
# prenne la couleur du texte autour (blanc sur les photos, noir sur fond clair).
# Usage : python -I _source/logo.py <image recue>
import os, sys
from PIL import Image, ImageFilter, ImageOps

DST = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')
gris = ImageOps.grayscale(Image.open(sys.argv[1]))

def sortir(nom, y0, y1, epais=False):
    # Le blanc casse de l'image devient transparent : seul le trace reste, avec son lissage.
    alpha = gris.crop((0, y0, gris.width, y1)).point(lambda v: 0 if v > 235 else min(255, round((235 - v) * 255 / 215)))
    boite = alpha.getbbox()
    alpha = alpha.crop(boite)
    if epais: alpha = alpha.filter(ImageFilter.MaxFilter(3))
    im = Image.new('RGBA', alpha.size, (0, 0, 0, 0))
    im.putalpha(alpha)
    im.save(os.path.join(DST, nom), optimize=True)
    print(nom, im.size)

sortir('logo-initium.png', 320, 520, True)  # le mot seul : l'en-tete, sur photo
sortir('logo-initium-complet.png', 320, 690)  # avec la devise : le pied de page
