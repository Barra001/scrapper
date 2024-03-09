import { Item } from "../entities/item.entity";

export interface ScrapperServiceInterface {
  scrap(url : string): Promise<Item>;
}
