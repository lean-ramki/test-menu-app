/**
 * Data Model Interfaces
 */
import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";


const db = require("../data/db.js");


/**
 * Service Methods
 */
const db_table = db('menu_item');

export const findAll = async (): Promise<Item[]> => {
  return db("menu_item"); 
};


export const find = async (id: number): Promise<Item> => {
  console.log('id', id);
  return db("menu_item").where({'id': id}).first();
};

export const create = async (newItem: BaseItem): Promise<Item> => {
  // const id = new Date().valueOf();
  // const new_item = {'id': id, ...newItem};
  // console.log("new_item:", new_item)
  return db_table.insert(newItem);
};

export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
};

export const remove = async (id: number): Promise<null | void> => {
  console.log('id', id);
  return db("menu_item")
  .where({'id': id})
  .del();
};

