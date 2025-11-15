/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_412188629")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1728504295",
    "hidden": false,
    "id": "relation12681842",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "projet_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_412188629")

  // remove field
  collection.fields.removeById("relation12681842")

  return app.save(collection)
})
