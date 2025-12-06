export class LinkPage {
    self: String;
    first: String;
    last: String;
    prev: String;
    next: String;

    constructor(self = "",
        first = "",
        last = "",
        prev = "",
        next = "") {
        this.self = self;
        this.first = first;
        this.last = last;
        this.prev = prev;
        this.next = next;
    }
}
