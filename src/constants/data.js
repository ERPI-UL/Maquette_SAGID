const data = {
            
    indicateurs_economiques: [
        {
            title: "Coût total de l'entretien",
            value: 0,
            value_saved: 0,
            unit: "€",
        },
        {
            title:"Coût au kilomètre",
            value: 0,
            value_saved : 0,
            unit: "€/km",
        },
        {
            title:"Coûts de fauchage classique",
            value: 0,
            value_saved : 0,
            unit: "€",
        },
        {
            title:"Coûts de fauchage avec collecte",
            value: 0,
            value_saved : 0,
            unit: "€",
        },
        {
            title:"Coûts de fauchage en damier",
            value: 0,
            value_saved : 0,
            unit: "€",
        },
        {
            title: "Coûts de traitement des déchets",
            value: 0,
            value_saved: 0,
            unit: "€",
        },
        {
            title: "Coûts de méthanisation",
            value: 0,
            value_saved: 0,
            unit: "€",
        },
        {
            title: "Coûts de compostage",
            value: 0,
            value_saved: 0,
            unit: "€",
        },
        {
            title: "Bénéfices liés à la valorisation des déchets",
            value: 0,
            value_saved: 0,
            unit: "€",
        },
    ],

    donnees_valo: [
        {
            title: "Quantité de biomasse collectée",
            value: 0,
            value_saved: 0,
            unit: "tonnes",
        },
        {
            title: "Quantité d'énergie produite",
            value: 0,
            value_saved: 0,
            unit: "MWh",
        },
        {
            title: "Quantité d'engrais produite",
            value: 0,
            value_saved: 0,
            unit: "MWh",
        },
    ],

    indicateurs_ecosysteme: [
        {
            title:'Qualité du sol', //'Fonction de maintien de la matière organique et de la qualité du sol',
            value: 0,
            value_saved : 0,
            text:"La fonction de maintien de la matière organique intègre à la fois la stabilisation des sols, le contrôle de l’érosion et la capacité de structuration des sols. Il s’agit d’évaluer la capacité du bord de route à stabiliser et structurer les sols et à contrôler l’érosion. Le contrôle de l’érosion s’intéresse au flux de matières arrachées et transportées, ce qui consiste à évaluer ce qui empêche la perte de sol fertile. La structuration du sol conditionne les capacités de stockage, de filtration et de rétention du sol et détermine la pénétrabilité des racines et la constitution de la biomasse végétale.  ",
            advices: {
                positifs : ["Peut-être amélioré en utilisant des techniques d’entretien plus respectueuse"],
                negatifs : ["Est négligée lorsque l’entretien est trop fréquent ou trop intensif"]
            },
            analyse: {
                good: "Le sol est stable et structuré, il n’y a pas d’érosion.",
                medium: "Le sol est stable et structuré, il y a une érosion modérée.",
                bad: "Le sol est instable et non structuré, il y a une érosion importante."
            }
        },
        {
            title:'Maintien de la biodiversité', //'Fonction de maintien de la biodiversité',
            value: 0,
            value_saved : 0,
            text:"La fonction de maintien de la biodiversité est complexe, car les bords de route jouent à la fois un rôle de corridor écologique et de réservoir de la biodiversité. Il s’agit d’évaluer la capacité des bords de route à fournir un espace propice à la présence, au maintien et au développement de la faune et de la flore locale. Le maintien des populations animales et végétales dépend des interactions entre les différents espaces permettant le brassage génétique, l’accès aux ressources, à des milieux de reproduction et de vie. Les interactions spatiales se font ente les réservoirs de biodiversité (lieux de vie et reproduction des espèces) grâce aux corridors écologiques (lieux de déplacement, de dispersion et d’accueil des espèces). Ces corridors sont les haies, talus, bandes enherbées, cours d’eau (Le Guillou 2020). ",
            advices: {
                positifs : ["Peut-être amélioré en utilisant des techniques d’entretien plus respectueuse"],
                negatifs : ["Est négligée lorsque l’entretien est trop fréquent ou trop intensif"]
            },
            analyse: {
                good: "La biodiversité est présente et diversifiée, les corridors écologiques sont fonctionnels.",
                medium: "La biodiversité est présente mais peu diversifiée, les corridors écologiques sont peu fonctionnels.",
                bad: "La biodiversité est absente ou peu présente, les corridors écologiques sont inexistants."
            }
        },
        {
            title:'Fonction hydrologique', //'Fonction hydrologique',
            value: 0,
            value_saved : 0,
            text:"La fonction hydrologique intègre des processus d’épuration de l’eau et de diminution du ruissellement. Il s’agit d’évaluer la capacité des bords de route à stocker et évacuer l’eau et à retarder le ruissellement vers les autres écosystèmes et leur capacité à restaurer/remédier l’eau. La capacité des bords de route à stocker et évacuer l’eau fait référence à la réserve utile des sols, il s’agit d’évaluer leur capacité à contenir et restituer l’eau aux racines (rétention de l’eau) pour la vie végétale. La capacité des bords de route porte sur la purification de l’eau, notamment par le biais du recyclage des nutriments et à la filtration des particules d’impuretés. ",
            advices: {
                positifs : ["Peut-être amélioré en utilisant des techniques d’entretien plus respectueuse"],
                negatifs : ["Est négligée lorsque l’entretien est trop fréquent ou trop intensif"]
            },
            analyse: {
                good: "Les bords de route stockent et évacuent l’eau, ils ont une capacité de rétention et de filtration de l’eau.",
                medium: "Les bords de route stockent et évacuent l’eau, ils ont une capacité de rétention mais pas de filtration de l’eau.",
                bad: "Les bords de route ne stockent pas l’eau, ils n’ont pas de capacité de rétention et de filtration de l’eau."
            }

        },
        {
            title:'Microclimat ', //'Fonction brise-vent et diminution des températures',
            value: 0,
            value_saved : 0,
            text:"Les végétaux, les sols et l’eau présents au sein de l’écosystème urbain peuvent jouer un rôle significatif dans l’abaissement des températures locales et la végétation ligneuse des bords de route joue un rôle de brise-vent. Cette fonction est très dépendante du recouvrement arboré (formation ligneuse) du bord de route, i.e. la proportion d’arbres et d’arbustes sur la portion concernée (Le Guillou 2020).  ",
            advices: {
                positifs : ["Peut-être amélioré en utilisant des techniques d’entretien plus respectueuse"],
                negatifs : ["Est négligée lorsque l’entretien est trop fréquent ou trop intensif"]
            },  
            analyse: {
                good: "Les bords de route ont un recouvrement arboré important, ils ont un rôle de brise-vent et d’abaissement des températures.",
                medium: "Les bords de route ont un recouvrement arboré moyen, ils ont un rôle de brise-vent mais pas d’abaissement des températures.",
                bad: "Les bords de route ont un recouvrement arboré faible, ils n’ont pas de rôle de brise-vent et d’abaissement des températures."
            }
        },
        {
            title:'Stockage du carbone', //'Fonction de stockage du carbone',
            value: 0,
            value_saved : 0,
            text:"La fonction de stockage du carbone représente la capacité du bord de route à accumuler du carbone dans le sol et dans la végétation luttant ainsi contre le réchauffement climatique. Cette fonction est principalement dépendante du type de sol ainsi que du type de végétation présente sur le bord de route. ",
            advices: {
                positifs : ["Peut-être amélioré en utilisant des techniques d’entretien plus respectueuse"],
                negatifs : ["Est négligée lorsque l’entretien est trop fréquent ou trop intensif"]
            },
            analyse: {
                good: "Les bords de route ont une capacité de stockage du carbone importante.",
                medium: "Les bords de route ont une capacité de stockage du carbone moyenne.",
                bad: "Les bords de route ont une capacité de stockage du carbone faible."
            }
        },
        {
            title:"Atténuation des risques naturels", //"Fonction de régulation de la qualité de l'air",
            value: 0,
            value_saved : 0,
            text:"L’atténuation des risques naturels concernent en majeur partie les risques d’inondations et d’incendie. L’aménagement du bord de route mais aussi son entretien vont avoir un impact sur sa capacité à limiter ces risques. ",
            advices: {
                positifs : ["Peut-être amélioré en utilisant des techniques d’entretien plus respectueuse"],
                negatifs : ["Est négligée lorsque l’entretien est trop fréquent ou trop intensif"]
            },
            analyse: {
                good: "Les bords de route ont une capacité à atténuer les risques naturels.",
                medium: "Les bords de route ont une capacité moyenne à atténuer les risques naturels.",
                bad: "Les bords de route n’ont pas de capacité à atténuer les risques naturels."
            }
        },
        {
            title:'Sécurité ', //'Fonction de régulation des nuisances et des risques naturels',
            value: 0,
            value_saved : 0,
            text:"L’entretien des bords de route a un impact sur la sécurité des usagers de la route. Il peut aussi bien s’agir d’automobilistes, de cyclistes que de piétons. La sécurité est assurée en limitant la hauteur de la végétation afin d’assurer la visibilité des usagers en particulier dans les zones à risque comme les virages et les intersections. L’entretien des bords de route permet également de permettre à tout usager d’emprunter le bas-côté en cas de nécessité. ",
            advices: {
                positifs : ["Peut-être amélioré en utilisant des techniques d’entretien plus respectueuse"],
                negatifs : ["Est négligée lorsque l’entretien est trop fréquent ou trop intensif"]
            },
            analyse: {
                good: "Les bords de route sont entretenus de manière à assurer la sécurité des usagers.",
                medium: "Les bords de route sont entretenus de manière à assurer la sécurité des usagers mais peuvent être améliorés.",
                bad: "Les bords de route ne sont pas entretenus de manière à assurer la sécurité des usagers."
            }
        }
    ],

    indicateurs_ges: [
        {
            title:"émises lors de l'entretien des bords de route",
            new_york: 0,
            subtitle: "soit l'équivalent de" ,
            subtitle_2: "allers retours Paris - New York",
            unit: "tonnes CO2e",
        },
        {
            title:"CO2 émis lors de l'entretien",
            value: 0,
            value_saved : 0,
            unit: "tonnes CO2e",
        },
        {
            title:"CO2 émis par le fauchage classique",
            value: 0,
            value_saved : 0,
            unit: "tonnes CO2e",
        },
        {
            title: "CO2 émis par le fauchage avec collecte",
            value: 0,
            value_saved: 0,
            unit: "tonnes CO2e",
        },
        {
            title: "CO2 émis par le fauchage en damier",
            value: 0,
            value_saved: 0,
            unit: "tonnes CO2e",
        },
        {
            title:"CO2 évité grâce à la valorisation de la biomasse",
            value: 0,
            value_saved : 0,
            unit: "tonnes CO2e",
        },
    ],

    notes_ecosysteme: [
        {
            title: 'Capacité du réseau à fournir des services écosystémiques', 
            value : 0,
            value_saved : 0
        },
        {
            title: "Impact de l'entretien sur cette capacité", 
            value : 0,
            value_saved : 0
        },
    ],

    planEntretien: [
        {
            plan_name: "Plan d'entretien classique",
            paramètres: [
                {
                    nom: "Fauchage classique",
                    unité: "%",
                    value: 100
                },
                {
                    nom: "Fauchage avec collecte",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Fauchage en damier",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Fréquence de fauchage",
                    unité: "nombre",
                    value: 3
                },
                {
                    nom: "Hauteur de fauche",
                    unité: "cm",
                    value: 10
                },
                {
                    nom: "Méthanisation",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Compostage",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Fauchage différencié",
                    unité: "oui/non",
                    value: "Non"
                },
                {
                    nom: "Lutte contre les plantes invasives",
                    unité: "oui/non",
                    value: "Oui"
                },
            ]
        },
        {
            plan_name: "Plan d'entretien avec collecte",
            paramètres: [
                {
                    nom: "Fauchage classique",
                    unité: "%",
                    value: 50
                },
                {
                    nom: "Fauchage avec collecte",
                    unité: "%",
                    value: 50
                },
                {
                    nom: "Fauchage en damier",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Fréquence de fauchage",
                    unité: "nombre",
                    value: 3
                },
                {
                    nom: "Hauteur de fauche",
                    unité: "cm",
                    value: 10
                },
                {
                    nom: "Méthanisation",
                    unité: "%",
                    value: 50
                },
                {
                    nom: "Compostage",
                    unité: "%",
                    value: 50
                },
                {
                    nom: "Fauchage différencié",
                    unité: "oui/non",
                    value: "Non"
                },
                {
                    nom: "Lutte contre les plantes invasives",
                    unité: "oui/non",
                    value: "Oui"
                },
            ]
        },
        {
            plan_name: "Plan d'entretien intensif",
            paramètres: [
                {
                    nom: "Fauchage classique",
                    unité: "%",
                    value: 100
                },
                {
                    nom: "Fauchage avec collecte",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Fauchage en damier",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Fréquence de fauchage",
                    unité: "nombre",
                    value: 3
                },
                {
                    nom: "Hauteur de fauche",
                    unité: "cm",
                    value: 6
                },
                {
                    nom: "Méthanisation",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Compostage",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Fauchage différencié",
                    unité: "oui/non",
                    value: "Non"
                },
                {
                    nom: "Lutte contre les plantes invasives",
                    unité: "oui/non",
                    value: "Non"
                },
            ]
        },
        {
            plan_name: "Plan d'entretien raisonné",
            paramètres: [
                {
                    nom: "Fauchage classique",
                    unité: "%",
                    value: 0
                },
                {
                    nom: "Fauchage avec collecte",
                    unité: "%",
                    value: 50
                },
                {
                    nom: "Fauchage en damier",
                    unité: "%",
                    value: 50
                },
                {
                    nom: "Fréquence de fauchage",
                    unité: "nombre",
                    value: 2
                },
                {
                    nom: "Hauteur de fauche",
                    unité: "cm",
                    value: 15
                },
                {
                    nom: "Méthanisation",
                    unité: "%",
                    value: 50
                },
                {
                    nom: "Compostage",
                    unité: "%",
                    value: 50
                },
                {
                    nom: "Fauchage différencié",
                    unité: "oui/non",
                    value: "Oui"
                },
                {
                    nom: "Lutte contre les plantes invasives",
                    unité: "oui/non",
                    value: "Oui"
                },
            ]
        },
    ],

    regions : [
        {
            region_name: "Auvergne-Rhône-Alpes",
            departments: [
                { num_dep: "01", dep_name: "Ain", taille_reseau: 3271 },
                { num_dep: "03", dep_name: "Allier", taille_reseau: 3271 },
                { num_dep: "07", dep_name: "Ardèche", taille_reseau: 3271 },
                { num_dep: "15", dep_name: "Cantal", taille_reseau: 3271 },
                { num_dep: "26", dep_name: "Drôme", taille_reseau: 3271 },
                { num_dep: "38", dep_name: "Isère", taille_reseau: 3271 },
                { num_dep: "42", dep_name: "Loire", taille_reseau: 3271 },
                { num_dep: "43", dep_name: "Haute-Loire", taille_reseau: 3271 },
                { num_dep: "63", dep_name: "Puy-de-Dôme", taille_reseau: 3271 },
                { num_dep: "69", dep_name: "Rhône", taille_reseau: 3271 },
                { num_dep: "73", dep_name: "Savoie", taille_reseau: 3271 },
                { num_dep: "74", dep_name: "Haute-Savoie", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Bourgogne-Franche-Comté",
            departments: [
                { num_dep: "21", dep_name: "Côte-d'Or", taille_reseau: 3271 },
                { num_dep: "25", dep_name: "Doubs", taille_reseau: 3271 },
                { num_dep: "39", dep_name: "Jura", taille_reseau: 3271 },
                { num_dep: "58", dep_name: "Nièvre", taille_reseau: 3271 },
                { num_dep: "70", dep_name: "Haute-Saône", taille_reseau: 3271 },
                { num_dep: "71", dep_name: "Saône-et-Loire", taille_reseau: 3271 },
                { num_dep: "89", dep_name: "Yonne", taille_reseau: 3271 },
                { num_dep: "90", dep_name: "Territoire de Belfort", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Bretagne",
            departments: [
                { num_dep: "22", dep_name: "Côtes-d'Armor", taille_reseau: 3271 },
                { num_dep: "29", dep_name: "Finistère", taille_reseau: 3271 },
                { num_dep: "35", dep_name: "Ille-et-Vilaine", taille_reseau: 3271 },
                { num_dep: "56", dep_name: "Morbihan", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Centre-Val de Loire",
            departments: [
                { num_dep: "18", dep_name: "Cher", taille_reseau: 3271 },
                { num_dep: "28", dep_name: "Eure-et-Loir", taille_reseau: 3271 },
                { num_dep: "36", dep_name: "Indre", taille_reseau: 3271 },
                { num_dep: "37", dep_name: "Indre-et-Loire", taille_reseau: 3271 },
                { num_dep: "41", dep_name: "Loir-et-Cher", taille_reseau: 3271 },
                { num_dep: "45", dep_name: "Loiret", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Corse",
            departments: [
                { num_dep: "2A", dep_name: "Corse-du-Sud", taille_reseau: 3271 },
                { num_dep: "2B", dep_name: "Haute-Corse", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Grand Est",
            departments: [
                { num_dep: "08", dep_name: "Ardennes", taille_reseau: 3271 },
                { num_dep: "10", dep_name: "Aube", taille_reseau: 3271 },
                { num_dep: "51", dep_name: "Marne", taille_reseau: 3271 },
                { num_dep: "52", dep_name: "Haute-Marne", taille_reseau: 3271 },
                { num_dep: "54", dep_name: "Meurthe-et-Moselle", taille_reseau: 3271 },
                { num_dep: "55", dep_name: "Meuse", taille_reseau: 3271 },
                { num_dep: "57", dep_name: "Moselle", taille_reseau: 3271 },
                { num_dep: "67", dep_name: "Bas-Rhin", taille_reseau: 3271 },
                { num_dep: "68", dep_name: "Haut-Rhin", taille_reseau: 3271 },
                { num_dep: "88", dep_name: "Vosges", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Hauts-de-France",
            departments: [
                { num_dep: "02", dep_name: "Aisne", taille_reseau: 3271 },
                { num_dep: "59", dep_name: "Nord", taille_reseau: 3271 },
                { num_dep: "60", dep_name: "Oise", taille_reseau: 3271 },
                { num_dep: "62", dep_name: "Pas-de-Calais", taille_reseau: 3271 },
                { num_dep: "80", dep_name: "Somme", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Île-de-France",
            departments: [
                { num_dep: "75", dep_name: "Paris", taille_reseau: 3271 },
                { num_dep: "77", dep_name: "Seine-et-Marne", taille_reseau: 3271 },
                { num_dep: "78", dep_name: "Yvelines", taille_reseau: 3271 },
                { num_dep: "91", dep_name: "Essonne", taille_reseau: 3271 },
                { num_dep: "92", dep_name: "Hauts-de-Seine", taille_reseau: 3271 },
                { num_dep: "93", dep_name: "Seine-Saint-Denis", taille_reseau: 3271 },
                { num_dep: "94", dep_name: "Val-de-Marne", taille_reseau: 3271 },
                { num_dep: "95", dep_name: "Val-d'Oise", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Normandie",
            departments: [
                { num_dep: "14", dep_name: "Calvados", taille_reseau: 3271 },
                { num_dep: "27", dep_name: "Eure", taille_reseau: 3271 },
                { num_dep: "50", dep_name: "Manche", taille_reseau: 3271 },
                { num_dep: "61", dep_name: "Orne", taille_reseau: 3271 },
                { num_dep: "76", dep_name: "Seine-Maritime", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Nouvelle-Aquitaine",
            departments: [
                { num_dep: "16", dep_name: "Charente", taille_reseau: 3271 },
                { num_dep: "17", dep_name: "Charente-Maritime", taille_reseau: 3271 },
                { num_dep: "19", dep_name: "Corrèze", taille_reseau: 3271 },
                { num_dep: "23", dep_name: "Creuse", taille_reseau: 3271 },
                { num_dep: "24", dep_name: "Dordogne", taille_reseau: 3271 },
                { num_dep: "33", dep_name: "Gironde", taille_reseau: 3271 },
                { num_dep: "40", dep_name: "Landes", taille_reseau: 3271 },
                { num_dep: "47", dep_name: "Lot-et-Garonne", taille_reseau: 3271 },
                { num_dep: "64", dep_name: "Pyrénées-Atlantiques", taille_reseau: 3271 },
                { num_dep: "79", dep_name: "Deux-Sèvres", taille_reseau: 3271 },
                { num_dep: "86", dep_name: "Vienne", taille_reseau: 3271 },
                { num_dep: "87", dep_name: "Haute-Vienne", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Occitanie",
            departments: [
                { num_dep: "09", dep_name: "Ariège", taille_reseau: 3271 },
                { num_dep: "11", dep_name: "Aude", taille_reseau: 3271 },
                { num_dep: "12", dep_name: "Aveyron", taille_reseau: 3271 },
                { num_dep: "30", dep_name: "Gard", taille_reseau: 3271 },
                { num_dep: "31", dep_name: "Haute-Garonne", taille_reseau: 3271 },
                { num_dep: "32", dep_name: "Gers", taille_reseau: 3271 },
                { num_dep: "34", dep_name: "Hérault", taille_reseau: 3271 },
                { num_dep: "46", dep_name: "Lot", taille_reseau: 3271 },
                { num_dep: "48", dep_name: "Lozère", taille_reseau: 3271 },
                { num_dep: "65", dep_name: "Hautes-Pyrénées", taille_reseau: 3271 },
                { num_dep: "66", dep_name: "Pyrénées-Orientales", taille_reseau: 3271 },
                { num_dep: "81", dep_name: "Tarn", taille_reseau: 3271 },
                { num_dep: "82", dep_name: "Tarn-et-Garonne", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Pays de la Loire",
            departments: [
                { num_dep: "44", dep_name: "Loire-Atlantique", taille_reseau: 3271 },
                { num_dep: "49", dep_name: "Maine-et-Loire", taille_reseau: 3271 },
                { num_dep: "53", dep_name: "Mayenne", taille_reseau: 3271 },
                { num_dep: "72", dep_name: "Sarthe", taille_reseau: 3271 },
                { num_dep: "85", dep_name: "Vendée", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "Provence-Alpes-Côte d'Azur",
            departments: [
                { num_dep: "04", dep_name: "Alpes-de-Haute-Provence", taille_reseau: 3271 },
                { num_dep: "05", dep_name: "Hautes-Alpes", taille_reseau: 3271 },
                { num_dep: "06", dep_name: "Alpes-Maritimes", taille_reseau: 3271 },
                { num_dep: "13", dep_name: "Bouches-du-Rhône", taille_reseau: 3271 },
                { num_dep: "83", dep_name: "Var", taille_reseau: 3271 },
                { num_dep: "84", dep_name: "Vaucluse", taille_reseau: 3271 }
            ]
        },
        {
            region_name: "La Réunion",
            departments: [
                { num_dep: "974", dep_name: "La Réunion" }
            ]
        },
        {
            region_name: "Mayotte",
            departments: [
                { num_dep: "976", dep_name: "Mayotte" }
            ]
        },
        {
            region_name: "Guadeloupe",
            departments: [
                { num_dep: "971", dep_name: "Guadeloupe" }
            ]
        },
        {
            region_name: "Martinique",
            departments: [
                { num_dep: "972", dep_name: "Martinique" }
            ]
        },
        {
            region_name: "Guyane",
            departments: [
                { num_dep: "973", dep_name: "Guyane" }
            ]
        }
    ]
}


 //const jsonData = JSON.stringify(data, null, 2);
 //const fs = require('fs');
 //fs.writeFileSync('data.json', jsonData);

export default data;