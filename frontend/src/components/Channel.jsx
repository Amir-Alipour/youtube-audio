const Channel = ({ data }) => {
    return (
        <div className="flex flex-col md:flex-row w-full text-white space-y-5 md:space-y-0 md:space-x-5">
            <div className="w-[100%] md:w-[45%] flex items-center justify-center">
                <img className="w-[100px] h-100 rounded-full" src={data.image} alt="" />
            </div>
            <div className="w-[100%] md:w-[55%] flex flex-col justify-between">
                <div>
                    <h2 className="text-lg">{data.title}</h2>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <p className="font-medium">
                            {new URL(data.url).pathname.match(/[^\/]+/g)}
                        </p>
                        <p className="text-3xl -translate-y-0.5">·</p>
                        <p>{data.subCountLabel} subcribers</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Channel;
