import { Item } from "./../entities/item.entity";

import { ScrapperServiceInterface as ScrapServiceInterface } from "./scrapper.service.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "./../../plataform_activity/entities/log-event";
import axios from "axios";
import { load } from "cheerio";

export class ScrapService implements ScrapServiceInterface {
  constructor(
    private readonly plataformActivity: PlataformActivitiesServiceInterface
  ) {}

  async scrap(url : string): Promise<Item> {
    const startTime = new Date();
    const shortUrl = url.split("?")[0];
    this.plataformActivity.create(
      "Starting to scrap the page: " + shortUrl,
      "System",
      LogType.info
    );

    const html = await axios.get(url);
    const endTimeOfGetRequest = new Date();
    this.plataformActivity.create(
      "The get request took: " +
        (endTimeOfGetRequest.getTime() - startTime.getTime()) +
        "ms",
      "System",
      LogType.info
    );
    
    const $ = load(html.data);
    const script = $("#goodsDetailSchema").html();
    
    const json = JSON.parse(script);
    console.log(html);
    const priceString = json.price || json.offers.price;
    const price = parseFloat(priceString);
    const symbol = json.priceCurrency || json.offers.priceCurrency;
    const sku = json.sku;
    const description = json.description;
    const name = json.name;
    const tagsOfImgs = $(".lazyload.crop-image-container__img");
    const listOfImgsSrc : string[] = tagsOfImgs.map((i, img) => $(img).attr("data-src")).get();
    
    listOfImgsSrc.pop();
    
    listOfImgsSrc.splice(listOfImgsSrc.length / 2);
    const img = $(".lcp-gallery__hook.crop-image-container__img").attr("src");
    const endTimeOfEntireOperaton = new Date();
    this.plataformActivity.create(
      "The entire operation took: " +
        (endTimeOfEntireOperaton.getTime() - startTime.getTime()) +
        "ms",
      "System",
      LogType.info
    );
    return new Item(sku, name, price,symbol, description, img, listOfImgsSrc);
  }
}
