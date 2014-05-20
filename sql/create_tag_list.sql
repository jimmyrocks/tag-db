--https://raw.githubusercontent.com/nationalparkservice/places/master/data/presets/schema/preset.json

DROP TABLE IF EXISTS tag_list;
CREATE TABLE
tag_list
(
  pathName text NOT NULL, --The path where the json file resides
  name text NOT NULL, -- The English name for the feature
  geometry text[] NOT NULL, --Valid geometry types for the feature
  tags json, --Tags that must be present for the preset to match
  addTags json, --Tags that are added when changing to the preset (default is the same value as 'tags')
  removeTags json, --Tags that are removed when changing to another preset (default is the same value as 'tags')
  fields text[], --Form fields that are displayed for the preset
  icon text, --Name of preset icon which represents this preset
  maki text, --Custom type used to allow National Park Service Icons (npmaki) along with other maki based libraries
  terms text[], --English synonyms or related terms
  searchable boolean, --Whether or not the preset will be suggested via search
  matchScore numeric, --The quality score this preset will receive when being compared with other matches (higher is better)
  fcat text, --The name that is used for styling
  displayed boolean --T/F if the type will be rendered on our map
);
