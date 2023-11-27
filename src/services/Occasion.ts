import Coordinates from "@/types/coordinates";
import Registration from "@/types/registration";
import Timings from "@/types/timings";



class Occasion {
  private _uid: string;
  private _title: string;
  private _shortDesc: string;
  private _longDesc: string;
  private _keywords: string[];
  private _timings: Timings[];
  private _image: string;
  private _updatedAt: Date;
  private _location: Coordinates;
  private _address: string;
  private _addressName: string;
  private _registration: Registration[];

  constructor(
    uid: string,
    title: string,
    shortDesc: string,
    longDesc: string,
    Keywords: string[],
    timings: Timings[],
    image: string,
    updatedAt: Date,
    location: Coordinates,
    address: string,
    addressName: string,
    registration: Registration[],
  ) {
    this._uid = uid;
    this._title = title;
    this._shortDesc = shortDesc;
    this._longDesc = longDesc;
    this._keywords = Keywords;
    this._timings = timings;
    this._image = image;
    this._updatedAt = updatedAt;
    this._location = location;
    this._address = address;
    this._addressName = addressName;
    this._registration = registration;
  }

  get uid(): string {
    return this._uid;
  }

  get title(): string {
    return this._title;
  }

  get shortDesc(): string {
    return this._shortDesc;
  }

  get longDesc(): string {
    return this._longDesc;
  }

  get keywords(): string[] {
    return this._keywords;
  }

  get timings(): Timings[] {
    return this._timings;
  }

  get image(): string {
    return this._image;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get location(): Coordinates {
    return this._location;
  }

  get address(): string {
    return this._address;
  }

  get addressName(): string {
    return this._addressName;
  }

  get registration(): Registration[] {
    return this._registration;
  }
}

export default Occasion;