export default class GifInfo {
    url: string;
    tags: string[];
    shorthand?: string;

    constructor(url: string, tags: string[], shorthand?: string) {
        this.url = url;
        this.tags = tags;
        this.shorthand = shorthand;
    }

    fake() {
        return {
            animated: true,
            available: true,
            id: "0",
            managed: "false",
            name: `${this.shorthand ?? "unnamed"}${this.tags[0] != "" ? " [" + this.tags.join(", ") + "]" : ""}`,
            require_colons: true,
            roles: [],
            url: this.url,
            allNamesString: `${this.shorthand ?? "unnamed"}${this.tags[0] != "" ? " [" + this.tags.join(", ") + "]" : ""}`,
            guildId: "0",
            faked: true,
            tags: this.tags,
        };
    }
}