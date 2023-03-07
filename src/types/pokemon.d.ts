export interface TPokemon {
    abilities:                TPokemonAbility[];
    base_experience:          number;
    forms:                    TPokemonSpecies[];
    game_indices:             TPokemonGameIndex[];
    height:                   number;
    held_items:               any[];
    id:                       number;
    is_default:               boolean;
    location_area_encounters: string;
    moves:                    TPokemonMove[];
    name:                     string;
    order:                    number;
    past_types:               any[];
    species:                  TPokemonSpecies;
    sprites:                  TPokemonSprites;
    stats:                    TPokemonStat[];
    types:                    TPokemonType[];
    weight:                   number;
}

export interface TPokemonAbility {
    ability:   TPokemonSpecies;
    is_hidden: boolean;
    slot:      number;
}

export interface TPokemonSpecies {
    name: string;
    url:  string;
}

export interface TPokemonGameIndex {
    game_index: number;
    version:    TPokemonSpecies;
}

export interface TPokemonMove {
    move:                  TPokemonSpecies;
    version_group_details: VersionGroupDetail[];
}

export interface TPokemonVersionGroupDetail {
    level_learned_at:  number;
    move_learn_method: TPokemonSpecies;
    version_group:     TPokemonSpecies;
}

export interface TPokemonGenerationV {
    "black-white": TPokemonSprites;
}

export interface TPokemonGenerationIv {
    "diamond-pearl":        TPokemonSprites;
    "heartgold-soulsilver": TPokemonSprites;
    platinum:               TPokemonSprites;
}

export interface TPokemonVersions {
    "generation-i":    TPokemonGenerationI;
    "generation-ii":   TPokemonGenerationIi;
    "generation-iii":  TPokemonGenerationIii;
    "generation-iv":   TPokemonGenerationIv;
    "generation-v":    TPokemonGenerationV;
    "generation-vi":   { [key: string]: Home };
    "generation-vii":  TPokemonGenerationVii;
    "generation-viii": TPokemonGenerationViii;
}

export interface TPokemonSprites {
    back_default:       string;
    back_female:        string;
    back_shiny:         string;
    back_shiny_female:  string;
    front_default:      string;
    front_female:       string;
    front_shiny:        string;
    front_shiny_female: string;
    other?:             TPokemonOther;
    versions?:          TPokemonVersions;
    animated?:          TPokemonSprites;
}

export interface TPokemonGenerationI {
    "red-blue": TPokemonRedBlue;
    yellow:     TPokemonRedBlue;
}

export interface TPokemonRedBlue {
    back_default:      string;
    back_gray:         string;
    back_transparent:  string;
    front_default:     string;
    front_gray:        string;
    front_transparent: string;
}

export interface TPokemonGenerationIi {
    crystal: TPokemonCrystal;
    gold:    TPokemonGold;
    silver:  TPokemonGold;
}

export interface TPokemonCrystal {
    back_default:            string;
    back_shiny:              string;
    back_shiny_transparent:  string;
    back_transparent:        string;
    front_default:           string;
    front_shiny:             string;
    front_shiny_transparent: string;
    front_transparent:       string;
}

export interface TPokemonGold {
    back_default:       string;
    back_shiny:         string;
    front_default:      string;
    front_shiny:        string;
    front_transparent?: string;
}

export interface TPokemonGenerationIii {
    emerald:             TPokemonOfficialArtwork;
    "firered-leafgreen": TPokemonGold;
    "ruby-sapphire":     TPokemonGold;
}

export interface TPokemonOfficialArtwork {
    front_default: string;
    front_shiny:   string;
}

export interface TPokemonHome {
    front_default:      string;
    front_female:       string;
    front_shiny:        string;
    front_shiny_female: string;
}

export interface TPokemonGenerationVii {
    icons:                  TPokemonDreamWorld;
    "ultra-sun-ultra-moon": TPokemonHome;
}

export interface TPokemonDreamWorld {
    front_default: string;
    front_female:  null;
}

export interface TPokemonGenerationViii {
    icons: TPokemonDreamWorld;
}

export interface TPokemonOther {
    dream_world:        TPokemonDreamWorld;
    home:               TPokemonHome;
    "official-artwork": TPokemonOfficialArtwork;
}

export interface TPokemonStat {
    base_stat: number;
    effort:    number;
    stat:      TPokemonSpecies;
}

export interface TPokemonType {
    slot: number;
    type: TPokemonSpecies;
}
