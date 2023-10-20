// Computational logic
const compute_kpi = function (currentData) {
    let data = {...currentData}
    if (!data.planEntretien || !data.territoire) { return data }
    /*************************************************************/
    /* Récupération des informations                             */
    /*************************************************************/

    // Récupération des paramètres du plan d'entretien
    let fauchageClassique = data.planEntretien.parametres[0].value;
    let fauchageCollecte = data.planEntretien.parametres[1].value
    let fauchageDamier = data.planEntretien.parametres[2].value;
    let frequenceFauche = data.planEntretien.parametres[3].value;
    let hauteurFauche = data.planEntretien.parametres[4].value;
    let methanisation = data.planEntretien.parametres[5].value;
    let compostage = data.planEntretien.parametres[6].value;
    let fauchageDiff = data.planEntretien.parametres[7].value;
    // let luttePlantesInv = data.planEntretien.parametres[8].value;
    let largeursPasse1 = data.planEntretien.parametres[9].value;
    let largeursPasse2 = data.planEntretien.parametres[10].value;
    let largeursPasse3 = data.planEntretien.parametres[11].value;
    // let periodePasse1 = data.planEntretien.parametres[12].value;
    // let periodePasse2 = data.planEntretien.parametres[13].value;
    // let periodePasse3 = data.planEntretien.parametres[14].value;

    // Récupération de la taille du réseau
    let tailleReseau = data.territoire.departement.tailleReseau || 3271;

    // Récupération des constantes de calcul
    const coutKmClassique = data.constantes_calcul[0].value;
    const coutKmCollecte = data.constantes_calcul[1].value;
    const coutKmDamier = data.constantes_calcul[2].value;
    const herbeKm = data.constantes_calcul[3].value; // tonnes d'herbes collectées par km
    const energieTonneHerbe = data.constantes_calcul[4].value; // kWh produits à partir d'une tonne d'herbe
    const engraisTonneHerbe = data.constantes_calcul[5].value; // kg d'engrais produits à partir d'une tonne d'herbe
    const prixVenteHerbe = data.constantes_calcul[6].value; // € / tonne d'herbe
    const consoKmClassique = data.constantes_calcul[7].value; // en L/km
    const consoKmCollecte = data.constantes_calcul[8].value;
    const consoKmDamier = data.constantes_calcul[9].value;
    const facteurEmissionCarburant = data.constantes_calcul[10].value;
    const allerRetourParisNewYork = data.constantes_calcul[11].value;
    const co2EviteMethaTonne = data.constantes_calcul[12].value; // en tCO2 / tonne méthanisée
    const co2EviteCompostageTonne = data.constantes_calcul[13].value; // en tCO2 / tonne de compost

    /*************************************************************/
    /* Déclaration des variables de calcul                       */
    /*************************************************************/

    // Déclaration des variables pour le calcul des indicateurs économiques
    let lineaireEntretenu = 0;
    let lineaireClassique, lineaireCollecte, lineaireDamier = 0;
    let coutFauchClassique, coutFauchCollecte, coutFauchDamier, coutFauchTotal = 0;

    // Déclaration des variables pour le calcul des données valo
    let quantiteHerbeCollecte = 0;
    let quantiteEnergieProduite = 0;
    let quantiteEngraisProduite = 0;
    let gainVenteHerbe = 0;
    let coutSupCollecte

    // Déclaration des variables pour le calcul des données GES
    let co2Classique, co2Collecte, co2Damier, co2Fauchage = 0;
    let consoClassique, consoCollecte, consoDamier, consoFauchage = 0;
    let parisNewyork = 0
    let co2EviteValo, co2EviteCompostage, co2EviteMetha = 0;

    // Déclaration des variables pour le calcul des indicateurs écosystémiques
    let qualiteSol, maintienBiodiv, fonctionHydro, microclimat, stockageCarbone, attenuationRisques = 0;
    // let securite = 0;
    let coefHauteurFauche, coefFrequenceFauche, coefSurfaceFauchee, coefFauchageDiff, coefExport = 0;

    /*************************************************************/
    /* Calcul des impacts sur les indicateurs                    */
    /*************************************************************/

    // Économiques
    lineaireEntretenu = (tailleReseau * 2) * (largeursPasse1 + largeursPasse2 + largeursPasse3); // les deux côtés de la route sont à entretenir
    lineaireClassique = lineaireEntretenu * fauchageClassique / 100;
    lineaireCollecte = lineaireEntretenu * fauchageCollecte / 100;
    lineaireDamier = lineaireEntretenu * fauchageDamier / 100;
    coutFauchClassique = lineaireClassique * coutKmClassique / 1000; // on met les coûts en k€
    coutFauchCollecte = lineaireCollecte * coutKmCollecte / 1000;
    coutFauchDamier = lineaireDamier * coutKmDamier / 1000;
    coutFauchTotal = coutFauchClassique + coutFauchCollecte + coutFauchDamier;

    // Données valo
    quantiteHerbeCollecte = tailleReseau * 2 * fauchageCollecte / 100 * frequenceFauche * herbeKm;
    quantiteEnergieProduite = quantiteHerbeCollecte * methanisation / 100 * energieTonneHerbe;
    quantiteEngraisProduite = quantiteHerbeCollecte * compostage / 100 * engraisTonneHerbe;
    gainVenteHerbe = quantiteHerbeCollecte * prixVenteHerbe / 1000;
    coutSupCollecte = lineaireCollecte * coutKmCollecte / 1000 - lineaireCollecte * coutKmClassique / 1000

    // Données GES
    consoClassique = lineaireClassique * consoKmClassique;
    consoCollecte = lineaireCollecte * consoKmCollecte;
    consoDamier = lineaireDamier * consoKmDamier;
    consoFauchage = consoClassique + consoCollecte + consoDamier;
    co2Classique = consoClassique * facteurEmissionCarburant / 1000; // 3.16 kgCO2/L d'essence consommé, résultat en tonnes de CO2 équivalent
    co2Collecte = consoCollecte * facteurEmissionCarburant / 1000;
    co2Damier = consoDamier * facteurEmissionCarburant / 1000;
    co2Fauchage = consoFauchage * facteurEmissionCarburant / 1000;
    parisNewyork = co2Fauchage / allerRetourParisNewYork; // un aller retour Paris New York émet 1,75 tonnes de CO2
    co2EviteMetha = quantiteHerbeCollecte * methanisation * co2EviteMethaTonne;
    co2EviteCompostage = quantiteEngraisProduite * compostage * co2EviteCompostageTonne;
    co2EviteValo = co2EviteMetha + co2EviteCompostage;

    /*************************************************************/
    /* Calcul des coefficients                                   */
    /*************************************************************/

    // Indicateurs 
    if (hauteurFauche < 5.9) {
        coefHauteurFauche = -1;
    } else if (hauteurFauche > 9.9) {
        coefHauteurFauche = 1;
    } else {
        coefHauteurFauche = 0;
    };

    if (frequenceFauche > 3.9) {
        coefFrequenceFauche = -1;
    } else if (frequenceFauche < 2.1) {
        coefFrequenceFauche = 1;
    } else {
        coefFrequenceFauche = 0;
    };

    if (fauchageDamier < 10) {
        coefSurfaceFauchee = -1;
    } else if (fauchageDamier < 30) {
        coefSurfaceFauchee = 0;
    } else {
        coefSurfaceFauchee = 1;
    };

    if (fauchageCollecte < 10) {
        coefExport = -1;
    } else if (fauchageCollecte < 30) {
        coefExport = 0;
    } else {
        coefExport = 1;
    };

    if (fauchageDiff === "oui") {
        coefFauchageDiff = 1;
    } else if (fauchageDiff === "non") {
        coefFauchageDiff = -1;
    }

    // Calcul des indicateurs 
    qualiteSol = (2 * coefHauteurFauche + 2 * coefFrequenceFauche) / 4 * 5;
    if (qualiteSol < 1) {
        qualiteSol = 1;
    };

    maintienBiodiv = (4 * coefHauteurFauche + 3 * coefFrequenceFauche + 4 * coefSurfaceFauchee + coefFauchageDiff + 2 * coefExport) / 14 * 5;
    if (maintienBiodiv < 1) {
        maintienBiodiv = 1;
    };

    fonctionHydro = (coefExport) * 5;
    if (fonctionHydro < 1) {
        fonctionHydro = 1;
    };

    microclimat = (coefHauteurFauche) * 5;
    if (microclimat < 1) {
        microclimat = 1;
    };

    stockageCarbone = (coefHauteurFauche + coefFrequenceFauche - coefExport) / 3 * 5;
    if (stockageCarbone < 1) {
        stockageCarbone = 1;
    };

    attenuationRisques = (coefFrequenceFauche + 3 * coefExport) / 4 * 5;
    if (attenuationRisques < 1) {
        attenuationRisques = 1;
    };

    // Note globale
    let impactGlobal = 0;

    impactGlobal = (qualiteSol + maintienBiodiv + fonctionHydro + microclimat + stockageCarbone + attenuationRisques) / 30 * 100;
    impactGlobal = (qualiteSol + maintienBiodiv + fonctionHydro + microclimat + stockageCarbone + attenuationRisques) / 30 * 100;
    impactGlobal = (qualiteSol + maintienBiodiv + fonctionHydro + microclimat + stockageCarbone + attenuationRisques) / 30 * 100;

    // Actualisation des valeurs à afficher
    data.indicateurs_economiques[0].value = Math.round(coutFauchTotal);
    data.indicateurs_economiques[1].value = Math.round(coutFauchTotal / lineaireEntretenu);
    data.indicateurs_economiques[2].value = Math.round(coutFauchClassique);
    data.indicateurs_economiques[3].value = Math.round(coutFauchCollecte);
    data.indicateurs_economiques[4].value = Math.round(coutFauchDamier);
    data.indicateurs_economiques[5].value = Math.round(coutSupCollecte);
    data.indicateurs_economiques[6].value = Math.round(gainVenteHerbe);

    data.donnees_valo[0].value = Math.round(quantiteHerbeCollecte);
    data.donnees_valo[1].value = Math.round(quantiteEnergieProduite);
    data.donnees_valo[2].value = Math.round(quantiteEngraisProduite);

    data.indicateurs_ges[0].value = Math.round(parisNewyork);
    data.indicateurs_ges[1].value = Math.round(co2Fauchage);
    data.indicateurs_ges[2].value = Math.round(co2Classique);
    data.indicateurs_ges[3].value = Math.round(co2Collecte);
    data.indicateurs_ges[4].value = Math.round(co2Damier);
        data.indicateurs_ges[5].value = Math.round(co2EviteValo);
    data.indicateurs_ges[6].value = Math.round(co2EviteMetha);
    data.indicateurs_ges[7].value = Math.round(co2EviteCompostage);

    data.indicateurs_ecosysteme[0].value = Math.round(qualiteSol);
    data.indicateurs_ecosysteme[1].value = Math.round(maintienBiodiv);
    data.indicateurs_ecosysteme[2].value = Math.round(fonctionHydro);
    data.indicateurs_ecosysteme[3].value = Math.round(microclimat);
    data.indicateurs_ecosysteme[4].value = Math.round(stockageCarbone);
    data.indicateurs_ecosysteme[5].value = Math.round(attenuationRisques);

    data.notes_ecosysteme[1].value = Math.round(impactGlobal);

    return data;
};

const save_currentData = function(currentData) {
    let data = {...currentData};

    //Sauvegarde des indicateurs pré-comparaison
    // Indicateurs économiques
    data.indicateurs_economiques.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    // Indicateurs écosystémiques
    data.indicateurs_ecosysteme.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    // Indicateurs GES
    data.indicateurs_ges.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    // Données valo
    data.donnees_valo.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    // Bilan global écosystémique
    data.notes_ecosysteme.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    return data;
};

const Services = {
    'compute_kpi': compute_kpi,
    'save_currentData': save_currentData
};

export default Services;