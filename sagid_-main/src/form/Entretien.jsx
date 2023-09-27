import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Select, MenuItem, Button } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';

import './form.scss';
import SliderTextFieldForm from './SliderTextFieldForm';
import SliderTextFieldForm_HauteurFauche from './SliderTextFieldForm_HauteurFauche';
import _, { set } from 'lodash';

import { styled } from '@mui/material/styles';

const StyledRadioGroup = styled(RadioGroup)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1rem',
});

const StyledFormControl = styled(FormControl)({
  margin: '1rem',
  minWidth: '120px',
  maxWidth: '300px',
  width: '100%',
  '& .MuiFormLabel-root': {
    marginBottom: '0.5rem',
  },
});

const Entretien = ({ currentData, setCurrentData, setVisible }) => {

    // Initialisation des options d'entretien en fonction du plan d'entretien choisi par l'utilisateur
    const [selectedOption1, setSelectedOption1] = useState(currentData.planEntretien[4].parametres[7]);
    const [selectedOption2, setSelectedOption2] = useState(currentData.planEntretien[4].parametres[8]);   
    
    // OPTIONS D'ENTRETIEN
    // Modification de l'utilisateur du paramètre "Fauchage différencié"
    const handleOption1Change = _.debounce((event) => {
        // Mise à jour de la sélection
        setSelectedOption1(event.target.value);

        const newCurrentData = { ...currentData };
        // Déclaration des variables
        let fauchageClassique, fauchageCollecte, fauchageDamier = 0;
        let frequenceFauche = 0;
        let hauteurFauche = 0;
        let methanisation, compostage = 0;
        let fauchageDiff, luttePlantesInv = "";
        let tailleReseau = 0;
        let largeursPasse1, largeursPasse2, largeursPasse3 = 0;
        let periodePasse1, periodePasse2, periodePasse3 = 0;
        
        // Récupération de la nouvelle valeur de hauteur de fauche
        fauchageDiff = event.target.value;
        newCurrentData.planEntretien[4].parametres[7] = fauchageDiff;
        // Récupération des autres valeurs
        fauchageClassique = newCurrentData.planEntretien[4].parametres[0];
        fauchageCollecte = newCurrentData.planEntretien[4].parametres[1];
        fauchageDamier = newCurrentData.planEntretien[4].parametres[2];
        frequenceFauche = newCurrentData.planEntretien[4].parametres[3];
        hauteurFauche = newCurrentData.planEntretien[4].parametres[4];
        methanisation = newCurrentData.planEntretien[4].parametres[5];
        compostage = newCurrentData.planEntretien[4].parametres[6];
        fauchageDiff = newCurrentData.planEntretien[4].parametres[7];
        luttePlantesInv = newCurrentData.planEntretien[4].parametres[8];
        largeursPasse1 = newCurrentData.planEntretien[4].parametres[9];
        largeursPasse2 = newCurrentData.planEntretien[4].parametres[10];
        largeursPasse3 = newCurrentData.planEntretien[4].parametres[11];
        periodePasse1 = newCurrentData.planEntretien[4].parametres[12];
        periodePasse2 = newCurrentData.planEntretien[4].parametres[13];
        periodePasse3 = newCurrentData.planEntretien[4].parametres[14];
        tailleReseau = newCurrentData.planEntretien[4].parametres[15];

        // Déclaration des variables pour le calcul des indicateurs économiques
        let lineaireEntretenu = 0;
        let lineaireClassique, lineaireCollecte, lineaireDamier = 0;
        let coutFauchClassique, coutFauchCollecte, coutFauchDamier, coutFauchTotal = 0;
        // Constantes
        const coutKmClassique = currentData.constantes_calcul[0].value;
        const coutKmCollecte = currentData.constantes_calcul[1].value;
        const coutKmDamier = currentData.constantes_calcul[2].value;

        // Déclaration des variables pour le calcul des données valo
        let quantiteHerbeCollecte = 0;
        let quantiteEnergieProduite = 0;
        let quantiteEngraisProduite = 0;
        let gainVenteHerbe = 0;
        let benefValo, benefMethanisation, benefCompostage = 0;
        let coutMethanisation, coutCompostage, coutValo = 0;
        // Constantes
        const herbeKm = currentData.constantes_calcul[3].value; // tonnes d'herbes collectées par km
        const energieTonneHerbe = currentData.constantes_calcul[4].value; // kWh produits à partir d'une tonne d'herbe
        const engraisTonneHerbe = currentData.constantes_calcul[5].value; // kg d'engrais produits à partir d'une tonne d'herbe
        const prixVenteHerbe = currentData.constantes_calcul[6].value; // € / tonne d'herbe
        //const coutTraitementMethanisationTonne = 45; // Coût de traitement d'une tonne d'herbe en méthanisation
        //const coutTraitementCompostageTonne = 35; // Coût de traitement d'une tonne d'herbe en compostage
        //const benefMethanisationTonne = 12; // Bénéfices réalisés lors de la production d'un MWh en méthanisation
        //const benefCompostageTonne = 8; // Bénéfices réalisés lors de la production d'une tonne d'engrais par compostage

        // Déclaration des variables pour le calcul des données GES
        let co2Classique, co2Collecte, co2Damier, co2Fauchage = 0;
        let consoClassique, consoCollecte, consoDamier, consoFauchage = 0;
        let parisNewyork = 0
        let co2EviteValo = 0;
        // Constantes
        const consoKmClassique = currentData.constantes_calcul[7].value; // en L/km
        const consoKmCollecte = currentData.constantes_calcul[8].value;
        const consoKmDamier = currentData.constantes_calcul[9].value;
        const facteurEmissionCarburant = currentData.constantes_calcul[10].value;
        const allerRetourParisNewYork = currentData.constantes_calcul[11].value;
        const co2EviteMetha = currentData.constantes_calcul[12].value; // en tCO2 / MWh
        const co2EviteCompostage = currentData.constantes_calcul[13].value; // en tCO2 / tonne de compost

        // Déclaration des variables pour le calcul des indicateurs écosystémiques
        let qualiteSol, maintienBiodiv, fonctionHydro, microclimat, stockageCarbone, attenuationRisques, securite = 0;
        let coefHauteurFauche, coefFrequenceFauche, coefSurfaceFauchee, coefFauchageDiff, coefExport = 0;

        // Calcul des impacts sur les indicateurs
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
        quantiteHerbeCollecte = lineaireCollecte * herbeKm;
        quantiteEnergieProduite = quantiteHerbeCollecte * methanisation / 100 * energieTonneHerbe;
        quantiteEngraisProduite = quantiteHerbeCollecte * compostage / 100 * engraisTonneHerbe;
        gainVenteHerbe = quantiteHerbeCollecte * prixVenteHerbe;
        //benefMethanisation = benefMethanisationTonne * quantiteEnergieProduite;
        //benefCompostage = benefCompostageTonne * quantiteEngraisProduite;
        //benefValo = benefMethanisation + benefCompostage;
        //coutMethanisation = quantiteHerbeCollecte * methanisation / 100 * coutTraitementMethanisationTonne / 1000;
        //coutCompostage = quantiteHerbeCollecte * compostage / 100 * coutTraitementCompostageTonne / 1000;
        //coutValo = coutMethanisation + coutCompostage;

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
        //co2EviteValo = quantiteEnergieProduite * co2EviteMetha + quantiteEngraisProduite * co2EviteCompostage;

        // Indicateurs écosystémiques
        // Calcul des coefficients
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

        if (fauchageDiff === "differencie") {
            coefFauchageDiff = 1;
        } else if (fauchageDiff === "non_differencie") {
            coefFauchageDiff = -1;
        }

        // Calcul des indicateurs 
        qualiteSol = (2 * coefHauteurFauche + 2 * coefFrequenceFauche) / 4 * 5;
        if (qualiteSol < 1) {
            qualiteSol = 1;
        };

        maintienBiodiv = (4 * coefHauteurFauche + 5 * coefFrequenceFauche + coefSurfaceFauchee + coefFauchageDiff + 2 * coefExport) / 13 * 5;
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

        // Actualisation des valeurs à afficher
        newCurrentData.indicateurs_economiques[0].value = Math.round(coutFauchTotal);
        newCurrentData.indicateurs_economiques[1].value = Math.round(coutFauchTotal / lineaireEntretenu);
        newCurrentData.indicateurs_economiques[2].value = Math.round(coutFauchClassique);
        newCurrentData.indicateurs_economiques[3].value = Math.round(coutFauchCollecte);
        newCurrentData.indicateurs_economiques[4].value = Math.round(coutFauchDamier);
        //newCurrentData.indicateurs_economiques[5].value = Math.round(coutValo);
        //newCurrentData.indicateurs_economiques[6].value = Math.round(coutMethanisation);
        //newCurrentData.indicateurs_economiques[7].value = Math.round(coutCompostage);
        //newCurrentData.indicateurs_economiques[8].value = Math.round(benefValo);

        newCurrentData.donnees_valo[0].value = Math.round(quantiteHerbeCollecte);
        newCurrentData.donnees_valo[1].value = Math.round(quantiteEnergieProduite);
        newCurrentData.donnees_valo[2].value = Math.round(quantiteEngraisProduite);

        newCurrentData.indicateurs_ges[0].value = Math.round(parisNewyork);
        newCurrentData.indicateurs_ges[1].value = Math.round(co2Fauchage);
        newCurrentData.indicateurs_ges[2].value = Math.round(co2Classique);
        newCurrentData.indicateurs_ges[3].value = Math.round(co2Collecte);
        newCurrentData.indicateurs_ges[4].value = Math.round(co2Damier);
        //newCurrentData.indicateurs_ges[5].value = Math.round(co2EviteValo);

        newCurrentData.indicateurs_ecosysteme[0].value = Math.round(qualiteSol);
        newCurrentData.indicateurs_ecosysteme[1].value = Math.round(maintienBiodiv);
        newCurrentData.indicateurs_ecosysteme[2].value = Math.round(fonctionHydro);
        newCurrentData.indicateurs_ecosysteme[3].value = Math.round(microclimat);
        newCurrentData.indicateurs_ecosysteme[4].value = Math.round(stockageCarbone);
        newCurrentData.indicateurs_ecosysteme[5].value = Math.round(attenuationRisques);

        newCurrentData.notes_ecosysteme[1].value = Math.round(impactGlobal);

        newCurrentData.planEntretien[4].parametres[15] = Math.round(tailleReseau);
        setCurrentData(newCurrentData);
    }, 100);

    // Modification par l'utilisateur du paramètre "Lutte contre les plantes invasives
    const handleOption2Change = _.debounce((event) => {
        // Mise à jour de la sélection
        setSelectedOption2(event.target.value);

        const newCurrentData = { ...currentData };
        // Déclaration des variables
        let fauchageClassique, fauchageCollecte, fauchageDamier = 0;
        let frequenceFauche = 0;
        let hauteurFauche = 0;
        let methanisation, compostage = 0;
        let fauchageDiff, luttePlantesInv = "";
        let largeursPasse1, largeursPasse2, largeursPasse3 = 0;
        let periodePasse1, periodePasse2, periodePasse3 = 0;
        let tailleReseau = 0;
        
        // Récupération de la nouvelle valeur de hauteur de fauche
        luttePlantesInv = event.target.value;
        newCurrentData.planEntretien[4].parametres[8] = luttePlantesInv;
        // Récupération des autres valeurs
        fauchageClassique = newCurrentData.planEntretien[4].parametres[0];
        fauchageCollecte = newCurrentData.planEntretien[4].parametres[1];
        fauchageDamier = newCurrentData.planEntretien[4].parametres[2];
        frequenceFauche = newCurrentData.planEntretien[4].parametres[3];
        hauteurFauche = newCurrentData.planEntretien[4].parametres[4];
        methanisation = newCurrentData.planEntretien[4].parametres[5];
        compostage = newCurrentData.planEntretien[4].parametres[6];
        fauchageDiff = newCurrentData.planEntretien[4].parametres[7];
        luttePlantesInv = newCurrentData.planEntretien[4].parametres[8];
        largeursPasse1 = newCurrentData.planEntretien[4].parametres[9];
        largeursPasse2 = newCurrentData.planEntretien[4].parametres[10];
        largeursPasse3 = newCurrentData.planEntretien[4].parametres[11];
        periodePasse1 = newCurrentData.planEntretien[4].parametres[12];
        periodePasse2 = newCurrentData.planEntretien[4].parametres[13];
        periodePasse3 = newCurrentData.planEntretien[4].parametres[14];
        tailleReseau = newCurrentData.planEntretien[4].parametres[15];

        // Déclaration des variables pour le calcul des indicateurs économiques
        let lineaireEntretenu = 0;
        let lineaireClassique, lineaireCollecte, lineaireDamier = 0;
        let coutFauchClassique, coutFauchCollecte, coutFauchDamier, coutFauchTotal = 0;
        // Constantes
        const coutKmClassique = currentData.constantes_calcul[0].value;
        const coutKmCollecte = currentData.constantes_calcul[1].value;
        const coutKmDamier = currentData.constantes_calcul[2].value;

        // Déclaration des variables pour le calcul des données valo
        let quantiteHerbeCollecte = 0;
        let quantiteEnergieProduite = 0;
        let quantiteEngraisProduite = 0;
        let gainVenteHerbe = 0;
        let benefValo, benefMethanisation, benefCompostage = 0;
        let coutMethanisation, coutCompostage, coutValo = 0;
        // Constantes
        const herbeKm = currentData.constantes_calcul[3].value; // tonnes d'herbes collectées par km
        const energieTonneHerbe = currentData.constantes_calcul[4].value; // kWh produits à partir d'une tonne d'herbe
        const engraisTonneHerbe = currentData.constantes_calcul[5].value; // kg d'engrais produits à partir d'une tonne d'herbe
        const prixVenteHerbe = currentData.constantes_calcul[6].value; // € / tonne d'herbe
        //const coutTraitementMethanisationTonne = 45; // Coût de traitement d'une tonne d'herbe en méthanisation
        //const coutTraitementCompostageTonne = 35; // Coût de traitement d'une tonne d'herbe en compostage
        //const benefMethanisationTonne = 12; // Bénéfices réalisés lors de la production d'un MWh en méthanisation
        //const benefCompostageTonne = 8; // Bénéfices réalisés lors de la production d'une tonne d'engrais par compostage

        // Déclaration des variables pour le calcul des données GES
        let co2Classique, co2Collecte, co2Damier, co2Fauchage = 0;
        let consoClassique, consoCollecte, consoDamier, consoFauchage = 0;
        let parisNewyork = 0
        let co2EviteValo = 0;
        // Constantes
        const consoKmClassique = currentData.constantes_calcul[7].value; // en L/km
        const consoKmCollecte = currentData.constantes_calcul[8].value;
        const consoKmDamier = currentData.constantes_calcul[9].value;
        const facteurEmissionCarburant = currentData.constantes_calcul[10].value;
        const allerRetourParisNewYork = currentData.constantes_calcul[11].value;
        const co2EviteMetha = currentData.constantes_calcul[12].value; // en tCO2 / MWh
        const co2EviteCompostage = currentData.constantes_calcul[13].value; // en tCO2 / tonne de compost

        // Déclaration des variables pour le calcul des indicateurs écosystémiques
        let qualiteSol, maintienBiodiv, fonctionHydro, microclimat, stockageCarbone, attenuationRisques, securite = 0;
        let coefHauteurFauche, coefFrequenceFauche, coefSurfaceFauchee, coefFauchageDiff, coefExport = 0;

        // Calcul des impacts sur les indicateurs
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
        quantiteHerbeCollecte = lineaireCollecte * herbeKm;
        quantiteEnergieProduite = quantiteHerbeCollecte * methanisation / 100 * energieTonneHerbe;
        quantiteEngraisProduite = quantiteHerbeCollecte * compostage / 100 * engraisTonneHerbe;
        gainVenteHerbe = quantiteHerbeCollecte * prixVenteHerbe;
        //benefMethanisation = benefMethanisationTonne * quantiteEnergieProduite;
        //benefCompostage = benefCompostageTonne * quantiteEngraisProduite;
        //benefValo = benefMethanisation + benefCompostage;
        //coutMethanisation = quantiteHerbeCollecte * methanisation / 100 * coutTraitementMethanisationTonne / 1000;
        //coutCompostage = quantiteHerbeCollecte * compostage / 100 * coutTraitementCompostageTonne / 1000;
        //coutValo = coutMethanisation + coutCompostage;

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
        //co2EviteValo = quantiteEnergieProduite * co2EviteMetha + quantiteEngraisProduite * co2EviteCompostage;

        // Indicateurs écosystémiques
        // Calcul des coefficients
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

        if (fauchageDiff === "differencie") {
            coefFauchageDiff = 1;
        } else if (fauchageDiff === "non_differencie") {
            coefFauchageDiff = -1;
        }

        // Calcul des indicateurs 
        qualiteSol = (2 * coefHauteurFauche + 2 * coefFrequenceFauche) / 4 * 5;
        if (qualiteSol < 1) {
            qualiteSol = 1;
        };

        maintienBiodiv = (4 * coefHauteurFauche + 6 * coefFrequenceFauche + coefSurfaceFauchee + coefFauchageDiff + 2 * coefExport) / 13 * 5;
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

        // Actualisation des valeurs à afficher
        newCurrentData.indicateurs_economiques[0].value = Math.round(coutFauchTotal);
        newCurrentData.indicateurs_economiques[1].value = Math.round(coutFauchTotal / lineaireEntretenu);
        newCurrentData.indicateurs_economiques[2].value = Math.round(coutFauchClassique);
        newCurrentData.indicateurs_economiques[3].value = Math.round(coutFauchCollecte);
        newCurrentData.indicateurs_economiques[4].value = Math.round(coutFauchDamier);
        newCurrentData.indicateurs_economiques[5].value = Math.round(coutValo);
        newCurrentData.indicateurs_economiques[6].value = Math.round(coutMethanisation);
        newCurrentData.indicateurs_economiques[7].value = Math.round(coutCompostage);
        //newCurrentData.indicateurs_economiques[8].value = Math.round(benefValo);

        newCurrentData.donnees_valo[0].value = Math.round(quantiteHerbeCollecte);
        newCurrentData.donnees_valo[1].value = Math.round(quantiteEnergieProduite);
        newCurrentData.donnees_valo[2].value = Math.round(quantiteEngraisProduite);

        newCurrentData.indicateurs_ges[0].value = Math.round(parisNewyork);
        newCurrentData.indicateurs_ges[1].value = Math.round(co2Fauchage);
        newCurrentData.indicateurs_ges[2].value = Math.round(co2Classique);
        newCurrentData.indicateurs_ges[3].value = Math.round(co2Collecte);
        newCurrentData.indicateurs_ges[4].value = Math.round(co2Damier);
        newCurrentData.indicateurs_ges[5].value = Math.round(co2EviteValo);

        newCurrentData.indicateurs_ecosysteme[0].value = Math.round(qualiteSol);
        newCurrentData.indicateurs_ecosysteme[1].value = Math.round(maintienBiodiv);
        newCurrentData.indicateurs_ecosysteme[2].value = Math.round(fonctionHydro);
        newCurrentData.indicateurs_ecosysteme[3].value = Math.round(microclimat);
        newCurrentData.indicateurs_ecosysteme[4].value = Math.round(stockageCarbone);
        newCurrentData.indicateurs_ecosysteme[5].value = Math.round(attenuationRisques);

        newCurrentData.notes_ecosysteme[1].value = Math.round(impactGlobal);

        newCurrentData.planEntretien[4].parametres[14] = Math.round(tailleReseau);

        // Mise à jour des indicateurs
        setCurrentData(newCurrentData);
    }, 100);

    // Modification de l'utilisateur du paramètre "Hauteur de fauche"
    const modifHauteurFauche = _.debounce((id, newValue) => {

        const newCurrentData = { ...currentData };
        // Déclaration des variables
        let fauchageClassique, fauchageCollecte, fauchageDamier = 0;
        let frequenceFauche = 0;
        let hauteurFauche = 0;
        let methanisation, compostage = 0;
        let fauchageDiff, luttePlantesInv = "";
        let largeursPasse1, largeursPasse2, largeursPasse3 = 0;
        let periodePasse1, periodePasse2, periodePasse3 = 0;
        let tailleReseau = 0;
        
        // Récupération de la nouvelle valeur de hauteur de fauche
        hauteurFauche = newValue;
        newCurrentData.planEntretien[4].parametres[4] = hauteurFauche;
        // Récupération des autres valeurs
        fauchageClassique = newCurrentData.planEntretien[4].parametres[0];
        fauchageCollecte = newCurrentData.planEntretien[4].parametres[1];
        fauchageDamier = newCurrentData.planEntretien[4].parametres[2];
        frequenceFauche = newCurrentData.planEntretien[4].parametres[3];
        hauteurFauche = newCurrentData.planEntretien[4].parametres[4];
        methanisation = newCurrentData.planEntretien[4].parametres[5];
        compostage = newCurrentData.planEntretien[4].parametres[6];
        fauchageDiff = newCurrentData.planEntretien[4].parametres[7];
        luttePlantesInv = newCurrentData.planEntretien[4].parametres[8];
        largeursPasse1 = newCurrentData.planEntretien[4].parametres[9];
        largeursPasse2 = newCurrentData.planEntretien[4].parametres[10];
        largeursPasse3 = newCurrentData.planEntretien[4].parametres[11];
        periodePasse1 = newCurrentData.planEntretien[4].parametres[12];
        periodePasse2 = newCurrentData.planEntretien[4].parametres[13];
        periodePasse3 = newCurrentData.planEntretien[4].parametres[14];
        tailleReseau = newCurrentData.planEntretien[4].parametres[15];

        // Déclaration des variables pour le calcul des indicateurs économiques
        let lineaireEntretenu = 0;
        let lineaireClassique, lineaireCollecte, lineaireDamier = 0;
        let coutFauchClassique, coutFauchCollecte, coutFauchDamier, coutFauchTotal = 0;
        // Constantes
        const coutKmClassique = currentData.constantes_calcul[0].value;
        const coutKmCollecte = currentData.constantes_calcul[1].value;
        const coutKmDamier = currentData.constantes_calcul[2].value;

        // Déclaration des variables pour le calcul des données valo
        let quantiteHerbeCollecte = 0;
        let quantiteEnergieProduite = 0;
        let quantiteEngraisProduite = 0;
        let gainVenteHerbe = 0;
        let benefValo, benefMethanisation, benefCompostage = 0;
        let coutMethanisation, coutCompostage, coutValo = 0;
        // Constantes
        const herbeKm = currentData.constantes_calcul[3].value; // tonnes d'herbes collectées par km
        const energieTonneHerbe = currentData.constantes_calcul[4].value; // kWh produits à partir d'une tonne d'herbe
        const engraisTonneHerbe = currentData.constantes_calcul[5].value; // kg d'engrais produits à partir d'une tonne d'herbe
        const prixVenteHerbe = currentData.constantes_calcul[6].value; // € / tonne d'herbe
        //const coutTraitementMethanisationTonne = 45; // Coût de traitement d'une tonne d'herbe en méthanisation
        //const coutTraitementCompostageTonne = 35; // Coût de traitement d'une tonne d'herbe en compostage
        //const benefMethanisationTonne = 12; // Bénéfices réalisés lors de la production d'un MWh en méthanisation
        //const benefCompostageTonne = 8; // Bénéfices réalisés lors de la production d'une tonne d'engrais par compostage

        // Déclaration des variables pour le calcul des données GES
        let co2Classique, co2Collecte, co2Damier, co2Fauchage = 0;
        let consoClassique, consoCollecte, consoDamier, consoFauchage = 0;
        let parisNewyork = 0
        let co2EviteValo = 0;
        // Constantes
        const consoKmClassique = currentData.constantes_calcul[7].value; // en L/km
        const consoKmCollecte = currentData.constantes_calcul[8].value;
        const consoKmDamier = currentData.constantes_calcul[9].value;
        const facteurEmissionCarburant = currentData.constantes_calcul[10].value;
        const allerRetourParisNewYork = currentData.constantes_calcul[11].value;
        const co2EviteMetha = currentData.constantes_calcul[12].value; // en tCO2 / MWh
        const co2EviteCompostage = currentData.constantes_calcul[13].value; // en tCO2 / tonne de compost

        // Déclaration des variables pour le calcul des indicateurs écosystémiques
        let qualiteSol, maintienBiodiv, fonctionHydro, microclimat, stockageCarbone, attenuationRisques, securite = 0;
        let coefHauteurFauche, coefFrequenceFauche, coefSurfaceFauchee, coefFauchageDiff, coefExport = 0;

        // Calcul des impacts sur les indicateurs
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
        quantiteHerbeCollecte = lineaireCollecte * herbeKm;
        quantiteEnergieProduite = quantiteHerbeCollecte * methanisation / 100 * energieTonneHerbe;
        quantiteEngraisProduite = quantiteHerbeCollecte * compostage / 100 * engraisTonneHerbe;
        gainVenteHerbe = quantiteHerbeCollecte * prixVenteHerbe;
        //benefMethanisation = benefMethanisationTonne * quantiteEnergieProduite;
        //benefCompostage = benefCompostageTonne * quantiteEngraisProduite;
        //benefValo = benefMethanisation + benefCompostage;
        //coutMethanisation = quantiteHerbeCollecte * methanisation / 100 * coutTraitementMethanisationTonne / 1000;
        //coutCompostage = quantiteHerbeCollecte * compostage / 100 * coutTraitementCompostageTonne / 1000;
        //coutValo = coutMethanisation + coutCompostage;

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
        //co2EviteValo = quantiteEnergieProduite * co2EviteMetha + quantiteEngraisProduite * co2EviteCompostage;

        // Indicateurs écosystémiques
        // Calcul des coefficients
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

        if (fauchageDiff === "differencie") {
            coefFauchageDiff = 1;
        } else if (fauchageDiff === "non_differencie") {
            coefFauchageDiff = -1;
        }

        // Calcul des indicateurs 
        qualiteSol = (2 * coefHauteurFauche + 2 * coefFrequenceFauche) / 4 * 5;
        if (qualiteSol < 1) {
            qualiteSol = 1;
        };

        maintienBiodiv = (4 * coefHauteurFauche + 6 * coefFrequenceFauche + coefSurfaceFauchee + coefFauchageDiff + 2 * coefExport) / 13 * 5;
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

        // Actualisation des valeurs à afficher
        newCurrentData.indicateurs_economiques[0].value = Math.round(coutFauchTotal);
        newCurrentData.indicateurs_economiques[1].value = Math.round(coutFauchTotal / lineaireEntretenu);
        newCurrentData.indicateurs_economiques[2].value = Math.round(coutFauchClassique);
        newCurrentData.indicateurs_economiques[3].value = Math.round(coutFauchCollecte);
        newCurrentData.indicateurs_economiques[4].value = Math.round(coutFauchDamier);
        newCurrentData.indicateurs_economiques[5].value = Math.round(coutValo);
        newCurrentData.indicateurs_economiques[6].value = Math.round(coutMethanisation);
        newCurrentData.indicateurs_economiques[7].value = Math.round(coutCompostage);
        //newCurrentData.indicateurs_economiques[8].value = Math.round(benefValo);

        newCurrentData.donnees_valo[0].value = Math.round(quantiteHerbeCollecte);
        newCurrentData.donnees_valo[1].value = Math.round(quantiteEnergieProduite);
        newCurrentData.donnees_valo[2].value = Math.round(quantiteEngraisProduite);

        newCurrentData.indicateurs_ges[0].value = Math.round(parisNewyork);
        newCurrentData.indicateurs_ges[1].value = Math.round(co2Fauchage);
        newCurrentData.indicateurs_ges[2].value = Math.round(co2Classique);
        newCurrentData.indicateurs_ges[3].value = Math.round(co2Collecte);
        newCurrentData.indicateurs_ges[4].value = Math.round(co2Damier);
        newCurrentData.indicateurs_ges[5].value = Math.round(co2EviteValo);

        newCurrentData.indicateurs_ecosysteme[0].value = Math.round(qualiteSol);
        newCurrentData.indicateurs_ecosysteme[1].value = Math.round(maintienBiodiv);
        newCurrentData.indicateurs_ecosysteme[2].value = Math.round(fonctionHydro);
        newCurrentData.indicateurs_ecosysteme[3].value = Math.round(microclimat);
        newCurrentData.indicateurs_ecosysteme[4].value = Math.round(stockageCarbone);
        newCurrentData.indicateurs_ecosysteme[5].value = Math.round(attenuationRisques);

        newCurrentData.notes_ecosysteme[1].value = Math.round(impactGlobal);

        newCurrentData.planEntretien[4].parametres[14] = Math.round(tailleReseau);

        // Mise à jour des indicateurs
        setCurrentData(newCurrentData);
    }, 100);

    //TYPE DE FAUCHAGE ET VALORISATION
    // Modification de l'utilisateur du paramètre "Fauchage classique"
    const handleSliderChange = _.debounce((id, newValue) => {
        
        const newCurrentData = { ...currentData };
        
        // Déclaration des variables
        let fauchageClassique, fauchageCollecte, fauchageDamier = 0;
        let frequenceFauche = 0;
        let hauteurFauche = 0;
        let methanisation, compostage = 0;
        let fauchageDiff, luttePlantesInv = "";
        let largeursPasse1, largeursPasse2, largeursPasse3 = 0;
        let periodePasse1, periodePasse2, periodePasse3 = 0;
        let tailleReseau = 0;
        // Récupération de la valeur modifiée
        if (id === "slider1") {
            fauchageClassique = newValue;
            newCurrentData.planEntretien[4].parametres[0] = fauchageClassique;
        } else if (id === "slider2") {
            fauchageCollecte = newValue;
            newCurrentData.planEntretien[4].parametres[1] = fauchageCollecte;
        } else if (id === "slider3") {
            fauchageDamier = newValue;
            newCurrentData.planEntretien[4].parametres[2] = fauchageDamier;
        } else if (id === "slider4") {
            methanisation = newValue;
            newCurrentData.planEntretien[4].parametres[5] = methanisation;
        } else if (id === "slider5") {
            compostage = newValue;
            newCurrentData.planEntretien[4].parametres[6] = compostage;
        }
        // Récupération des autres valeurs
        fauchageClassique = newCurrentData.planEntretien[4].parametres[0];
        fauchageCollecte = newCurrentData.planEntretien[4].parametres[1];
        fauchageDamier = newCurrentData.planEntretien[4].parametres[2];
        frequenceFauche = newCurrentData.planEntretien[4].parametres[3];
        hauteurFauche = newCurrentData.planEntretien[4].parametres[4];
        methanisation = newCurrentData.planEntretien[4].parametres[5];
        compostage = newCurrentData.planEntretien[4].parametres[6];
        fauchageDiff = newCurrentData.planEntretien[4].parametres[7];
        luttePlantesInv = newCurrentData.planEntretien[4].parametres[8];
        largeursPasse1 = newCurrentData.planEntretien[4].parametres[9];
        largeursPasse2 = newCurrentData.planEntretien[4].parametres[10];
        largeursPasse3 = newCurrentData.planEntretien[4].parametres[11];
        periodePasse1 = newCurrentData.planEntretien[4].parametres[12];
        periodePasse2 = newCurrentData.planEntretien[4].parametres[13];
        periodePasse3 = newCurrentData.planEntretien[4].parametres[14];
        tailleReseau = newCurrentData.planEntretien[4].parametres[15];
        
        // Déclaration des variables pour le calcul des indicateurs économiques
        let lineaireEntretenu = 0;
        let lineaireClassique, lineaireCollecte, lineaireDamier = 0;
        let coutFauchClassique, coutFauchCollecte, coutFauchDamier, coutFauchTotal = 0;
        // Constantes
        const coutKmClassique = currentData.constantes_calcul[0].value;
        const coutKmCollecte = currentData.constantes_calcul[1].value;
        const coutKmDamier = currentData.constantes_calcul[2].value;

        // Déclaration des variables pour le calcul des données valo
        let quantiteHerbeCollecte = 0;
        let quantiteEnergieProduite = 0;
        let quantiteEngraisProduite = 0;
        let gainVenteHerbe = 0;
        let benefValo, benefMethanisation, benefCompostage = 0;
        let coutMethanisation, coutCompostage, coutValo = 0;
        // Constantes
        const herbeKm = currentData.constantes_calcul[3].value; // tonnes d'herbes collectées par km
        const energieTonneHerbe = currentData.constantes_calcul[4].value; // kWh produits à partir d'une tonne d'herbe
        const engraisTonneHerbe = currentData.constantes_calcul[5].value; // kg d'engrais produits à partir d'une tonne d'herbe
        const prixVenteHerbe = currentData.constantes_calcul[6].value; // € / tonne d'herbe
        //const coutTraitementMethanisationTonne = 45; // Coût de traitement d'une tonne d'herbe en méthanisation
        //const coutTraitementCompostageTonne = 35; // Coût de traitement d'une tonne d'herbe en compostage
        //const benefMethanisationTonne = 12; // Bénéfices réalisés lors de la production d'un MWh en méthanisation
        //const benefCompostageTonne = 8; // Bénéfices réalisés lors de la production d'une tonne d'engrais par compostage

        // Déclaration des variables pour le calcul des données GES
        let co2Classique, co2Collecte, co2Damier, co2Fauchage = 0;
        let consoClassique, consoCollecte, consoDamier, consoFauchage = 0;
        let parisNewyork = 0
        let co2EviteValo = 0;
        // Constantes
        const consoKmClassique = currentData.constantes_calcul[7].value; // en L/km
        const consoKmCollecte = currentData.constantes_calcul[8].value;
        const consoKmDamier = currentData.constantes_calcul[9].value;
        const facteurEmissionCarburant = currentData.constantes_calcul[10].value;
        const allerRetourParisNewYork = currentData.constantes_calcul[11].value
        const co2EviteMetha = currentData.constantes_calcul[12].value; // en tCO2 / MWh
        const co2EviteCompostage = currentData.constantes_calcul[13].value; // en tCO2 / tonne de compost

        // Déclaration des variables pour le calcul des indicateurs écosystémiques
        let qualiteSol, maintienBiodiv, fonctionHydro, microclimat, stockageCarbone, attenuationRisques, securite = 0;
        let coefHauteurFauche, coefFrequenceFauche, coefSurfaceFauchee, coefFauchageDiff, coefExport = 0;

        // Calcul des impacts sur les indicateurs
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
        quantiteHerbeCollecte = lineaireCollecte * herbeKm;
        quantiteEnergieProduite = quantiteHerbeCollecte * methanisation / 100 * energieTonneHerbe;
        quantiteEngraisProduite = quantiteHerbeCollecte * compostage / 100 * engraisTonneHerbe;
        gainVenteHerbe = quantiteHerbeCollecte * prixVenteHerbe;
        //benefMethanisation = benefMethanisationTonne * quantiteEnergieProduite;
        //benefCompostage = benefCompostageTonne * quantiteEngraisProduite;
        //benefValo = benefMethanisation + benefCompostage;
        //coutMethanisation = quantiteHerbeCollecte * methanisation / 100 * coutTraitementMethanisationTonne / 1000;
        //coutCompostage = quantiteHerbeCollecte * compostage / 100 * coutTraitementCompostageTonne / 1000;
        //coutValo = coutMethanisation + coutCompostage;

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
        //co2EviteValo = quantiteEnergieProduite * co2EviteMetha + quantiteEngraisProduite * co2EviteCompostage;

        // Indicateurs écosystémiques
        // Calcul des coefficients
        if (hauteurFauche < 7.9) {
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

        if (fauchageDiff === "differencie") {
            coefFauchageDiff = 1;
        } else if (fauchageDiff === "non_differencie") {
            coefFauchageDiff = -1;
        }

        // Calcul des indicateurs 
        qualiteSol = (2 * coefHauteurFauche + 2 * coefFrequenceFauche) / 4 * 5;
        if (qualiteSol < 1) {
            qualiteSol = 1;
        };

        maintienBiodiv = (4 * coefHauteurFauche + 6 * coefFrequenceFauche + coefSurfaceFauchee + coefFauchageDiff + 2 * coefExport) / 13 * 5;
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

        // Actualisation des valeurs à afficher
        newCurrentData.indicateurs_economiques[0].value = Math.round(coutFauchTotal);
        newCurrentData.indicateurs_economiques[1].value = Math.round(coutFauchTotal / lineaireEntretenu);
        newCurrentData.indicateurs_economiques[2].value = Math.round(coutFauchClassique);
        newCurrentData.indicateurs_economiques[3].value = Math.round(coutFauchCollecte);
        newCurrentData.indicateurs_economiques[4].value = Math.round(coutFauchDamier);
        newCurrentData.indicateurs_economiques[5].value = Math.round(coutValo);
        newCurrentData.indicateurs_economiques[6].value = Math.round(coutMethanisation);
        newCurrentData.indicateurs_economiques[7].value = Math.round(coutCompostage);
        //newCurrentData.indicateurs_economiques[8].value = Math.round(benefValo);
        
        newCurrentData.donnees_valo[0].value = Math.round(quantiteHerbeCollecte);
        newCurrentData.donnees_valo[1].value = Math.round(quantiteEnergieProduite);
        newCurrentData.donnees_valo[2].value = Math.round(quantiteEngraisProduite);

        newCurrentData.indicateurs_ges[0].value = Math.round(parisNewyork);
        newCurrentData.indicateurs_ges[1].value = Math.round(co2Fauchage);
        newCurrentData.indicateurs_ges[2].value = Math.round(co2Classique);
        newCurrentData.indicateurs_ges[3].value = Math.round(co2Collecte);
        newCurrentData.indicateurs_ges[4].value = Math.round(co2Damier);
        newCurrentData.indicateurs_ges[5].value = Math.round(co2EviteValo);

        newCurrentData.indicateurs_ecosysteme[0].value = Math.round(qualiteSol);
        newCurrentData.indicateurs_ecosysteme[1].value = Math.round(maintienBiodiv);
        newCurrentData.indicateurs_ecosysteme[2].value = Math.round(fonctionHydro);
        newCurrentData.indicateurs_ecosysteme[3].value = Math.round(microclimat);
        newCurrentData.indicateurs_ecosysteme[4].value = Math.round(stockageCarbone);
        newCurrentData.indicateurs_ecosysteme[5].value = Math.round(attenuationRisques);

        newCurrentData.notes_ecosysteme[1].value = Math.round(impactGlobal);

        newCurrentData.planEntretien[4].parametres[15] = Math.round(tailleReseau);

        // Update the current data with the modified copy
        setCurrentData(newCurrentData);
    }, 100);

// COMPARAISON
// Comparaison lancée par l'utilisateur
function handleButtonClick() {

    const newCurrentData = { ...currentData };

//Sauvegarde des indicateurs pré-comparaison
    // Indicateurs économiques
    newCurrentData.indicateurs_economiques.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    // Indicateurs écosystémiques
    newCurrentData.indicateurs_ecosysteme.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    // Indicateurs GES
    newCurrentData.indicateurs_ges.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    // Données valo
    newCurrentData.donnees_valo.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
    // Bilan global écosystémique
    newCurrentData.notes_ecosysteme.forEach(indicateur => {
        indicateur.value_saved = indicateur.value;
    });
 
    setCurrentData(newCurrentData);
    setVisible(true);
}

    // Comparaison arrêtée par l'utilisateur
    function handleButtonClickStop() {

        setVisible(false);
    };

  return (
    <div className='entretien'>
      <h1>Entretien</h1>

      <h3>Options d'entretien</h3>
      <StyledFormControl component="fieldset">
        <FormLabel component="legend">Fauchage différencié</FormLabel>
        <StyledRadioGroup
          aria-label="Options"
          name="fauchage_differencie"
          value={selectedOption1}
          onChange={handleOption1Change}
        >
          <FormControlLabel value="differencie" control={<Radio />} label="Oui" />
          <FormControlLabel value="non_differencie" control={<Radio />} label="Non" />
        </StyledRadioGroup>

        <FormLabel component="legend">Lutte contre les plantes invasives</FormLabel>
        <StyledRadioGroup
          aria-label="Options"
          name="lutte_plantes_invasives"
          value={selectedOption2}
          onChange={handleOption2Change}
        >
          <FormControlLabel value="lutte" control={<Radio />} label="Oui" />
          <FormControlLabel value="non_lutte" control={<Radio />} label="Non" />
          </StyledRadioGroup>

          <FormLabel component="legend">Hauteur de fauche (cm)</FormLabel>
          <SliderTextFieldForm_HauteurFauche id="slider6" onChange={modifHauteurFauche} currentData={currentData}/>

      </StyledFormControl>

      <h3 component="legend">Type de fauchage</h3>
          <div className="row">
              <div className="col6">
                  <FormLabel component="legend">Fauchage classique (en %)</FormLabel>
              </div>
              <div className="col6">
                Hello
              </div>
          </div>
          <SliderTextFieldForm id="slider1" onChange={(event, newValue) => handleSliderChange("slider1", newValue)} currentData={currentData} />

     <FormLabel component="legend">Fauchage avec collecte (en %)</FormLabel>
          <SliderTextFieldForm id="slider2"  onChange={(event, newValue) => handleSliderChange("slider2", newValue)} currentData={currentData} />
      <FormLabel component="legend">Fauchage en damier (en %)</FormLabel>
          <SliderTextFieldForm id="slider3"  onChange={(event, newValue) => handleSliderChange("slider3", newValue)} currentData={currentData} />

      <h3>Valorisation de l'herbe</h3>

      <FormLabel component="legend">Méthanisation (en %)</FormLabel>
          <SliderTextFieldForm id="slider4" onChange={handleSliderChange} currentData={currentData} />

      <FormLabel component="legend">Compostage (en %)</FormLabel>
          <SliderTextFieldForm id="slider5" onChange={handleSliderChange} currentData={currentData} />
          <Button
              variant="contained"
              color="primary"
              onClick={() => handleButtonClick()}
          >
              Effectuer une comparaison
          </Button>
          <Button
              variant="contained"
              color="primary"
              onClick={() => handleButtonClickStop()}
          >
              Arrêter la comparaison
          </Button>
         
          </div>

  );
};

export default Entretien;
