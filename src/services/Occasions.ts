import Occasion from "@/services/Occasion";
import Coordinates from "@/types/coordinates";

import Registration from "@/types/registration";
import Timings from "@/types/timings";

class Occasions {
  private static _instance: Occasions;
  private _occasions!: Occasion[];
  private _baseURL: URL = new URL("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records");
  private _pages: number = 1;
  private _limit: number = 20;

  public static get instance(): Occasions {
    if (!Occasions._instance)
      Occasions._instance = new Occasions();

    return Occasions._instance;
  }

  public get occasions(): Occasion[] {
    return this._occasions;
  }

  public get pages(): number {
    return this._pages;
  }



  public async fetch({ page, search, date }: any): Promise<void> {
    let dateFormated;
    const url: URL = new URL(this._baseURL.toString());
    url.searchParams.append('select', 'uid, title_fr as title, description_fr as shortDesc, longdescription_fr as longDesc, keywords_fr as keywords, timings, image, updatedat as updatedAt, location_name as addressName, location_address as address, registration, location_coordinates as location, date_format(firstdate_begin, "YYYY-MM-dd") as firstdate_begin');
    if (date) {
      dateFormated= new Date(date).toISOString().split('T')[0];
    }
    url.searchParams.append('where', `location_city='Grenoble' ${search ? `AND suggest(title, keywords, '${search}')` : ''} ${dateFormated ? `AND firstdate_begin = '${dateFormated}'` : ''}`);
    url.searchParams.append('order_by', 'firstdate_begin DESC');
    url.searchParams.append("limit", this._limit.toString());
    if (page > 1) {
      url.searchParams.append("offset", this.calculateOffset(page).toString());
    }
    
    const response = await (await fetch(url)).json();

    this._occasions = response.results.map(
      (occasion: any) => new Occasion(
        occasion.uid,
        occasion.title,
        occasion.shortDesc,
        occasion.longDesc,
        occasion.keywords,
        JSON.parse(occasion.timings) as Timings[],
        occasion.image,
        occasion.updatedAt,
        occasion.location as Coordinates,
        occasion.address,
        occasion.addressName,
        JSON.parse(occasion.registration) as Registration[],
      )
    );

    this.calculateOptimalElementsPerPage(response.total_count);
  }

  private calculateOptimalElementsPerPage(totalData: number): void {
    let bestElementsPerPage: number = 10;
    let bestPages: number = Math.ceil(totalData / bestElementsPerPage);

    for (let elementsPerPage: number = 11; elementsPerPage <= totalData; elementsPerPage++) {
      let pages: number = Math.ceil(totalData / elementsPerPage);

      if (pages < bestPages && elementsPerPage <= 20) {
        bestElementsPerPage = elementsPerPage;
        bestPages = pages;
      }
    }

    this._limit = bestElementsPerPage;
    this._pages = bestPages;
  }

  private calculateOffset(page: number): number {
    return (page - 1) * this._limit + 1;
  }
}

export default Occasions;