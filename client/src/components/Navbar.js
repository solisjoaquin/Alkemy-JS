import {
    BrowserRouter as Router,
    Link,

} from "react-router-dom";

const Navbar = ({ currentBalance }) => {

    return (
        <nav class="bg-gray-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">

                        <div class=" ">
                            <div class="ml-10 flex items-baseline space-x-4">

                                <Link to="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-lg font-medium">Home</Link>

                                <Link to="/new" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">New</Link>

                                {/* <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a> */}


                            </div>
                        </div>
                    </div>
                    <div class=" md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <div class="bg-gray-800 p-1 rounded-full text-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">

                                Current balance: {currentBalance}

                            </div>


                        </div>
                    </div>

                </div>
            </div>


        </nav>
    )
}

export default Navbar