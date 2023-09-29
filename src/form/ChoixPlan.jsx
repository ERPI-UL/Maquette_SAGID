import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";


// Design
const StyledContainer = styled(Container)({
  marginTop: "1rem",
  width: "100%", // Set container width to 90% of the page
  display: "flex",
    justifyContent: "center",
});

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "25%",
  marginBottom: "2rem", // Add some bottom margin between cards
});

const StyledCardContent = styled(CardContent)({
  textAlign: "center",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
});

// Gestion de la page
const ChoixPlan = ({ currentData, setCurrentData}) => {

    const location = useLocation();
    const [tailleReseau, setTailleReseau] = useState(null);

    useEffect(() => {
        // On récupère la valeur de "tailleReseau" depuis les paramètres d'URL
        const searchParams = new URLSearchParams(location.search);
        const tailleReseauParam = searchParams.get('tailleReseau');

        // On met à jour l'état avec la valeur de "tailleReseau" depuis les paramètres d'URL
        if (tailleReseauParam) {
            setTailleReseau(tailleReseauParam);
            const tailleReseauNumerique = parseInt(tailleReseauParam, 10); // Convertir en nombre
            if (!isNaN(tailleReseauNumerique)) {
                setTailleReseau(tailleReseauNumerique); // Mettre à jour l'état avec le nombre
            } else {
                console.log("La conversion en nombre a échoué. Vérifiez la valeur de tailleReseauParam.");
            }
        }
    }, [location]);

    // Affichage des plans d'entretien
    const plans = [
    {
      nom: "Plan d'entretien n°1",
      image: "/images/plan1.jpg",
    },
    {
        nom: "Plan d'entretien n°2",
        image: "/images/plan1.jpg",
    },
    {
        nom: "Plan d'entretien n°3",
        image: "/images/plan1.jpg",
     },
     {
         nom: "Plan d'entretien n°4",
         image: "/images/plan1.jpg",
     },
  ];

  // Navigation
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate("/"); // Replace '/other-page' with the desired URL or path
  };

    // Sélection d'un plan d'entretien par l'utilisateur
    function handleButtonClick(plan) {
       
        const newCurrentData = { ...currentData };
        // Déclaration des variables
        let fauchageClassique, fauchageCollecte, fauchageDamier = 0;
        let frequenceFauche = 0;
        let hauteurFauche = 0;
        let methanisation, compostage = 0;
        let fauchageDiff = 'non';
        // let luttePlantesInv = "non";
        let largeursPasse1, largeursPasse2, largeursPasse3 = 0;
        // let periodePasse1, periodePasse2, periodePasse3 = 0;

        // Extraction des valeurs des variables pour le plan d'entretien choisi
        currentData.planEntretien.forEach((plan1) => {
            if (plan1.plan_name === plan.nom) { // on cherche le bon plan d'entretien
            // Fauchage classique
                // On récupère le paramètre "Fauchage classique" dans ce plan d'entretetien
                const fauchageClassiqueParam = plan1.parametres.find((parametre) => parametre.nom === "Fauchage classique");
                // On extrait la valeur du paramètre
                if (fauchageClassiqueParam) {
                    fauchageClassique = fauchageClassiqueParam.value;
                    currentData.planEntretien[4].parametres[0] = fauchageClassiqueParam.value; // Sauvegarde de la valeur dans le plan d'entretien sauvegardé
                }
            // Fauchage avec collecte
                // On récupère le paramètre "Fauchage avec collecte" dans ce plan d'entretetien
                const fauchageCollecteParam = plan1.parametres.find((parametre) => parametre.nom === "Fauchage avec collecte");
                // On extrait la valeur du paramètre
                if (fauchageCollecteParam) {
                    fauchageCollecte = fauchageCollecteParam.value;
                    currentData.planEntretien[4].parametres[1] = fauchageCollecteParam.value;
                }
            // Fauchage en damier
                // On récupère le paramètre "Fauchage en damier" dans ce plan d'entretetien
                const fauchageDamierParam = plan1.parametres.find((parametre) => parametre.nom === "Fauchage en damier");
                // On extrait la valeur du paramètre
                if (fauchageDamierParam) {
                    fauchageDamier = fauchageDamierParam.value;
                    currentData.planEntretien[4].parametres[2] = fauchageDamierParam.value;
                }
            // Fréquence de fauchage
                // On récupère le paramètre "Fréquence de fauchage" dans ce plan d'entretetien
                const frequenceFaucheParam = plan1.parametres.find((parametre) => parametre.nom === "Fréquence de fauchage");
                // On extrait la valeur du paramètre
                if (frequenceFaucheParam) {
                    frequenceFauche = frequenceFaucheParam.value;
                    currentData.planEntretien[4].parametres[3] = frequenceFaucheParam.value;
                }
            // Hauteur de fauche
                // On récupère le paramètre "Hauteur de fauche" dans ce plan d'entretetien
                const hauteurFaucheParam = plan1.parametres.find((parametre) => parametre.nom === "Hauteur de fauche");
                // On extrait la valeur du paramètre
                if (hauteurFaucheParam) {
                    hauteurFauche = hauteurFaucheParam.value;
                    currentData.planEntretien[4].parametres[4] = hauteurFaucheParam.value;
                }
            // Méthanisation
                // On récupère le paramètre "Méthanisation" dans ce plan d'entretetien
                const methanisationParam = plan1.parametres.find((parametre) => parametre.nom === "Méthanisation");
                // On extrait la valeur du paramètre
                if (methanisationParam) {
                    methanisation = methanisationParam.value;
                    currentData.planEntretien[4].parametres[5] = methanisationParam.value;
                }
            // Compostage
                // On récupère le paramètre "Compostage" dans ce plan d'entretetien
                const compostageParam = plan1.parametres.find((parametre) => parametre.nom === "Compostage");
                // On extrait la valeur du paramètre
                if (compostageParam) {
                    compostage = compostageParam.value;
                    currentData.planEntretien[4].parametres[6] = compostageParam.value;
                }
            // Fauchage différencié
                // On récupère le paramètre "Fauchage différencié" dans ce plan d'entretetien
                const fauchageDiffParam = plan1.parametres.find((parametre) => parametre.nom === "Fauchage différencié");
                // On extrait la valeur du paramètre
                if (fauchageDiffParam) {
                    fauchageDiff = fauchageDiffParam.value;
                    currentData.planEntretien[4].parametres[7] = fauchageDiffParam.value;
                }
            // Lutte contre les plantes invasives
                // On récupère le paramètre "Lutte contre les plantes invasives" dans ce plan d'entretetien
                const luttePlantesInvParam = plan1.parametres.find((parametre) => parametre.nom === "Lutte contre les plantes invasives");
                // On extrait la valeur du paramètre
                if (luttePlantesInvParam) {
                    // luttePlantesInv = luttePlantesInvParam.value;
                    currentData.planEntretien[4].parametres[8] = luttePlantesInvParam.value;
                }
            // Nombre de largeurs d'outils 1ère passe
                // On récupère le paramètre "Largeurs d'outils 1ère passe" dans ce plan d'entretetien
                const largeursPasse1Param = plan1.parametres.find((parametre) => parametre.nom === "Largeurs d'outils 1ère passe");
                // On extrait la valeur du paramètre
                if (largeursPasse1Param) {
                    largeursPasse1 = largeursPasse1Param.value;
                    currentData.planEntretien[4].parametres[9] = largeursPasse1Param.value;
                }
            // Nombre de largeurs d'outils 2ème passe
                // On récupère le paramètre "Largeurs d'outils 2ème passe" dans ce plan d'entretetien
                const largeursPasse2Param = plan1.parametres.find((parametre) => parametre.nom === "Largeurs d'outils 2ème passe");
                // On extrait la valeur du paramètre
                if (largeursPasse2Param) {
                    largeursPasse2 = largeursPasse2Param.value;
                    currentData.planEntretien[4].parametres[10] = largeursPasse2Param.value;
                }
                // Nombre de largeurs d'outils 3ème passe
                // On récupère le paramètre "Largeurs d'outils 3ème passe" dans ce plan d'entretetien
                const largeursPasse3Param = plan1.parametres.find((parametre) => parametre.nom === "Largeurs d'outils 3ème passe");
                // On extrait la valeur du paramètre
                if (largeursPasse3Param) {
                    largeursPasse3 = largeursPasse3Param.value;
                    currentData.planEntretien[4].parametres[11] = largeursPasse3Param.value;
                }
                // Période de la 1ère passe
                // On récupère le paramètre "Période 1ère fauche" dans ce plan d'entretetien
                const periodePasse1Param = plan1.parametres.find((parametre) => parametre.nom === "Période 1ère fauche");
                // On extrait la valeur du paramètre
                if (periodePasse1Param) {
                    // periodePasse1 = periodePasse1Param.value;
                    currentData.planEntretien[4].parametres[12] = periodePasse1Param.value;
                }
                // Période de la 2ème passe
                // On récupère le paramètre "Période 2ème fauche" dans ce plan d'entretetien
                const periodePasse2Param = plan1.parametres.find((parametre) => parametre.nom === "Période 2ème fauche");
                // On extrait la valeur du paramètre
                if (periodePasse2Param) {
                    // periodePasse2 = periodePasse2Param.value;
                    currentData.planEntretien[4].parametres[13] = periodePasse2Param.value;
                }
                // Période de la 3ème passe
                // On récupère le paramètre "Période 3ème fauche" dans ce plan d'entretetien
                const periodePasse3Param = plan1.parametres.find((parametre) => parametre.nom === "Période 3ème fauche");
                // On extrait la valeur du paramètre
                if (periodePasse3Param) {
                    // periodePasse3 = periodePasse3Param.value;
                    currentData.planEntretien[4].parametres[14] = periodePasse3Param.value;
                }
            }
        });
        
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
        //let benefValo, benefMethanisation, benefCompostage = 0;
        //let coutMethanisation, coutCompostage, coutValo = 0;
        // let gainVenteHerbe = 0;
        // Constantes
        const herbeKm = currentData.constantes_calcul[3].value; // tonnes d'herbes collectées par km
        const energieTonneHerbe = currentData.constantes_calcul[4].value; // kWh produits à partir d'une tonne d'herbe
        const engraisTonneHerbe = currentData.constantes_calcul[5].value; // kg d'engrais produits à partir d'une tonne d'herbe
        // const prixVenteHerbe = currentData.constantes_calcul[6].value; // € / tonne d'herbe
        // const coutTraitementMethanisationTonne = 45; // Coût de traitement d'une tonne d'herbe en méthanisation
        // const coutTraitementCompostageTonne = 35; // Coût de traitement d'une tonne d'herbe en compostage
        // const benefMethanisationTonne = 12; // Bénéfices réalisés lors de la production d'un MWh en méthanisation
        // const benefCompostageTonne = 8; // Bénéfices réalisés lors de la production d'une tonne d'engrais par compostage

        // Déclaration des variables pour le calcul des données GES
        let co2Classique, co2Collecte, co2Damier, co2Fauchage = 0;
        let consoClassique, consoCollecte, consoDamier, consoFauchage = 0;
        let parisNewyork = 0
        // let co2EviteValo = 0;
        // Constantes
        const consoKmClassique = currentData.constantes_calcul[7].value; // en L/km
        const consoKmCollecte = currentData.constantes_calcul[8].value; 
        const consoKmDamier = currentData.constantes_calcul[9].value;
        const facteurEmissionCarburant = currentData.constantes_calcul[10].value;
        const allerRetourParisNewYork = currentData.constantes_calcul[11].value;
        // const co2EviteMetha = currentData.constantes_calcul[12].value; // en tCO2 / MWh
        // const co2EviteCompostage = currentData.constantes_calcul[13].value; // en tCO2 / tonne de compost

        // Déclaration des variables pour le calcul des indicateurs écosystémiques
        let qualiteSol, maintienBiodiv, fonctionHydro, microclimat, stockageCarbone, attenuationRisques = 0;
        // let securite = 0;
        let coefHauteurFauche, coefFrequenceFauche, coefSurfaceFauchee, coefFauchageDiff, coefExport = 0;

        // Calcul des impacts sur les indicateurs
            // Économiques
        lineaireEntretenu = (tailleReseau * 2) * (largeursPasse1 + largeursPasse2 + largeursPasse3); // les deux côtés de la route sont à entretenir
        lineaireClassique = lineaireEntretenu * fauchageClassique / 100;
        lineaireCollecte = lineaireEntretenu * fauchageCollecte / 100;
        lineaireDamier = lineaireEntretenu * fauchageDamier / 100;
        coutFauchClassique = lineaireClassique * coutKmClassique / 1000; // on met les coûts en k€
        coutFauchCollecte = lineaireCollecte * coutKmCollecte / 1000; 
        coutFauchDamier = lineaireDamier * coutKmDamier /1000; 
        coutFauchTotal = coutFauchClassique + coutFauchCollecte + coutFauchDamier; 
        console.log(largeursPasse1);
           // Données valo
        quantiteHerbeCollecte = lineaireCollecte * herbeKm;
        quantiteEnergieProduite = quantiteHerbeCollecte * methanisation / 100 * energieTonneHerbe;
        quantiteEngraisProduite = quantiteHerbeCollecte * compostage / 100 * engraisTonneHerbe;
        // gainVenteHerbe = quantiteHerbeCollecte * prixVenteHerbe;
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

        if (fauchageDamier > 10) {
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
        

        // Actualisation des indicateurs
        setCurrentData(newCurrentData);
        // Navigation vers le tableau de bord
        redirectToDashboard();

    }

  return (
    <StyledContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center">
            {" "}
            Choisir mon plan d'entretien{" "}
          </Typography>

          {plans.map((plan, index) => (
            <StyledCard key={index}>
                <StyledCardContent>
                      <div className="card-content-container">
                          <div className="card-text">
                              <Typography variant="h5" component="h3">
                                  {plan.nom}
                              </Typography>
                              <Typography variant="h6" component="h2">
                                  {plan.typeFauchage}
                              </Typography>
                              <Typography variant="h6" color="textSecondary" component="h2">
                                  {plan.hauteurFauche}
                              </Typography>
                          </div>
                          <img src={plan.image} alt={plan.nom} className="card-image" />
                      </div>
                      <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleButtonClick(plan)}
                >
                  Sélectionner
                </StyledButton>
              </StyledCardContent>
            </StyledCard>
          ))}
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ChoixPlan;
