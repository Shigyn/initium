// Demandes d'Olivier du 10/11/2026 : rubrique Telechargements (tissus, fiche technique)
// apres Collection, et page News (articles de presse, evenements). Premier article :
// la 3e place aux Brussels Balthazar 2026, categorie « Love at first sight », canape Olwen.
// N'ecrire QUE ce qu'Olivier a dit ou envoye : aucun fait invente.

export const X = {
  fr: {
    telechargements: 'Téléchargements', news: 'News',
    dlIntro: 'Nos nuanciers de tissus et notre fiche technique, à consulter et à télécharger. Pour un échantillon ou une question sur un tissu, écrivez-nous.',
    tissus: 'Tissus', fiche: 'Fiche technique', voir: 'Voir en grand', telecharger: 'Télécharger',
    toutTissus: 'Télécharger le nuancier complet', toutFiche: 'Télécharger la fiche technique', pdf: 'PDF',
    newsIntro: 'Distinctions, salons, presse : les dernières nouvelles d’Initium³.',
    distEyebrow: 'Brussels Balthazar 2026 · Salon du Meuble de Bruxelles',
    distTitre: '3e place, catégorie « Coup de foudre »',
    distTexte: 'Notre canapé Olwen a été distingué au Salon du Meuble de Bruxelles, dans la catégorie « Love at first sight ». Une belle reconnaissance pour toute l’équipe.',
    decouvrirOlwen: 'Découvrir Olwen', lireNews: 'Lire l’actualité', evtPrec: 'Événement précédent', evtSuiv: 'Événement suivant', evtsTitre: 'Actualités et événements', toutesNews: 'Toutes les actualités',
    badge: 'Balthazar 2026',
  },
  nl: {
    telechargements: 'Downloads', news: 'Nieuws',
    dlIntro: 'Onze stalenkaarten en onze technische fiche, om te bekijken en te downloaden. Voor een staal of een vraag over een stof, schrijf ons.',
    tissus: 'Stoffen', fiche: 'Technische fiche', voir: 'Groot bekijken', telecharger: 'Downloaden',
    toutTissus: 'Volledige stalenkaart downloaden', toutFiche: 'Technische fiche downloaden', pdf: 'PDF',
    newsIntro: 'Onderscheidingen, beurzen, pers: het laatste nieuws van Initium³.',
    distEyebrow: 'Brussels Balthazar 2026 · Meubelbeurs Brussel',
    distTitre: '3de plaats, categorie « Liefde op het eerste gezicht »',
    distTexte: 'Onze sofa Olwen werd op de Meubelbeurs Brussel bekroond in de categorie « Love at first sight ». Een mooie erkenning voor het hele team.',
    decouvrirOlwen: 'Ontdek Olwen', lireNews: 'Lees het nieuws', evtPrec: 'Vorig evenement', evtSuiv: 'Volgend evenement', evtsTitre: 'Nieuws en evenementen', toutesNews: 'Al het nieuws',
    badge: 'Balthazar 2026',
  },
  en: {
    telechargements: 'Downloads', news: 'News',
    dlIntro: 'Our fabric swatch cards and our technical sheet, to view and download. For a sample or a question about a fabric, write to us.',
    tissus: 'Fabrics', fiche: 'Technical sheet', voir: 'View full size', telecharger: 'Download',
    toutTissus: 'Download the full swatch book', toutFiche: 'Download the technical sheet', pdf: 'PDF',
    newsIntro: 'Awards, fairs, press: the latest news from Initium³.',
    distEyebrow: 'Brussels Balthazar 2026 · Brussels Furniture Fair',
    distTitre: '3rd place, « Love at first sight » category',
    distTexte: 'Our Olwen sofa received an award at the Brussels Furniture Fair, in the « Love at first sight » category. A wonderful recognition for the whole team.',
    decouvrirOlwen: 'Discover Olwen', lireNews: 'Read the news', evtPrec: 'Previous event', evtSuiv: 'Next event', evtsTitre: 'News and events', toutesNews: 'All news',
    badge: 'Balthazar 2026',
  },
};

