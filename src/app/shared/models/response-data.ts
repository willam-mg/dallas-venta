import { LinkPage } from "./link-page";
import { Pagination } from "./pagination";

export class ResponseData {
    data:Array<any>;
    pages: Pagination;
    links: LinkPage;

    constructor() {
        this.data = [];
        this.pages = new Pagination;
        this.links = new LinkPage;
    }
}
