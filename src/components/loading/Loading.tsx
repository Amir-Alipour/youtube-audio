import './Loading.css'

const Loading = () => {
    return (
        <div className="wrapper text-3xl">
            <div className="loading-text">
                <h1>
                    LOADING
                    <span className="dot-one"> .</span>
                    <span className="dot-two"> .</span>
                    <span className="dot-three"> .</span>
                </h1>
            </div>
        </div>
    );
};

export default Loading;
