import { find, findByProps } from "@cumcord/modules/webpack";
import patcher from "@cumcord/patcher";
import data from "@cumcord/pluginData";
import ModalComponent from "./components/ModalComponent";
import { GifInfo, fake } from "./GifInfo";

const gifPicker = findByProps("GIFPickerSearchItem");
const autocomplete = find((x) => x?.default?.sentinel == ":").default;

const unhooks: (() => void)[] = [];

export function onLoad() {

    unhooks.push(
        patcher.after("queryResults", autocomplete, queryResultsPatch),
        patcher.instead("onSelect", autocomplete, onSelectPatch)
    );

    unhooks.push(
        patcher.after(
            "render",
            gifPicker.GIFPickerSearchItem.prototype,
            (args, res) => {
                res.props.onContextMenu = (event) => {
                    if (event.target.src) {
                        findByProps("openModalLazy").openModal((modal) => {
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
    let matchingGifs = gifs.filter((e) => {
        return (
            e.shorthand?.startsWith(text) ||
            e.tags.find((tag) => tag.includes(text)) != null
        );
    });

    ret.results.emojis = [...ret.results.emojis.filter(e => !e.faked)];

    for (const matchingGif of matchingGifs) {
        ret.results.emojis.push(fake(matchingGif));
    }

    ret.metadata.numEmojiResults = ret.results.emojis.length;
    return ret;
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
