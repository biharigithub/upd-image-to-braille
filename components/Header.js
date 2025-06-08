function Header() {
    try {
        return (
            <header data-name="header" data-file="components/Header.js" className="bg-gray-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="grid grid-cols-3 gap-1">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                ))}
                            </div>
                            <h1 className="text-xl font-bold text-white">BrailleConnect</h1>
                        </div>
                        <nav className="flex space-x-6">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
                            <div className="relative group">
                                <button className="text-gray-300 hover:text-white transition-colors flex items-center">
                                    Our Services <i className="fas fa-chevron-down ml-1 text-xs"></i>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
