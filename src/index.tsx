import { find, findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import patcher from "@cumcord/patcher";
import data from "@cumcord/pluginData";

const ConfirmModal = findByDisplayName("ConfirmModal");
const Colors = findByProps("button", "colorRed");
const TextInput = findByDisplayName("TextInput");
const Embed = findByDisplayName("Embed");
const gifPicker = findByProps("GIFPickerSearchItem");
const { renderImageComponent, renderMaskedLinkComponent} = findByProps("renderImageComponent");
const autocomplete = find(x => x?.default?.sentinel == ":").default

const unhooks: (() => void)[] = [];

class GifInfo {
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

export function onLoad() {
    unhooks.push(
        patcher.after("queryResults", autocomplete, queryResultsPatch),
        patcher.instead("onSelect", autocomplete, onSelectPatch),
    );

    unhooks.push(
        patcher.after("render", gifPicker.GIFPickerSearchItem.prototype, (args, res) => {
            res.props.onContextMenu = (event) => {
                if (event.target.src) {
                    findByProps("openModalLazy").openModal((modal) => {
                        console.log(event)
                        return (
                            <ModalComponent
                                modal={modal}
                                url={res.props.children[1].props.url}
                                displayUrl={event.target.src}
                                width={event.target.width * 2}
                                height={event.target.height * 2}
                            />
                        );
                    });
                }
            };

            return res;
            }
        )
    );
}

function queryResultsPatch(params, ret) {
    let [_channel, _server, text, _chat, _unk] = params;

    let gifs: GifInfo[] = data.persist.ghost.gifs ?? [];
    console.log(gifs);
    let matchingGifs = gifs.filter((e) => {
        console.log(`${e.shorthand} ${e.shorthand?.startsWith(text)} ${text}`);
        return (
            e.shorthand?.startsWith(text) ||
            e.tags.find((tag) => tag.includes(text)) != null
        );
    });
    console.log(matchingGifs);

    for (const matchingGif of matchingGifs) {
        if (!ret.results.emojis.find(e => e.url == matchingGif.url)) {
            console.log("None");
            ret.results.emojis.push(matchingGif.fake());
        }
    }
    return ret;
}

function ModalComponent(props) {
    if (data.persist.ghost.gifs == null) {
        data.persist.store.gifs = [];
    }

    const gifs: GifInfo[] = data.persist.ghost.gifs;
    let gifInfo = gifs.find((e) => e.url == props.url);

    const [shorthandInput, setShorthandInput] = React.useState(
        gifInfo?.shorthand ?? ""
    );
    const [tagsInput, setTagsInput] = React.useState(
        gifInfo?.tags?.join(", ") ?? ""
    );

    function confirm() {
        const tags = tagsInput?.split(", ") ?? [];
        const gifInfo = new GifInfo(props.url, tags, shorthandInput);

        data.persist.store.gifs = [
            ...data.persist.ghost.gifs.filter((e) => e.url != props.url),
            gifInfo,
        ];
        props.modal.onClose();
    }

    function cancel() {
        props.modal.onClose();
    }

    let embed = {
        "id":"embed_00",
        "url": props.url,
    }

    if(props.url.startsWith("https://tenor.com")) {
        embed.type = "gifv";
        embed.provider = { "name":"Tenor","url":"https://tenor.co" };
        embed.thumbnail = {
            "url":"https://cdn.discordapp.com/attachments/824921608560181261/1021158403256627242/d_o_n_k2.png",
            "width":props.width, "height":props.height
        };
        embed.video = {
            "url": props.displayUrl,
            "width":props.width, "height":props.height
        };
    }
    else {
        embed.type = "image";
        embed.image = {
            "url": props.displayUrl,
            "width":props.width, "height":props.height
        }
    }

    return (
        //FIXME: i18n
        <ConfirmModal
            {...{
                header: "Editing GIF",
                confirmText: "Accept",
                cancelText: "Cancel",
            }}
            transitionState={props.modal.transitionState}
            confirmButtonColor={Colors.colorBrand}
            onConfirm={confirm}
            onClose={cancel}
            onCancel={cancel}
        >
            <div style={{display:"grid", justifyContent: "center"}}>
                <Embed
                    embed={embed}
                    autoPlayGif={true}
                    renderImageComponent={renderImageComponent}
                    renderLinkComponent={renderMaskedLinkComponent}
                />
            </div>
            <br/>
            <TextInput
                placeholder="Shorthand name for this gif"
                type="text"
                value={shorthandInput}
                onChange={setShorthandInput}
            />
            <br/>
            <TextInput
                placeholder="Comma separated list of tags, e.g: amongus, moyai, crab"
                type="text"
                value={tagsInput}
                onChange={setTagsInput}
            />
        </ConfirmModal>
    );
}

function onSelectPatch(args, originalFunc) {
    let [selectedInfo] = args;
    let selected = selectedInfo.results.emojis[selectedInfo.index];

    if (selected?.faked != null && selected?.faked) {
        selectedInfo.options.insertText(selected.url);
    } else {
        return originalFunc(selectedInfo);
    }
}

export function onUnload() {
    for (const unhook of unhooks) {
        unhook();
    }
}
