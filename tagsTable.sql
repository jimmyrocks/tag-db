--https://raw.githubusercontent.com/nationalparkservice/places/master/data/presets/schema/preset.json

CREATE TABLE
tag_list
(
  name text, -- The English name for the feature
  geommetry text[], --Valid geometry types for the feature
  tags json, --Tags that must be present for the preset to match
  addTags json, --Tags that are added when changing to the preset (default is the same value as 'tags')
  removeTags json, --Tags that are removed when changing to another preset (default is the same value as 'tags')
  fields text[], --Form fields that are displayed for the preset
  icon text, --Name of preset icon which represents this preset
  terms text, --English synonyms or related terms
  searchable boolean, --Whether or not the preset will be suggested via search
  matchScore number, --The quality score this preset will receive when being compared with other matches (higher is better)
  fcat text, --The name that is used for styling
  displayed boolean --T/F if the type will be rendered on our map
);
