export type GifInfo = {
    url: string;
    tags: string[];
    shorthand?: string;
};

let fakeId = 0;

export function fake(info: GifInfo) {
    return {
        animated: true,
        available: true,
        id: (fakeId += 1).toString(),
        managed: "false",
        name: `${info.shorthand ?? "unnamed"}${info.tags[0] != "" ? " [" + info.tags.join(", ") + "]" : ""}`,
        require_colons: true,
        roles: [],
        url: info.url,
        allNamesString: `${info.shorthand ?? "unnamed"}${info.tags[0] != "" ? " [" + info.tags.join(", ") + "]" : ""}`,
        guildId: (fakeId += 1).toString(),
        faked: true,
        tags: info.tags,
    };
}