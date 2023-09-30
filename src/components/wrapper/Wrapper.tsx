type WrapperProps = {
    children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
    return (
        <div className="sm:w-[650px] md:w-[800px] lg:w-[1000px] xl:w-[1340px] min-h-screen flex flex-col items-center pt-[120px] pb-52">
            {children}
        </div>
    );
};

export default Wrapper;
