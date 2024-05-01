import TextInput from "./TextInput";
import FileInput from "./FileInput";
const Form = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-xs">
                <form action="#">
                    <div className="mb-4">
                        <TextInput />
                    </div>
                    <div className="mb-4">
                        <FileInput />
                    </div>

                    {/* <button
                        type="submit"
                        className="py-3 px-5 text-sm font-medium text-center dark:text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-black"
                    >
                        Upload to S3
                    </button> */}
                </form>
            </div>
        </section>
    );
};

export default Form;
