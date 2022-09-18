export type GifInfo = {
    url: string;
    tags: string[];
    shorthand?: string;
};


export function fake(info: GifInfo) {
    return {
        animated: true,
        available: true,
        id: "0",
        managed: "false",
        name: `${info.shorthand ?? "unnamed"}${info.tags[0] != "" ? " [" + info.tags.join(", ") + "]" : ""}`,
        require_colons: true,
        roles: [],
        url: info.url,
        allNamesString: `${info.shorthand ?? "unnamed"}${info.tags[0] != "" ? " [" + info.tags.join(", ") + "]" : ""}`,
        guildId: "0",
        faked: true,
        tags: info.tags,
    };
}