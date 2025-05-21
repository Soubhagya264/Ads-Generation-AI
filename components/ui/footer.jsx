import { ModeToggle } from "./mode-toggle";

export default function Footer() {
    return (
        <footer className="bg-gray-200 dark:bg-black w-7xl mt-30  max-w-7xl text-gray-600 dark:text-gray-300 py-10 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                {/* Branding */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">PromoPilot</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Create stunning AI-generated ad videos in seconds.
                    </p>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h3 className="font-semibold mb-2">Product</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Features</a></li>
                            <li><a href="#" className="hover:underline">Pricing</a></li>
                            <li><a href="#" className="hover:underline">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Company</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Support</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:underline">Help Center</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                            <li><a href="#" className="hover:underline">Status</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
                <p>&copy; 2025 PromoPilot. All rights reserved.</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Service</a>
                </div>
                <ModeToggle className="mt-2" />
            </div>
        </footer>
    );
}
