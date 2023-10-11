import regions from "../data/geographic/regions.json"
import departements from "../data/geographic/departements.json"


const find_region = (reg) => regions.filter((region) => region.REG === reg)[0];
const find_departement = (dep) => departements.filter((departement) => departement.DEP === dep)[0];

export const Regions = {
    list: regions.sort((a, b) => a.LIBELLE.localeCompare(b.LIBELLE) ),
    find: find_region
};

export const Departements = {
    list: departements.sort((a, b) => a.DEP - b.DEP ),
    find: find_departement
};

const GeoData = {
    regions: Regions,
    departements: Departements
};

export default GeoData;


