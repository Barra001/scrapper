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
    const shortUrl = url.split("/")[2];
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
    const priceString = json.price || json.offers.price;
    const price = parseFloat(priceString);
    const symbol = json.priceCurrency || json.offers.priceCurrency;
    const sku = json.sku;
    const description = json.description;
    const name = json.name;
    const brand = json.brand?.name || null;
    const tagsOfImgs = $(".lazyload.crop-image-container__img");
    const listOfImgsSrc : string[] = tagsOfImgs.map((i, img) => $(img).attr("data-src").replace("220x293.jpg","900x.webp")).get();
    
    listOfImgsSrc.pop();
    
    listOfImgsSrc.splice(listOfImgsSrc.length / 2);
    const img = $(".lcp-gallery__hook.crop-image-container__img").attr("src");
    // get the tag on class="color-999" and get the text
    const color = $(".color-999").text() || null;
    // grab from the first appearance of the word ""sizeInfo":[" to the next appearance of the word "]" and get the text
    const preSizeText = html.data.split('"sizeInfo":')[1].split(']')[0] || null;
    const sizesJson = preSizeText && preSizeText != '[{"size":null}' ? JSON.parse(preSizeText + "]") : null;
    const sizes = sizesJson
      ? sizesJson.map((size) => size.attr_value_name)
      : null;


    const endTimeOfEntireOperaton = new Date();
    this.plataformActivity.create(
      "The entire operation took: " +
        (endTimeOfEntireOperaton.getTime() - startTime.getTime()) +
        "ms " + "The prosessing took: " + (endTimeOfEntireOperaton.getTime() - endTimeOfGetRequest.getTime()) + "ms",
      "System",
      LogType.info
    );
    return new Item(sku, name, price,symbol, description, img, listOfImgsSrc, brand, color, sizes);
  }
}
