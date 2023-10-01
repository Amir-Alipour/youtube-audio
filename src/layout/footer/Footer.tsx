import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    return (
        <div className="w-[100%] max-w-[1340px] flex flex-col lg:flex-row items-center justify-between lg:absolute bottom-0 lg:bottom-8 px-5 lg:px-10 space-y-3 lg:space-x-0 ">
            <p>2023</p>

            <div className="hidden lg:block"></div>

            <div className="flex items-center gap-x-4 lg:ml-12">
                <a target="_blank" href="https://github.com/amir-alipour">
                    <GitHubIcon />
                </a>{" "}
                
                <a
                    target="_blank"
                    href="https://dribbble.com/ghadimidesign/shots"
                >
                    <img src="/icons/icon-drribbble.svg" className="w-7 h-7" />
                </a>
            </div>

            <p className="line-clamp-2 flex flex-col pb-3 lg:flex-row lg:pb-0">
                <p>
                &copy; Develop By{" "}
                <a
                    className="text-stone-300"
                    target="_blank"
                    href="https://github.com/amir-alipour"
                >
                    Amir-Alipour
                </a>{" "}
                </p>
                <p>
                & Art-Design By{" "}
                <a
                    className="text-stone-300"
                    target="_blank"
                    href="https://dribbble.com/ghadimidesign/shots"
                >
                    Ali-Ghadimi
                </a>
                </p>
            </p>
        </div>
    );
};

export default Footer;
