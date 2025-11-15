/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_412188629")

  // update collection data
  unmarshal({
    "name": "description_projet"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_412188629")

  // update collection data
  unmarshal({
    "name": "contenu"
  }, collection)

  return app.save(collection)
})
