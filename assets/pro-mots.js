// Initium³ — les mots du catalogue pro, traduits a l'affichage (Olivier, 03/11).
// Les fiches viennent de son Excel, en anglais et en francais melanges : on les
// garde telles quelles en base, et la page les montre dans la langue du visiteur.
// [source, francais, neerlandais, anglais]. Sans anglais : le texte reste tel quel.
// Noms de modeles (Lungo, BOHO...), finitions (Golden Care, Arte color) et codes
// de tissu ne se traduisent pas. Un mot absent d'ici s'affiche comme dans la fiche.
(function (racine) {
  'use strict';
  var plur = function (m, n) { return n + ' place' + (+n > 1 ? 's' : ''); };
  var MOTS = [
    // Les libelles ajoutes a l'import
    [/Matériaux\s*:/g, 'Matériaux :', 'Materialen:', 'Materials:'],
    [/Structure\s*:/g, 'Structure :', 'Structuur:', 'Frame:'],
    [/Tissu\s*:/g, 'Tissu :', 'Stof:', 'Fabric:'],
    // Les noms ecrits en francais
    [/Lampadaire solaire teck/g, 'Lampadaire solaire en teck', 'Solar vloerlamp in teak', 'Solar teak floor lamp'],
    [/Lampadaire solaire alu/g, 'Lampadaire solaire en alu', 'Solar vloerlamp in alu', 'Solar aluminium floor lamp'],
    [/Tapis (\d)/g, 'Tapis $1', 'Tapijt $1', 'Rug $1'],
    [/modulable \(1, 2 et 3 places \+ pouf\)/g, 'modulable (1, 2 et 3 places + pouf)', 'modulair (1-, 2- en 3-zits + poef)', 'modular (1-, 2- and 3-seater + pouf)'],
    // Les dimensions
    [/\bW(?=\d)/g, 'L', 'B'],
    [/\bD(?=\d)/g, 'P', 'D'],
    [/\bDiam?\s*(?=\d)/gi, 'Ø ', 'Ø '],
    [/(\d)\s*meter\b/gi, '$1 m', '$1 m'],
    // Les pieces
    [/\bfloor lamp-?\s*/gi, 'Lampadaire ', 'Vloerlamp '],
    [/\b(\d)\s*-?\s*seater sofa\b/gi, function (m, n) { return 'Canapé ' + plur(m, n); }, '$1-zitsbank'],
    [/\b(\d)\s*-?\s*seater\b/gi, plur, '$1-zits'],
    [/\bseater\b/gi, 'places', 'zits'],
    [/\bseat:/gi, 'Assise :', 'Zit:'],
    [/\bbackrest:/gi, 'Dossier :', 'Rugleuning:'],
    [/\bdouble sofa\b/gi, 'Canapé double', 'Dubbele sofa'],
    [/\bcorner left end\b/gi, 'Angle gauche', 'Hoek links'],
    [/\bleft end sofa\b/gi, 'Canapé élément gauche', 'Sofa linkerelement'],
    [/\bleft chaise lounge\b/gi, 'méridienne gauche', 'chaise longue links'],
    [/\bchaise lounge\b/gi, 'méridienne', 'chaise longue'],
    [/\bleft end\b/gi, 'côté gauche', 'links'],
    [/\bright end\b/gi, 'côté droit', 'rechts'],
    [/\bleft arm\b/gi, 'accoudoir gauche', 'armleuning links'],
    [/\bcoffee table\b/gi, 'Table basse', 'Salontafel'],
    [/\bside table\b/gi, 'Table d’appoint', 'Bijzettafel'],
    [/\bround table\b/gi, 'Table ronde', 'Ronde tafel'],
    [/\belips table\b/gi, 'Table ellipse', 'Ovale tafel', 'Ellipse table'],
    [/\bdining chair-stackable\b/gi, 'Chaise de repas empilable', 'Stapelbare eetkamerstoel'],
    [/\bdining chair\b/gi, 'Chaise de repas', 'Eetkamerstoel'],
    [/\blounge chair\b/gi, 'Fauteuil lounge', 'Loungestoel'],
    [/\blounge stool\b/gi, 'Tabouret lounge', 'Loungekruk'],
    [/\bround lounger\b/gi, 'Bain de soleil rond', 'Rond ligbed'],
    [/\blounger\b/gi, 'Bain de soleil', 'Ligbed'],
    [/\bottoman\b/gi, 'Pouf', 'Poef'],
    [/\bpouf\b/g, 'pouf', 'poef'],
    [/\barm ?chair\b/gi, 'Fauteuil', 'Fauteuil'],
    [/\bcurved center\b/gi, 'Élément central courbe', 'Gebogen middenelement'],
    [/\bcenter\b/gi, 'Élément central', 'Middenelement'],
    [/\bcorner\b/gi, 'Angle', 'Hoek'],
    [/\bnon woven\b/gi, 'non-tissé', 'non-woven'],
    [/\balu\. platform\b/gi, 'plateforme alu', 'alu-platform'],
    // Les matieres
    [/\boutdoor solar fabric\b/gi, 'Tissu solaire d’extérieur', 'Zonwerende buitenstof'],
    [/\boutdoor fabric\b/gi, 'Tissu d’extérieur', 'Buitenstof'],
    [/\bceramic top\b/gi, 'plateau céramique', 'keramisch blad'],
    [/\b(?:ceramic|creamic)\b/gi, 'céramique', 'keramiek'],
    [/\bPE rattan\b/gi, 'rotin PE', 'PE-rotan'],
    [/\bacacia wood\b/gi, 'acacia', 'acacia'],
    [/\b(?:aluminum|aluminium)\b/gi, 'aluminium', 'aluminium'],
    [/\bteak\b/gi, 'teck', 'teak'],
    [/\brope\b/gi, 'corde', 'touw'],
    [/\bcarpet\b/gi, 'tapis', 'tapijt'],
    [/\bfabric\b/gi, 'tissu', 'stof'],
    // Les couleurs
    [/\bblack feet\b/gi, 'pieds noirs', 'zwarte poten'],
    [/\bbeige feet\b/gi, 'pieds beiges', 'beige poten'],
    [/\blight beige\b/gi, 'beige clair', 'lichtbeige'],
    [/\blight brown\b/gi, 'brun clair', 'lichtbruin'],
    [/\bsmoke grey\b/gi, 'gris fumé', 'rookgrijs'],
    [/\b(?:antracite|anthracite)\b/gi, 'anthracite', 'antraciet'],
    [/\bwhite\b/gi, 'blanc', 'wit'],
    [/\bblack\b/gi, 'noir', 'zwart'],
    [/\bnatural\b/gi, 'naturel', 'naturel'],
    [/\bbrown\b/gi, 'brun', 'bruin'],
    [/\b(?:gray|grey)\b/gi, 'gris', 'grijs'],
  ];
  var RUBRIQUES = {
    'Canapés et salons': ['Sofa’s en loungesets', 'Sofas and lounge sets'],
    Tables: ['Tafels', 'Tables'],
    Chaises: ['Stoelen', 'Chairs'],
    Poufs: ['Poefs', 'Poufs'],
    'Bains de soleil': ['Ligbedden', 'Sun loungers'],
    Tapis: ['Tapijten', 'Rugs'],
    Luminaires: ['Verlichting', 'Lighting'],
    Fauteuils: ['Fauteuils', 'Armchairs'],
  };
  var COL = { fr: 1, nl: 2, en: 3 };
  racine.IN_MOTS = {
    texte: function (t, lg) {
      var i = COL[lg] || 1;
      return MOTS.reduce(function (r, m) { return m[i] === undefined ? r : r.replace(m[0], m[i]); }, String(t == null ? '' : t));
    },
    rubrique: function (r, lg) {
      var x = RUBRIQUES[r];
      return x && lg === 'nl' ? x[0] : x && lg === 'en' ? x[1] : r;
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
