// Agents B2B d'Initium³ (demande d'Olivier le 08/11/2026, salon du meuble de Bruxelles,
// sur le modele de gommaire.com/agents-b2b). Page /agents-b2b/, /nl/b2b-agenten/, /en/b2b-agents/.
//
// Une ligne par agent, dans l'ordre voulu. pays = code ISO a deux lettres (BE, FR, NL, LU,
// DE, IT, ES, CH, GB...) : le nom du pays s'ecrit tout seul dans les trois langues, et
// un filtre par pays apparait des que deux pays sont representes.
//   { pays: 'FR', nom: 'Prenom Nom', societe: 'Societe', zone: 'Ile-de-France, Normandie',
//     telephone: '+33 6 00 00 00 00', email: 'agent@exemple.com', adresse: 'Rue, CP Ville' }
// Seuls pays et nom sont obligatoires. Ne JAMAIS inventer un agent : uniquement ceux
// envoyes par Olivier.
export const AGENTS = [];
