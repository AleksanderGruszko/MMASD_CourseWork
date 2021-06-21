import { Document } from 'mongoose';

type RawResponseItem = Document & Record<any, any>;

function itemToFEItem (item: RawResponseItem) {
  const feItem = item.toObject();
  delete feItem._id;
  delete feItem.__v;
  return {
    ...feItem,
    uuid: item._id,
  };
}

function mapToUuids (items: RawResponseItem[]) {
  return items.map(itemToFEItem);
}

export function makeResponse (items: RawResponseItem | RawResponseItem[]): string {
  if (Array.isArray(items)) {
    return JSON.stringify(mapToUuids(items));
  }
  return JSON.stringify(itemToFEItem(items));
}
