--https://raw.githubusercontent.com/nationalparkservice/places-editor/master/data/presets/schema/preset.json

DELETE FROM
  tag_list
WHERE
  "pathname" = {{pathname}};

INSERT INTO
  tag_list
(
  "pathname",
  "name",
  "geometry",
  "tags",
  "addtags",
  "removetags",
  "fields",
  "icon",
  "maki",
  "terms",
  "searchable",
  "matchscore",
  "fcat",
  "displayed"
) VALUES (
  {{pathname}},
  {{name}},
  {{geometry}},
  {{tags}},
  {{addTags}},
  {{removeTags}},
  {{fields}},
  {{icon}},
  {{maki}},
  {{terms}},
  {{searchable}},
  {{matchScore}},
  {{fcat}},
  {{displayed}}
);