// Les fichiers a telecharger (fichiers/, generes depuis les envois d'Olivier).
export const TISSUS = [
  ['canvas-medoc', 'Canvas · Médoc'],
  ['firenze-bold-basket-sunspot', 'Firenze Bouclé · Bold Basket · Sunspot'],
  ['rocky-mountain', 'Rocky Mountain'],
  ['alpine', 'Alpine'],
  ['monochrome', 'Monochrome'],
  ['aquadura', 'Aquadura'],
  ['st-tropez-birdeyes', 'St.Tropez · Birdeyes'],
];
export const FICHE = [
  ['technical-data', { fr: 'Données techniques des tissus', nl: 'Technische gegevens van de stoffen', en: 'Fabric technical data' }],
  ['construction', { fr: 'Construction : un confort durable', nl: 'Constructie: duurzaam comfort', en: 'Construction: lasting comfort' }],
];

// Les articles, du plus recent au plus ancien. date : 'AAAA-MM-JJ', ou 'AAAA-MM' si le jour n'est pas connu.
export const NEWS = [
  {
    id: 'balthazar-2026', date: '2026-11-10',
    etiquette: { fr: 'Distinction', nl: 'Onderscheiding', en: 'Award' },
    titre: {
      fr: 'Initium³ lauréat des Brussels Balthazar 2026',
      nl: 'Initium³ laureaat van de Brussels Balthazar 2026',
      en: 'Initium³ laureate of the Brussels Balthazar 2026',
    },
    chapo: {
      fr: 'Au Salon du Meuble de Bruxelles, notre canapé Olwen remporte la 3e place des Brussels Balthazar 2026, dans la catégorie « Coup de foudre » (Love at first sight).',
      nl: 'Op de Meubelbeurs Brussel behaalt onze sofa Olwen de 3de plaats van de Brussels Balthazar 2026, in de categorie « Liefde op het eerste gezicht » (Love at first sight).',
      en: 'At the Brussels Furniture Fair, our Olwen sofa takes 3rd place at the Brussels Balthazar 2026, in the « Love at first sight » category.',
    },
    texte: {
      fr: ['Une belle reconnaissance pour toute l’équipe, et pour ce que nous défendons : un mobilier hybride, aussi confortable dehors que dedans.', 'Merci au jury, aux organisateurs du salon et à toutes celles et ceux qui sont venus découvrir nos pièces.'],
      nl: ['Een mooie erkenning voor het hele team, en voor waar wij voor staan: hybride meubilair, even comfortabel buiten als binnen.', 'Dank aan de jury, aan de organisatoren van de beurs en aan iedereen die onze stukken kwam ontdekken.'],
      en: ['A wonderful recognition for the whole team, and for what we stand for: hybrid furniture, as comfortable outdoors as it is indoors.', 'Thank you to the jury, to the fair organisers and to everyone who came to discover our pieces.'],
    },
    photos: ['n-affiche', 'n-podium', 'n-trophee', 'n-podium-large', 'n-salle'],
  },
  {
    // Nicolas, 12/11 : « participation au salon du meuble Heysel novembre 2026 », avec les photos du stand.
    id: 'salon-meuble-2026', date: '2026-11',
    etiquette: { fr: 'Salon', nl: 'Beurs', en: 'Fair' },
    titre: {
      fr: 'Participation au Salon du Meuble de Bruxelles',
      nl: 'Deelname aan de Meubelbeurs Brussel',
      en: 'At the Brussels Furniture Fair',
    },
    chapo: {
      fr: 'Initium³ était présent au Salon du Meuble de Bruxelles, au Heysel, en novembre 2026.',
      nl: 'Initium³ was aanwezig op de Meubelbeurs Brussel, op de Heizel, in november 2026.',
      en: 'Initium³ exhibited at the Brussels Furniture Fair, at Heysel, in November 2026.',
    },
    texte: {
      fr: ['C’est sur ce salon que notre canapé Olwen a été distingué aux Brussels Balthazar 2026.'],
      nl: ['Op deze beurs werd onze sofa Olwen bekroond op de Brussels Balthazar 2026.'],
      en: ['It was at this fair that our Olwen sofa received an award at the Brussels Balthazar 2026.'],
    },
    photos: ['n-stand-1'],
    galerie: ['n-stand-2', 'n-stand-3', 'n-stand-4', 'n-stand-5', 'n-stand-6'],
  },
];
