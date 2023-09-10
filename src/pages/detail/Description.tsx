
type DescriptionProps = {
    text: string
}

const Description = ({text} : DescriptionProps) => {
  return (
    <div className="text-sm">
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
  )
}

export default Description

function urlify(text: string) {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return (
            '<a target="_blank" rel="nofollow" class="underline" href="' + url + '">' + url + "</a>"
        );
    });
}