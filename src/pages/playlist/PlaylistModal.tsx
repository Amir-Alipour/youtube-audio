import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ModalMode } from "./PlaylistPage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    changePlaylistCover,
    deletePlaylist,
    reNamePlaylist,
} from "@/store/playlistSlice/PlaylistReducer";
import { useNavigate } from "react-router-dom";

type PlaylistModalProps = {
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    modalMode: ModalMode;
    playlistName: string;
    playlistID: string;
    handleUpdateData: Function;
};

const PlaylistModal = ({
    modalMode,
    onOpenChange,
    open,
    playlistName,
    playlistID,
    handleUpdateData,
}: PlaylistModalProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>(playlistName);
    const [image, setImage] = useState<string | null>(null);
    // STATES

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedImage = event.target.files[0];
            const reader: FileReader = new FileReader();

            reader.onload = () => {
                const imgData = reader.result as string;
                setImage(imgData);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleChangeTitle = () => {
        if (title.trim() !== "") {
            dispatch(reNamePlaylist({ playlist: playlistID, newName: title }));
            handleUpdateData();
            onOpenChange(false);
        }
    };

    const handleChangeCover = async () => {
        if (image) {
            dispatch(
                changePlaylistCover({ playlist: playlistID, cover: image })
            );
            handleUpdateData();
            onOpenChange(false);
        }
    };

    const handleDelete = () => {
        dispatch(deletePlaylist(playlistID));
        navigate('/playlists')
    };
    // HANDLERS

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] shadow-black shadow-lg py-6 px-4">
                <DialogHeader>
                    <DialogTitle className="text-white">
                        {
                            {
                                name: "Edit Playlist Name",
                                cover: "Edit Playlist Cover",
                                delete: "Delete Playlist ?!",
                            }[modalMode]
                        }
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full grid gap-4 px-1">
                    {PlaylistModalContent(
                        modalMode,
                        title,
                        setTitle,
                        handleUploadImage
                    )}
                </div>
                <DialogFooter>
                    {PlaylistModalButton({
                        modalMode,
                        coverChange: handleChangeCover,
                        titleChange: handleChangeTitle,
                        handleDelete: handleDelete,
                        cancel: () => onOpenChange(false),
                    })}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default PlaylistModal;

// ==========================================================================
const PlaylistModalContent = (
    modalMode: ModalMode,
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    onImageChange: Function
) => {
    return {
        name: (
            <div className="grid gap-y-2 my-4">
                <h3 className="text-white">Title of Playlist ?</h3>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    className="w-full rounded-lg h-[50px] pl-3 border border-stone-400 bg-transparent text-white outline-none"
                />
            </div>
        ),
        cover: (
            <div className="grid gap-y-2 my-4">
                <h3 className="text-white">Upload Here</h3>
                <input
                    onChange={(e) => onImageChange(e)}
                    className="text-white mt-1 outline-none"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                />
            </div>
        ),
        delete: <></>,
    }[modalMode];
};

// ==========================================================================

type PlaylistModalButtonParamerts = {
    modalMode: ModalMode;
    coverChange: Function;
    titleChange: Function;
    handleDelete: Function;
    cancel: Function;
};

const PlaylistModalButton = ({
    modalMode,
    titleChange,
    coverChange,
    cancel,
    handleDelete,
}: PlaylistModalButtonParamerts) => {
    return {
        name: (
            <div
                onClick={() => titleChange()}
                className="cursor-pointer mr-1 p-3 flex items-center gap-x-2 text-white border border-stone-500 rounded-lg"
            >
                <p>Change</p>
            </div>
        ),
        cover: (
            <div
                onClick={() => coverChange()}
                className="cursor-pointer mr-1 p-3 flex items-center gap-x-2 text-white border border-stone-500 rounded-lg"
            >
                <p>Change</p>
            </div>
        ),
        delete: (
            <div className="w-full grid grid-cols-2 gap-x-4">
                <div
                    onClick={() => cancel()}
                    className="cursor-pointer p-3 flex items-center  text-white bg-stone-700 rounded-lg"
                >
                    <p>Cancel</p>
                </div>
                <div
                    onClick={() => handleDelete()}
                    className="cursor-pointer p-3 flex items-center  text-red-500 border border-red-500  rounded-lg"
                >
                    <p>Delete</p>
                </div>
            </div>
        ),
    }[modalMode];
};
