const CollectionPage = () => {
    return (
        <div className="relative flex flex-col min-h-screen text-white bg-neutral-900">

        {/* Sisältö */}
        <div className="relative z-10">

            {/* Ylin palkki: otsikko + search */}
            <div className="w-full p-4 flex flex-col md:flex-row items-center justify-between shadow-md bg-linear-to-r from-slate-950 via-red-950/60 to-slate-950">
            <h2 className="text-white text-xl font-bold mb-2 md:mb-0">
                My Collection
            </h2>

            <div className="relative w-full max-w-xs">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                </div>
                <input
                type="text"
                placeholder="Search cards..."
                className="w-full pl-10 pr-3 py-2 rounded-md border bg-slate-900/70 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-900 hover:ring-1 hover:bg-slate-950/70 focus:bg-slate-950 transition-all duration-200"
                />
            </div>
            </div>

            {/* Pieni viiva otsikon alle */}
            <div className="bg-linear-to-r h-1 mb-9 from-red-900 via-purple-950 to-red-900" />


        </div>
        </div>
    );
}

export default CollectionPage;