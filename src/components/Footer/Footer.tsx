export default function Footer() {
  return (
    <footer className="bg-white  dark:bg-gray-950 border-t border-gray-200 pt-12 pb-8 mt-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <h4 className="font-bold text-xl text-gray-800 dark:text-green-500 mb-4">ShopModern</h4>
                    <p className="text-sm text-gray-500 dark:text-green-600">Platform belanja online modern.</p>
                </div>
                {/* Kolom lainnya... */}
            </div>
            <div className="border-t border-gray-100 pt-6 text-center text-gray-400 text-sm">
                &copy; 2025 ShopModern Indonesia.
            </div>
        </div>
    </footer>
  );
}