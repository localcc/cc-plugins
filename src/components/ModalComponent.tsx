import data from "@cumcord/pluginData";
import GifInfo from "../GifInfo";

import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

const ConfirmModal = findByDisplayName("ConfirmModal");
const Colors = findByProps("button", "colorRed");
const TextInput = findByDisplayName("TextInput");
const Embed = findByDisplayName("Embed");

const { renderImageComponent, renderMaskedLinkComponent } = findByProps(
    "renderImageComponent"
);

export default function ModalComponent(props) {
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
        id: "embed_00",
        url: props.url,
    };

    if (props.url.startsWith("https://tenor.com")) {
        embed.type = "gifv";
        embed.provider = { name: "Tenor", url: "https://tenor.co" };
        embed.thumbnail = {
            url: "https://cdn.discordapp.com/attachments/824921608560181261/1021158403256627242/d_o_n_k2.png",
            width: props.width,
            height: props.height,
        };
        embed.video = {
            url: props.displayUrl,
            width: props.width,
            height: props.height,
        };
    } else {
        embed.type = "image";
        embed.image = {
            url: props.displayUrl,
            width: props.width,
            height: props.height,
        };
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
            <div style={{ display: "grid", justifyContent: "center" }}>
                <Embed
                    embed={embed}
                    autoPlayGif={true}
                    renderImageComponent={renderImageComponent}
                    renderLinkComponent={renderMaskedLinkComponent}
                />
            </div>
            <br />
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
