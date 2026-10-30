// Initium³ — mentions legales et confidentialite (LocWeb, 2026-10-30), en FR / NL / EN.
// Identite : registre BCE et VIES (BV INITIUM³, 0479.327.181). Le site ne pose
// aucun cookie de mesure ni de publicite : pas de bandeau de consentement. Si
// une mesure d'audience est branchee un jour, il faudra en ajouter un.
const SOC = 'BV INITIUM³';
const BCE = '0479.327.181';
const ADR = { fr: 'Dworpsestraat 52, 1651 Lot (Beersel), Belgique', nl: 'Dworpsestraat 52, 1651 Lot (Beersel), België', en: 'Dworpsestraat 52, 1651 Lot (Beersel), Belgium' };

export const LEGAL = {
  fr: {
    mentions: { titre: 'Mentions légales', sections: [
      ['Éditeur du site', `${SOC}, société de droit belge — ${ADR.fr}. Numéro d’entreprise (BCE) : ${BCE}. TVA : BE ${BCE}. Contact : par le formulaire de la page Contact.`],
      ['Hébergement', 'Site : GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. Espace professionnel (comptes, catalogue, demandes) : Supabase, serveurs situés dans l’Union européenne.'],
      ['Réalisation', 'LocWeb — Nicolas Masia, entrepreneur individuel, 24 rue Diderot, 34500 Béziers, France — locweb.fr.'],
      ['Propriété intellectuelle', `Les textes, photographies, visuels et modèles présentés sur ce site appartiennent à ${SOC} ou à ses partenaires. Toute reproduction sans autorisation écrite est interdite.`],
      ['Prix', 'Les prix professionnels sont réservés aux clients disposant d’un code d’accès. Ils sont indiqués hors TVA, sous réserve d’erreur ou de modification, et ne constituent une offre qu’après confirmation écrite d’Initium³.'],
    ] },
    confidentialite: { titre: 'Confidentialité et cookies', sections: [
      ['Responsable du traitement', `${SOC}, ${ADR.fr}, BCE ${BCE}.`],
      ['Ce que nous collectons, et pourquoi', 'Formulaire de contact : votre nom, votre e-mail et votre message, pour vous répondre. Espace professionnel : le nom et le numéro d’entreprise de votre société, votre nom, votre e-mail, votre téléphone et vos demandes de commande, pour vous donner accès à nos prix professionnels et traiter vos demandes. Base légale : la réponse à votre demande et les mesures précontractuelles (art. 6.1.b du RGPD).'],
      ['Vérification du numéro de TVA', 'Votre numéro est vérifié auprès de VIES, le service officiel de la Commission européenne. S’il est valide, votre accès s’ouvre aussitôt ; sinon, nous vérifions votre demande nous-mêmes.'],
      ['Qui y a accès', 'Initium³, et LocWeb, qui fait fonctionner le site pour notre compte. Les données sont hébergées par Supabase dans l’Union européenne. Rien n’est vendu ni cédé à des tiers.'],
      ['Combien de temps', 'Tant que votre accès professionnel est actif, puis 3 ans après votre dernière activité. Les messages de contact sont conservés 3 ans au plus.'],
      ['Cookies et stockage', 'Ce site ne dépose aucun cookie publicitaire ni de mesure d’audience. Votre navigateur garde seulement votre connexion à l’espace professionnel et votre demande en cours (stockage local), nécessaires au service. Les polices de caractères sont chargées depuis Google Fonts, qui reçoit à cette occasion l’adresse IP de votre appareil.'],
      ['Vos droits', 'Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, leur limitation ou leur portabilité, et vous opposer à leur traitement, par le formulaire de la page Contact. Vous pouvez aussi introduire une réclamation auprès de l’Autorité de protection des données (autoriteprotectiondonnees.be).'],
    ] },
  },
  nl: {
    mentions: { titre: 'Juridische informatie', sections: [
      ['Uitgever van de site', `${SOC}, vennootschap naar Belgisch recht — ${ADR.nl}. Ondernemingsnummer (KBO): ${BCE}. Btw: BE ${BCE}. Contact: via het formulier op de pagina Contact.`],
      ['Hosting', 'Site: GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Verenigde Staten. Professionele ruimte (accounts, catalogus, aanvragen): Supabase, servers in de Europese Unie.'],
      ['Realisatie', 'LocWeb — Nicolas Masia, eenmanszaak, 24 rue Diderot, 34500 Béziers, Frankrijk — locweb.fr.'],
      ['Intellectuele eigendom', `De teksten, foto’s, beelden en modellen op deze site behoren toe aan ${SOC} of zijn partners. Elke reproductie zonder schriftelijke toestemming is verboden.`],
      ['Prijzen', 'De professionele prijzen zijn voorbehouden aan klanten met een toegangscode. Ze zijn exclusief btw, onder voorbehoud van fouten of wijzigingen, en vormen pas een aanbod na schriftelijke bevestiging door Initium³.'],
    ] },
    confidentialite: { titre: 'Privacy en cookies', sections: [
      ['Verwerkingsverantwoordelijke', `${SOC}, ${ADR.nl}, KBO ${BCE}.`],
      ['Wat we verzamelen, en waarom', 'Contactformulier: uw naam, e-mailadres en bericht, om u te antwoorden. Professionele ruimte: de naam en het ondernemingsnummer van uw bedrijf, uw naam, e-mailadres, telefoonnummer en bestelaanvragen, om u toegang te geven tot onze professionele prijzen en uw aanvragen te behandelen. Rechtsgrond: het beantwoorden van uw aanvraag en precontractuele maatregelen (art. 6.1.b AVG).'],
      ['Controle van het btw-nummer', 'Uw nummer wordt gecontroleerd bij VIES, de officiële dienst van de Europese Commissie. Is het geldig, dan opent uw toegang meteen; anders controleren we uw aanvraag zelf.'],
      ['Wie heeft toegang', 'Initium³, en LocWeb, dat de site voor ons beheert. De gegevens worden gehost door Supabase in de Europese Unie. Niets wordt verkocht of aan derden doorgegeven.'],
      ['Hoe lang', 'Zolang uw professionele toegang actief is, en daarna 3 jaar na uw laatste activiteit. Contactberichten worden maximaal 3 jaar bewaard.'],
      ['Cookies en opslag', 'Deze site plaatst geen reclame- of analysecookies. Uw browser bewaart enkel uw aanmelding bij de professionele ruimte en uw lopende aanvraag (lokale opslag), noodzakelijk voor de dienst. De lettertypes worden geladen via Google Fonts, dat daarbij het IP-adres van uw toestel ontvangt.'],
      ['Uw rechten', 'U kunt inzage, verbetering, wissing, beperking of overdracht van uw gegevens vragen en u tegen de verwerking verzetten, via het formulier op de pagina Contact. U kunt ook klacht indienen bij de Gegevensbeschermingsautoriteit (gegevensbeschermingsautoriteit.be).'],
    ] },
  },
  en: {
    mentions: { titre: 'Legal notice', sections: [
      ['Publisher', `${SOC}, a company under Belgian law — ${ADR.en}. Company number (CBE): ${BCE}. VAT: BE ${BCE}. Contact: through the form on the Contact page.`],
      ['Hosting', 'Website: GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Trade area (accounts, catalogue, requests): Supabase, servers located in the European Union.'],
      ['Website by', 'LocWeb — Nicolas Masia, sole trader, 24 rue Diderot, 34500 Béziers, France — locweb.fr.'],
      ['Intellectual property', `The texts, photographs, visuals and designs shown on this website belong to ${SOC} or its partners. Any reproduction without written permission is prohibited.`],
      ['Prices', 'Trade prices are reserved for customers with an access code. They are shown excluding VAT, subject to errors or changes, and only become an offer once confirmed in writing by Initium³.'],
    ] },
    confidentialite: { titre: 'Privacy and cookies', sections: [
      ['Data controller', `${SOC}, ${ADR.en}, CBE ${BCE}.`],
      ['What we collect, and why', 'Contact form: your name, email and message, to reply to you. Trade area: your company name and number, your name, email, phone and order requests, to give you access to our trade prices and handle your requests. Legal basis: replying to your request and pre-contractual measures (art. 6.1.b GDPR).'],
      ['VAT number check', 'Your number is checked with VIES, the official service of the European Commission. If it is valid, your access opens straight away; otherwise we check your request ourselves.'],
      ['Who can see it', 'Initium³, and LocWeb, who runs the website on our behalf. The data is hosted by Supabase in the European Union. Nothing is sold or passed on to third parties.'],
      ['How long', 'As long as your trade access is active, then 3 years after your last activity. Contact messages are kept for 3 years at most.'],
      ['Cookies and storage', 'This website sets no advertising or analytics cookies. Your browser only keeps your trade area sign-in and your current request (local storage), which the service needs. Fonts are loaded from Google Fonts, which receives your device’s IP address when doing so.'],
      ['Your rights', 'You can ask to access, correct, erase, restrict or port your data, and object to its processing, through the form on the Contact page. You can also lodge a complaint with the Belgian Data Protection Authority (dataprotectionauthority.be).'],
    ] },
  },
};
