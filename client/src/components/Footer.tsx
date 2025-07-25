import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-14">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
                {/* ORDER NOW */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-orange-400">Order Now</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        {["deals", "pizza", "sides", "drinks", "desserts"].map((item) => (
                            <li key={item}>
                                <Link to={`/${item}`} className="hover:text-orange-300 transition">
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ABOUT */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-orange-400">About</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/about-us" className="hover:text-orange-300 transition">About Us</Link></li>
                        <li><Link to="/contactless-delivery" className="hover:text-orange-300 transition">Contactless Delivery</Link></li>
                        <li><Link to="/nutrition" className="hover:text-orange-300 transition">Nutrition</Link></li>
                        <li><Link to="/career" className="hover:text-orange-300 transition">Career</Link></li>
                    </ul>
                </div>

                {/* POLICIES */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-orange-400">Our Policies</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/privacy" className="hover:text-orange-300 transition">Privacy</Link></li>
                        <li><Link to="/terms" className="hover:text-orange-300 transition">Terms & Conditions</Link></li>
                        <li><Link to="/responsible-disclosure" className="hover:text-orange-300 transition">Responsible Disclosure</Link></li>
                        <li><Link to="/help" className="hover:text-orange-300 transition">FAQs & Help</Link></li>
                    </ul>
                </div>

                {/* VISIT */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-orange-400">Visit Dowmin Hut</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/store-locator" className="hover:text-orange-300 transition">Locate a Store</Link></li>
                        <li><Link to="/blog" className="hover:text-orange-300 transition">Global Blog</Link></li>
                    </ul>
                </div>

                {/* APPS & SOCIAL */}
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-orange-400">Get the App</h3>
                        <a href="https://play.google.com" target="_blank" rel="noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 rounded-md shadow-md" />
                        </a>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2 text-orange-400">Follow us</h3>
                        <div className="flex gap-5 text-xl text-gray-300">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition"><FaFacebookF /></a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition"><FaTwitter /></a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition"><FaInstagram /></a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-600 transition"><FaYoutube /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER BOTTOM */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                <p className="mb-4">
                    Help us in serving you better —
                    <Link to="/feedback">
                        <button className="ml-3 px-4 py-2 bg-orange-400 hover:bg-orange-500 text-black font-medium rounded transition">
                            Give Feedback
                        </button>
                    </Link>
                </p>

                <p className="mb-2">
                    Order a delicious pizza on the go, anywhere, anytime. Pizza Hut is happy to assist you with your home delivery.
                    Every time you order, you get a hot and fresh pizza delivered at your doorstep in less than thirty minutes. *T&C Apply.
                </p>

                <p className="mb-2">Hurry up and place your order now!</p>
                <p className="mt-3">© 2025 Pizza Hut India. All rights reserved. License Number: 10017011004220</p>

                <div className="flex justify-center mt-5">
                    <img src="https://www.pizzahut.co.in/order/images/footer/FSAAI-logo.cb99007614b9cff3e0150bce9711641d.svg" alt="FSSAI" className="h-10" />
                </div>
            </div>
        </footer>
    );
}
