export class Item {
  public id: string;
  public name: string;
  public price: number;
  public description: string;
  public coinSymbol: string;
  public mainImage: string;
  public brand: string;
  public color?: string;
  public sizes?: string[];
  public secondaryImages: string[];
  

  constructor(
    id: string,
    name: string,
    price: number,
    coinSymbol: string,
    description: string,
    mainImage: string,
    secondaryImages: string[],
    brand:string,
    color?: string,
    sizes?: string[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.coinSymbol = coinSymbol;
    this.description = description;
    this.mainImage = mainImage;
    this.secondaryImages = secondaryImages;
    this.color = color;
    this.sizes = sizes;
    this.brand = brand;
  }
}
