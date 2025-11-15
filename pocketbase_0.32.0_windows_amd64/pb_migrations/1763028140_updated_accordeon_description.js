/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_412188629")

  // update collection data
  unmarshal({
    "name": "contenus"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_412188629")

  // update collection data
  unmarshal({
    "name": "accordeon_description"
  }, collection)

  return app.save(collection)
})
