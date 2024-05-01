import Form from "../components/Form";

const Home = () => {
    return (
        <div className=".home">
            <section className="bg-white dark:bg-gray-900">
                <div className="pt-4 pb-2 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        Fovus Coding Challenge
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 pt-5 dark:text-gray-400">
                        Here at Flowbite we focus on markets where technology,
                        innovation, and capital can unlock long-term value and
                        drive economic growth.
                    </p>
                </div>
            </section>
            <Form />
        </div>
    );
};
export default Home;
