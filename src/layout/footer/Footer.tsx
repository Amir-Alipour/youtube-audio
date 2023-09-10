import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    return (
        <div className="w-[1340px] flex items-center justify-between absolute bottom-8 px-10 ">
            <p>2023</p>

            <div></div>

            <div className="flex items-center  gap-x-4 ml-12">
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

            <p>
                &copy; Develop By{" "}
                <a
                    className="text-stone-300"
                    target="_blank"
                    href="https://github.com/amir-alipour"
                >
                    Amir-Alipour
                </a>{" "}
                & Art-Design By{" "}
                <a
                    className="text-stone-300"
                    target="_blank"
                    href="https://dribbble.com/ghadimidesign/shots"
                >
                    Ali-Ghadimi
                </a>
            </p>
        </div>
    );
};

export default Footer;
