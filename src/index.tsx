import { findByCodeAll, findByDisplayName } from "@cumcord/modules/webpack";
import { findByProps } from "@cumcord/modules/webpack";
import patcher from "@cumcord/patcher";
import data from "@cumcord/pluginData";
import { React } from "@cumcord/modules/common";

const ConfirmModal = findByDisplayName("ConfirmModal");
const Colors = findByProps("button", "colorRed");
const TextInput = findByDisplayName("TextInput");

let unhooks: (() => void)[] | null = null;

export function onLoad() {
    console.log("Hello from gifmacro!");

    let unhooks: (() => void)[] = [];
    unhooks.push(
        patcher.findAndPatch(
            () => findByCodeAll("queryResults")[2],
            (fn) => {
                let unhooks: (() => boolean)[] = [];
                unhooks.push(
                    patcher.after("queryResults", fn.default, queryResultsPatch)
                );

                unhooks.push(
                    patcher.instead("onSelect", fn.default, onSelectPatch)
                );

                return () => {
                    for (const unhook of unhooks) {
                        unhook();
                    }
                };
            }
        )
    );

    const gifPicker = findByProps("GIFPickerSearchItem");
    unhooks.push(
        patcher.after(
            "render",
            gifPicker.GIFPickerSearchItem.prototype,
            (args, res) => {
                res.props.onContextMenu = (event) => {
                    if (unhooks.length > 0) {
                        if (event.target.src) {
                            findByProps("openModalLazy").openModal((modal) => {
                                return (
                                    <ModalComponent
                                        modal={modal}
                                        url={event.target.src}
                                    />
                                );
                            });
                        }
                    }
                };

                unhooks.push(() => {
                    res.props.onContextMenu = undefined;
                });
                return res;
            }
        )
    );
    unhooks = unhooks;
}

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
            animated: false,
            available: true,
            id: "0",
            managed: "false",
            name: `${this.shorthand ?? "unnamed"}       [${this.tags.join(", ")}]`,
            require_colons: true,
            roles: [],
            url: this.url,
            allNamesString: `${this.shorthand ?? "unnamed"}       [${this.tags.join(", ")}]`,
            guildId: "0",
            faked: true,
            tags: this.tags,
        };
    }
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

const thing = "PENIS";

function ModalComponent(props) {
    if (data.persist.ghost.gifs == null) {
        data.persist.store.gifs = [];
    }

    const gifs: GifInfo[] = data.persist.ghost.gifs;
    let gifInfo = gifs.find((e) => e.url == props.url);
    console.log(gifInfo);

    const [shorthandInput, setShorthandInput] = React.useState(
        gifInfo?.shorthand ?? ""
    );
    const [tagsInput, setTagsInput] = React.useState(
        gifInfo?.tags?.join(", ") ?? ""
    );

    function confirm() {
        const tags = tagsInput.split(", ");
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
            <h1>{props.url}</h1>
            <TextInput
                placeholder="Shorthand name for this gif"
                type="text"
                value={shorthandInput}
                onChange={setShorthandInput}
            />
            <br />
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
    if (unhooks != null) {
        for (const unhook of unhooks) {
            unhook();
        }
        unhooks = null;
    }
}
