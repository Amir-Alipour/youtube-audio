const Description = ({ text }) => {
    function urlify(text) {
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return (
                '<a target="_blank" rel="nofollow" class="text-blue-400" href="' + url + '">' + url + "</a>"
            );
        });
    }

    return (
        <div className="text-white text-sm">
            {text.split("\n").map((item, idx) => {
                return (
                    <div key={idx}>
                        <span
                            className="break-words"
                            dangerouslySetInnerHTML={{ __html: urlify(item) }}
                        ></span>
                        <br />
                    </div>
                );
            })}
        </div>
    );
};

export default Description;
